<template>
  <div class="favorites-page pa-4">
    <!-- Header -->
    <div class="mb-4">
      <h1 class="text-h4 mb-2">
        <v-icon large left color="red">mdi-heart</v-icon>
        My Favorites
      </h1>
      <p class="text-subtitle-1 grey--text">
        {{ favoritesCount }} {{ favoritesCount === 1 ? "item" : "items" }} saved
      </p>
    </div>

    <!-- Filter Chips -->
    <div v-if="favoritesCount > 0" class="mb-4">
      <v-chip-group
        :value="favoritesFilter"
        @change="setFavoritesFilter"
        mandatory
        active-class="primary--text"
      >
        <v-chip value="all" outlined>
          <v-icon left small>mdi-all-inclusive</v-icon>
          All ({{ favoritesCount }})
        </v-chip>
        <v-chip value="songs" outlined>
          <v-icon left small>mdi-music-note</v-icon>
          Songs ({{ favoritesByType.songs }})
        </v-chip>
        <v-chip value="albums" outlined>
          <v-icon left small>mdi-album</v-icon>
          Albums ({{ favoritesByType.albums }})
        </v-chip>
        <v-chip value="artists" outlined>
          <v-icon left small>mdi-account-music</v-icon>
          Artists ({{ favoritesByType.artists }})
        </v-chip>
      </v-chip-group>
    </div>

    <!-- Clear All Button -->
    <div v-if="favoritesCount > 0" class="mb-4 text-right">
      <v-btn
        outlined
        color="error"
        @click="confirmClearAll"
        :disabled="favoritesCount === 0"
      >
        <v-icon left>mdi-delete</v-icon>
        Clear All
      </v-btn>
    </div>

    <!-- Favorites Grid -->
    <v-row v-if="filteredFavorites.length > 0">
      <v-col
        v-for="(item, index) in filteredFavorites"
        :key="getItemKey(item, index)"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="d-flex"
      >
        <result-card :result="item" class="flex-grow-1" />
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-card v-else class="text-center py-12" outlined>
      <v-card-text>
        <v-icon size="80" color="grey lighten-1">mdi-heart-outline</v-icon>
        <div class="text-h5 mt-4 mb-2">No Favorites Yet</div>
        <div class="text-body-1 grey--text mb-4">
          Start exploring and save your favorite music!
        </div>
        <v-btn color="primary" to="/" large>
          <v-icon left>mdi-magnify</v-icon>
          Start Searching
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="showClearDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Clear All Favorites?</v-card-title>
        <v-card-text>
          This will remove all {{ favoritesCount }} items from your favorites.
          This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showClearDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="handleClearAll">Clear All</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ResultCard from "@/components/search/ResultCard.vue";

export default {
  name: "Favorites",

  components: {
    ResultCard,
  },

  data() {
    return {
      showClearDialog: false,
    };
  },

  computed: {
    ...mapState("favorites", ["favoritesFilter"]),
    ...mapGetters("favorites", [
      "filteredFavorites",
      "favoritesCount",
      "favoritesByType",
    ]),
  },

  methods: {
    ...mapActions("favorites", ["setFavoritesFilter", "clearAllFavorites"]),

    getItemKey(item, index) {
      return `${item.id}-${index}`;
    },

    confirmClearAll() {
      this.showClearDialog = true;
    },

    handleClearAll() {
      this.clearAllFavorites();
      this.showClearDialog = false;
    },
  },
};
</script>

<style scoped>
.favorites-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
