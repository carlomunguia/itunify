import axios from "axios";

// Configure axios instance for iTunes API
const apiClient = axios.create({
  baseURL: "https://itunes.apple.com",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default class iTunesService {
  static async search(criteria) {
    try {
      // Input validation
      if (!criteria || typeof criteria !== "object") {
        throw new Error("Search criteria must be provided as an object");
      }

      if (!criteria.term || criteria.term.trim() === "") {
        return { results: [], resultCount: 0 };
      }

      // Sanitize and validate search parameters
      const searchParams = {
        term: criteria.term.trim(),
        entity: criteria.entity || "album",
        attribute: criteria.attribute || "artistTerm",
        limit: Math.min(criteria.limit || 50, 200), // Cap at 200 for performance
        media: criteria.media || "music",
        country: criteria.country || "US",
      };

      const response = await apiClient.get("/search", {
        params: searchParams,
      });

      // Validate response structure
      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid response format from iTunes API");
      }

      return {
        results: response.data.results || [],
        resultCount: response.data.resultCount || 0,
      };
    } catch (error) {
      // Enhanced error handling
      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Request timed out. Please check your internet connection."
        );
      }

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        if (status === 403) {
          throw new Error(
            "Access denied. iTunes API may be temporarily unavailable."
          );
        } else if (status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment before searching again."
          );
        } else if (status >= 500) {
          throw new Error(
            "iTunes service is temporarily unavailable. Please try again later."
          );
        }
        throw new Error(`Search failed with status ${status}`);
      }

      if (error.request) {
        // Network error
        throw new Error(
          "Unable to connect to iTunes. Please check your internet connection."
        );
      }

      // Re-throw custom errors or unexpected errors
      throw error;
    }
  }
}
