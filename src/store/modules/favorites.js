// Favorites management state
const state = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  favoritesFilter: "all", // 'all', 'albums', 'artists', 'songs'
};

const mutations = {
  ADD_FAVORITE(state, item) {
    const exists = state.favorites.find(
      (fav) =>
        fav.trackId === item.trackId ||
        fav.collectionId === item.collectionId ||
        fav.artistId === item.artistId
    );

    if (!exists) {
      const favoriteItem = {
        ...item,
        favoritedAt: new Date().toISOString(),
        id: item.trackId || item.collectionId || item.artistId,
      };
      state.favorites.unshift(favoriteItem);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  },

  REMOVE_FAVORITE(state, itemId) {
    state.favorites = state.favorites.filter((fav) => fav.id !== itemId);
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  },

  CLEAR_FAVORITES(state) {
    state.favorites = [];
    localStorage.removeItem("favorites");
  },

  SET_FAVORITES_FILTER(state, filter) {
    state.favoritesFilter = filter;
  },
};

const actions = {
  addToFavorites({ commit }, item) {
    commit("ADD_FAVORITE", item);
  },

  removeFromFavorites({ commit }, itemId) {
    commit("REMOVE_FAVORITE", itemId);
  },

  toggleFavorite({ state, commit }, item) {
    const itemId = item.trackId || item.collectionId || item.artistId;
    const isFavorited = state.favorites.some((fav) => fav.id === itemId);

    if (isFavorited) {
      commit("REMOVE_FAVORITE", itemId);
    } else {
      commit("ADD_FAVORITE", item);
    }
  },

  clearAllFavorites({ commit }) {
    commit("CLEAR_FAVORITES");
  },

  setFavoritesFilter({ commit }, filter) {
    commit("SET_FAVORITES_FILTER", filter);
  },
};

const getters = {
  favoritesList: (state) => state.favorites,

  filteredFavorites: (state) => {
    if (state.favoritesFilter === "all") {
      return state.favorites;
    }

    return state.favorites.filter((item) => {
      switch (state.favoritesFilter) {
        case "albums":
          return item.wrapperType === "collection";
        case "artists":
          return item.wrapperType === "artist";
        case "songs":
          return item.wrapperType === "track";
        default:
          return true;
      }
    });
  },

  favoritesCount: (state) => state.favorites.length,

  isFavorite: (state) => (item) => {
    const itemId = item.trackId || item.collectionId || item.artistId;
    return state.favorites.some((fav) => fav.id === itemId);
  },

  favoritesByType: (state) => {
    const types = {
      albums: 0,
      artists: 0,
      songs: 0,
      other: 0,
    };

    state.favorites.forEach((item) => {
      switch (item.wrapperType) {
        case "collection":
          types.albums++;
          break;
        case "artist":
          types.artists++;
          break;
        case "track":
          types.songs++;
          break;
        default:
          types.other++;
      }
    });

    return types;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
