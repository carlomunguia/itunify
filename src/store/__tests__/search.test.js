import { describe, it, expect, beforeEach } from "vitest";
import searchModule from "../modules/search";

describe("Search Store Module", () => {
  let state;

  beforeEach(() => {
    state = {
      searchTerm: "",
      searchEntity: "album",
      results: [],
      resultCount: 0,
      loading: false,
      error: null,
      searchHistory: [],
      searchCache: new Map(),
      entities: [
        { text: "Albums", value: "album" },
        { text: "Artists", value: "musicArtist" },
        { text: "Songs", value: "song" },
      ],
    };
  });

  describe("mutations", () => {
    it("SET_SEARCH_TERM should update search term", () => {
      searchModule.mutations.SET_SEARCH_TERM(state, "test query");
      expect(state.searchTerm).toBe("test query");
    });

    it("SET_LOADING should update loading state", () => {
      searchModule.mutations.SET_LOADING(state, true);
      expect(state.loading).toBe(true);
    });

    it("SET_RESULTS should update results and count", () => {
      const results = [
        { trackId: 1, trackName: "Song 1" },
        { trackId: 2, trackName: "Song 2" },
      ];
      searchModule.mutations.SET_RESULTS(state, { results, resultCount: 2 });
      expect(state.results).toEqual(results);
      expect(state.resultCount).toBe(2);
    });

    it("CLEAR_RESULTS should reset results and error", () => {
      state.results = [{ trackId: 1 }];
      state.resultCount = 1;
      state.error = "Some error";

      searchModule.mutations.CLEAR_RESULTS(state);

      expect(state.results).toEqual([]);
      expect(state.resultCount).toBe(0);
      expect(state.error).toBeNull();
    });

    it("ADD_TO_HISTORY should add unique terms to history", () => {
      searchModule.mutations.ADD_TO_HISTORY(state, "test1");
      searchModule.mutations.ADD_TO_HISTORY(state, "test2");
      searchModule.mutations.ADD_TO_HISTORY(state, "test1"); // Duplicate

      expect(state.searchHistory).toHaveLength(2);
      expect(state.searchHistory).toContain("test1");
      expect(state.searchHistory).toContain("test2");
    });

    it("should limit search history to 10 items", () => {
      for (let i = 0; i < 15; i++) {
        searchModule.mutations.ADD_TO_HISTORY(state, `test${i}`);
      }

      expect(state.searchHistory).toHaveLength(10);
      expect(state.searchHistory[0]).toBe("test14"); // Most recent first
    });
  });

  describe("getters", () => {
    it("hasResults should return true when results exist", () => {
      state.results = [{ trackId: 1 }];
      expect(searchModule.getters.hasResults(state)).toBe(true);

      state.results = [];
      expect(searchModule.getters.hasResults(state)).toBe(false);
    });

    it("hasError should return true when error exists", () => {
      state.error = "Some error";
      expect(searchModule.getters.hasError(state)).toBe(true);

      state.error = null;
      expect(searchModule.getters.hasError(state)).toBe(false);
    });

    it("searchSummary should return appropriate message", () => {
      state.loading = true;
      expect(searchModule.getters.searchSummary(state)).toBe("Searching...");

      state.loading = false;
      state.error = "Error occurred";
      expect(searchModule.getters.searchSummary(state)).toBe("Search failed");

      state.error = null;
      state.results = [];
      expect(searchModule.getters.searchSummary(state)).toBe("No results");

      state.results = [{ trackId: 1 }];
      state.resultCount = 1;
      expect(searchModule.getters.searchSummary(state)).toBe("1 result found");

      state.resultCount = 5;
      expect(searchModule.getters.searchSummary(state)).toBe("5 results found");
    });
  });
});
