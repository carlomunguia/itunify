<template>
  <div class="results-container">
    <!-- Results Header -->
    <div
      v-if="hasResults"
      class="mb-4 d-flex justify-space-between align-center"
    >
      <v-chip color="primary" outlined>
        <v-icon left small>mdi-music-note</v-icon>
        {{ resultCount }} results found
      </v-chip>

      <!-- View Toggle -->
      <v-btn-toggle
        :value="searchViewMode"
        @change="setSearchView"
        mandatory
        dense
      >
        <v-btn value="grid" small>
          <v-icon small>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn value="list" small>
          <v-icon small>mdi-view-list</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <!-- Grid View -->
    <v-row v-if="hasResults && searchViewMode === 'grid'">
      <v-col
        v-for="(result, index) in results"
        :key="getResultKey(result, index)"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="d-flex"
      >
        <result-card :result="result" class="flex-grow-1" />
      </v-col>
    </v-row>

    <!-- List View -->
    <v-list v-if="hasResults && searchViewMode === 'list'" two-line>
      <template v-for="(result, index) in results">
        <v-list-item
          :key="getResultKey(result, index)"
          :href="result.trackViewUrl || result.collectionViewUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-list-item-avatar size="60" tile>
            <v-img
              :src="result.artworkUrl100 || result.artworkUrl60"
              :alt="result.trackName || result.collectionName"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-icon>mdi-music</v-icon>
                </v-row>
              </template>
            </v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ result.trackName || result.collectionName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ result.artistName }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div class="text-right">
              <div v-if="result.trackPrice || result.collectionPrice">
                <v-chip small color="primary" outlined>
                  {{ formatPrice(result) }}
                </v-chip>
              </div>
              <div class="caption grey--text mt-1">
                {{ result.kind || result.wrapperType }}
              </div>
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < results.length - 1"
          :key="`divider-${getResultKey(result, index)}`"
        ></v-divider>
      </template>
    </v-list>

    <!-- Empty State -->
    <v-card v-else-if="showEmptyState" class="text-center py-8" outlined>
      <v-card-text>
        <v-icon size="64" color="grey lighten-1">mdi-music-off</v-icon>
        <div class="headline mt-4 mb-2">No Results Found</div>
        <div class="body-1 grey--text">
          Try adjusting your search term or changing the search type.
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ResultCard from "./ResultCard.vue";

export default {
  name: "ResultsGrid",

  components: {
    ResultCard,
  },

  computed: {
    ...mapState("search", ["results", "resultCount", "searchTerm"]),
    ...mapGetters("search", ["hasResults"]),
    ...mapGetters("ui", ["searchViewMode"]),

    showEmptyState() {
      return (
        !this.hasResults && this.searchTerm && this.searchTerm.trim().length > 0
      );
    },
  },

  methods: {
    ...mapActions("ui", ["setSearchView"]),

    getResultKey(result, index) {
      return `${
        result.trackId || result.collectionId || result.artistId
      }-${index}`;
    },

    formatPrice(result) {
      const price = result.trackPrice || result.collectionPrice;
      const currency = result.currency || "USD";

      if (price === 0) {
        return "Free";
      }

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(price);
    },
  },
};
</script>

<style scoped>
.results-container {
  min-height: 300px;
}
</style>
