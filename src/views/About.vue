<template>
  <v-container class="about">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4">
          <v-card-title class="text-h4 primary white--text justify-center">
            <v-icon left large>mdi-information</v-icon>
            About iTunify
          </v-card-title>

          <v-card-text class="pa-6">
            <div class="text-h6 mb-4">Discover Music with Ease</div>

            <p class="body-1 mb-4">
              iTunify is a modern web application that allows you to explore the
              vast iTunes music library. Search for your favorite albums,
              artists, songs, and more with our intuitive interface.
            </p>

            <v-divider class="my-4"></v-divider>

            <div class="text-h6 mb-3">Features</div>
            <v-list dense>
              <v-list-item v-for="feature in features" :key="feature.title">
                <v-list-item-icon>
                  <v-icon color="primary">{{ feature.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ feature.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    feature.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>

            <div class="text-h6 mb-3">Technology Stack</div>
            <v-chip-group column>
              <v-chip
                v-for="tech in technologies"
                :key="tech.name"
                :color="tech.color"
                outlined
                small
              >
                <v-icon left small>{{ tech.icon }}</v-icon>
                {{ tech.name }}
              </v-chip>
            </v-chip-group>

            <v-divider class="my-4"></v-divider>

            <div class="text-center">
              <p class="body-2 grey--text">Powered by the iTunes Search API</p>
              <v-btn
                href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/"
                target="_blank"
                color="primary"
                outlined
                aria-label="Learn more about iTunes API"
              >
                <v-icon left>mdi-open-in-new</v-icon>
                Learn More
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "About",
  data: () => ({
    features: [
      {
        title: "Fast Search",
        description:
          "Real-time search with debounced input for optimal performance",
        icon: "mdi-lightning-bolt",
      },
      {
        title: "Multiple Content Types",
        description:
          "Search for albums, artists, songs, music videos, and podcasts",
        icon: "mdi-music-box-multiple",
      },
      {
        title: "Responsive Design",
        description: "Works seamlessly on desktop, tablet, and mobile devices",
        icon: "mdi-responsive",
      },
      {
        title: "Error Handling",
        description: "Robust error handling with helpful user feedback",
        icon: "mdi-shield-check",
      },
      {
        title: "Accessible",
        description: "Built with accessibility in mind for all users",
        icon: "mdi-human-handsup",
      },
    ],
    technologies: [
      { name: "Vue 2", icon: "mdi-vuejs", color: "green" },
      { name: "Vuetify", icon: "mdi-material-design", color: "blue" },
      { name: "Axios", icon: "mdi-api", color: "purple" },
      { name: "JavaScript", icon: "mdi-language-javascript", color: "amber" },
      { name: "iTunes API", icon: "mdi-apple", color: "grey" },
    ],
  }),
};
</script>

<style scoped>
.about {
  min-height: 80vh;
  padding-top: 2rem;
}
</style>
