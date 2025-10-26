import iTunesService from "../../services/iTunesService";

// Search state management
const state = {
  // Search parameters
  searchTerm: "",
  searchEntity: "album",

  // Results
  results: [],
  resultCount: 0,

  // UI states
  loading: false,
  error: null,

  // Search history
  searchHistory: JSON.parse(localStorage.getItem("searchHistory") || "[]"),

  // Cache for search results
  searchCache: new Map(),

  // Available search entities
  entities: [
    { text: "Albums", value: "album" },
    { text: "Artists", value: "musicArtist" },
    { text: "Songs", value: "song" },
    { text: "Music Videos", value: "musicVideo" },
    { text: "Podcasts", value: "podcast" },
  ],
};

const mutations = {
  SET_SEARCH_TERM(state, term) {
    state.searchTerm = term;
  },

  SET_SEARCH_ENTITY(state, entity) {
    state.searchEntity = entity;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  SET_RESULTS(state, { results, resultCount }) {
    state.results = results;
    state.resultCount = resultCount;
  },

  CLEAR_RESULTS(state) {
    state.results = [];
    state.resultCount = 0;
    state.error = null;
  },

  ADD_TO_HISTORY(state, searchTerm) {
    if (searchTerm && !state.searchHistory.includes(searchTerm)) {
      state.searchHistory.unshift(searchTerm);
      // Keep only last 10 searches
      if (state.searchHistory.length > 10) {
        state.searchHistory = state.searchHistory.slice(0, 10);
      }
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(state.searchHistory)
      );
    }
  },

  CLEAR_HISTORY(state) {
    state.searchHistory = [];
    localStorage.removeItem("searchHistory");
  },

  CACHE_SEARCH_RESULT(state, { key, data }) {
    state.searchCache.set(key, {
      data,
      timestamp: Date.now(),
    });

    // Clean cache if it gets too large (keep last 50 searches)
    if (state.searchCache.size > 50) {
      const entries = Array.from(state.searchCache.entries());
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      state.searchCache.clear();
      entries.slice(0, 50).forEach(([key, value]) => {
        state.searchCache.set(key, value);
      });
    }
  },
};

const actions = {
  async searchItunes(
    { commit, state },
    {
      term = state.searchTerm,
      entity = state.searchEntity,
      forceRefresh = false,
    } = {}
  ) {
    if (!term || term.trim() === "") {
      commit("CLEAR_RESULTS");
      return;
    }

    const cacheKey = `${term}-${entity}`;

    // Check cache first (if not force refresh and cache is less than 5 minutes old)
    if (!forceRefresh && state.searchCache.has(cacheKey)) {
      const cached = state.searchCache.get(cacheKey);
      const fiveMinutes = 5 * 60 * 1000;

      if (Date.now() - cached.timestamp < fiveMinutes) {
        commit("SET_RESULTS", cached.data);
        commit("SET_ERROR", null);
        return cached.data;
      }
    }

    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await iTunesService.search({
        term: term.trim(),
        entity,
        attribute: "artistTerm",
        limit: 50,
      });

      const resultData = {
        results: response.results || [],
        resultCount: response.resultCount || 0,
      };

      commit("SET_RESULTS", resultData);
      commit("ADD_TO_HISTORY", term.trim());
      commit("CACHE_SEARCH_RESULT", { key: cacheKey, data: resultData });

      return resultData;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.message || "An unexpected error occurred while searching."
      );
      commit("CLEAR_RESULTS");
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updateSearchTerm({ commit }, term) {
    commit("SET_SEARCH_TERM", term);
  },

  updateSearchEntity({ commit, dispatch }, entity) {
    commit("SET_SEARCH_ENTITY", entity);
    // Auto-search when entity changes if there's a search term
    if (state.searchTerm) {
      dispatch("searchItunes");
    }
  },

  clearSearch({ commit }) {
    commit("SET_SEARCH_TERM", "");
    commit("CLEAR_RESULTS");
  },

  clearError({ commit }) {
    commit("SET_ERROR", null);
  },

  clearSearchHistory({ commit }) {
    commit("CLEAR_HISTORY");
  },
};

const getters = {
  hasResults: (state) => state.results.length > 0,
  hasError: (state) => state.error !== null,
  isLoading: (state) => state.loading,
  searchSummary: (state) => {
    if (state.loading) return "Searching...";
    if (state.error) return "Search failed";
    if (state.results.length === 0) return "No results";
    return `${state.resultCount} result${
      state.resultCount !== 1 ? "s" : ""
    } found`;
  },
  recentSearches: (state) => state.searchHistory.slice(0, 5),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
