<template>
  <v-app>
    <v-app-bar app color="primary" dark elevate-on-scroll role="banner">
      <v-app-bar-title style="overflow: visible">
        <router-link
          to="/"
          class="text-decoration-none white--text d-flex align-center app-title"
          aria-label="Go to iTunify homepage"
        >
          <v-icon left class="mr-2">mdi-music</v-icon>
          <span class="text-h5 font-weight-bold">iTunify</span>
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDarkMode" aria-label="Toggle dark mode">
        <v-icon>{{ darkModeIcon }}</v-icon>
      </v-btn>
      <v-btn text to="/favorites" aria-label="My Favorites">
        <v-badge
          :content="favoritesCount"
          :value="favoritesCount > 0"
          color="red"
          overlap
        >
          <v-icon left>mdi-heart</v-icon>
        </v-badge>
        <span class="ml-1">Favorites</span>
      </v-btn>
      <v-btn text to="/about" aria-label="About page">
        <v-icon left>mdi-information</v-icon>
        About
      </v-btn>
    </v-app-bar>

    <v-main role="main">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      app
      color="grey lighten-4"
      class="justify-center"
      role="contentinfo"
    >
      <div class="text-center">
        <span class="grey--text">
          &copy; {{ currentYear }} iTunify - Powered by iTunes API
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters("favorites", ["favoritesCount"]),

    currentYear() {
      return new Date().getFullYear();
    },
    darkModeIcon() {
      return this.$vuetify.theme.dark ? "mdi-brightness-7" : "mdi-brightness-4";
    },
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      // Save preference to localStorage
      localStorage.setItem("darkMode", this.$vuetify.theme.dark.toString());
    },
  },
  mounted() {
    // Load dark mode preference from localStorage
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode !== null) {
      this.$vuetify.theme.dark = darkMode === "true";
    }
  },
};
</script>

<style>
/* Global styles for accessibility */
.v-application {
  font-family: "Roboto", sans-serif;
}

/* App title styling */
.app-title {
  white-space: nowrap;
  overflow: visible !important;
  line-height: 1.5;
}

.app-title span {
  display: inline-block;
  padding: 2px 0;
}

/* Focus styles for better accessibility */
.v-btn:focus::before,
.v-card:focus::before {
  opacity: 0.12 !important;
}

/* Skip link for screen readers */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
</style>
