<template>
  <v-card class="mb-4" elevation="2">
    <v-card-title>
      <v-icon left>mdi-magnify</v-icon>
      Search iTunes
    </v-card-title>
    <v-card-text>
      <v-row align="end">
        <v-col cols="12" md="6">
          <v-text-field
            :value="searchTerm"
            @input="handleInput"
            :loading="loading"
            :disabled="loading"
            label="Search Term"
            prepend-inner-icon="mdi-magnify"
            clearable
            @click:clear="handleClear"
            outlined
            dense
            hide-details
            aria-label="Search iTunes music library"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            :value="searchEntity"
            @input="handleEntityChange"
            :items="entities"
            label="Search Type"
            :disabled="loading"
            outlined
            dense
            hide-details
            aria-label="Select search type"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn
            @click="handleSearch"
            :loading="loading"
            :disabled="!canSearch"
            color="primary"
            block
            height="40"
            aria-label="Perform search"
          >
            <v-icon left>mdi-magnify</v-icon>
            Search
          </v-btn>
        </v-col>
      </v-row>

      <!-- Recent Searches Hint -->
      <v-row v-if="recentSearchesHint">
        <v-col cols="12" md="6">
          <div class="caption grey--text">{{ recentSearchesHint }}</div>
        </v-col>
      </v-row>

      <!-- Recent Searches -->
      <v-row v-if="recentSearches.length > 0 && !searchTerm">
        <v-col cols="12">
          <div class="caption grey--text mb-2">Recent Searches:</div>
          <v-chip-group>
            <v-chip
              v-for="(term, index) in recentSearches"
              :key="index"
              small
              @click="selectRecentSearch(term)"
              class="mr-2"
            >
              <v-icon small left>mdi-history</v-icon>
              {{ term }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "SearchBar",

  data() {
    return {
      searchTimeout: null,
    };
  },

  computed: {
    ...mapState("search", [
      "searchTerm",
      "searchEntity",
      "entities",
      "loading",
    ]),
    ...mapGetters("search", ["recentSearches"]),

    canSearch() {
      return (
        this.searchTerm && this.searchTerm.trim().length > 0 && !this.loading
      );
    },

    recentSearchesHint() {
      if (this.recentSearches.length > 0) {
        return "Click on recent searches below or type to search";
      }
      return "";
    },
  },

  methods: {
    ...mapActions("search", [
      "searchItunes",
      "updateSearchTerm",
      "updateSearchEntity",
      "clearSearch",
    ]),

    handleInput(value) {
      this.updateSearchTerm(value);
      this.debouncedSearch();
    },

    debouncedSearch() {
      // Clear existing timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Set new timeout for 500ms
      this.searchTimeout = setTimeout(() => {
        if (this.canSearch) {
          this.handleSearch();
        } else if (!this.searchTerm || this.searchTerm.trim().length === 0) {
          this.clearSearch();
        }
      }, 500);
    },

    handleSearch() {
      this.searchItunes();
    },

    handleEntityChange(entity) {
      this.updateSearchEntity(entity);
    },

    handleClear() {
      this.clearSearch();
    },

    selectRecentSearch(term) {
      this.updateSearchTerm(term);
      this.handleSearch();
    },
  },

  beforeDestroy() {
    // Clean up timeout on component destroy
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  },
};
</script>

<style scoped>
.v-chip {
  cursor: pointer;
}
</style>
