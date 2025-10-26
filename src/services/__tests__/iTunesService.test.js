import { describe, it, expect, vi, beforeEach } from "vitest";
import iTunesService from "../iTunesService";
import axios from "axios";

// Mock axios
vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
    })),
  },
}));

describe("iTunesService", () => {
  let mockAxiosInstance;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockAxiosInstance = axios.create();
  });

  describe("search", () => {
    it("should return results for valid search criteria", async () => {
      const mockResponse = {
        data: {
          results: [
            { trackId: 1, trackName: "Test Song" },
            { trackId: 2, trackName: "Another Song" },
          ],
          resultCount: 2,
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await iTunesService.search({
        term: "test",
        entity: "song",
      });

      expect(result.results).toHaveLength(2);
      expect(result.resultCount).toBe(2);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/search", {
        params: expect.objectContaining({
          term: "test",
          entity: "song",
        }),
      });
    });

    it("should return empty results for empty search term", async () => {
      const result = await iTunesService.search({
        term: "",
        entity: "album",
      });

      expect(result.results).toEqual([]);
      expect(result.resultCount).toBe(0);
      expect(mockAxiosInstance.get).not.toHaveBeenCalled();
    });

    it("should throw error for invalid criteria", async () => {
      await expect(iTunesService.search(null)).rejects.toThrow(
        "Search criteria must be provided as an object"
      );
    });

    it("should handle network errors gracefully", async () => {
      mockAxiosInstance.get.mockRejectedValue({
        request: {},
        message: "Network Error",
      });

      await expect(iTunesService.search({ term: "test" })).rejects.toThrow(
        "Unable to connect to iTunes"
      );
    });

    it("should sanitize and validate search parameters", async () => {
      const mockResponse = {
        data: {
          results: [],
          resultCount: 0,
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await iTunesService.search({
        term: "  test  ",
        entity: "album",
        limit: 300, // Should be capped at 200
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/search", {
        params: expect.objectContaining({
          term: "test", // Trimmed
          limit: 200, // Capped
        }),
      });
    });
  });
});
