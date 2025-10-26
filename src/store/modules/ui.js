// UI state management
const state = {
  // Theme and appearance
  darkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),

  // Layout and navigation
  drawerOpen: false,
  currentView: "search", // 'search', 'favorites', 'about'

  // Search UI state
  searchView: "grid", // 'grid', 'list'
  resultsPerPage: 24,
  currentPage: 1,

  // Notifications/snackbars
  notifications: [],

  // Modal states
  showPreviewModal: false,
  previewItem: null,

  // App loading state
  appLoading: false,
};

const mutations = {
  SET_DARK_MODE(state, enabled) {
    state.darkMode = enabled;
    localStorage.setItem("darkMode", JSON.stringify(enabled));
  },

  SET_DRAWER_OPEN(state, open) {
    state.drawerOpen = open;
  },

  SET_CURRENT_VIEW(state, view) {
    state.currentView = view;
  },

  SET_SEARCH_VIEW(state, view) {
    state.searchView = view;
  },

  SET_RESULTS_PER_PAGE(state, count) {
    state.resultsPerPage = count;
    state.currentPage = 1; // Reset to first page
  },

  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },

  ADD_NOTIFICATION(state, notification) {
    const id = Date.now() + Math.random();
    state.notifications.push({
      id,
      type: "info",
      timeout: 5000,
      ...notification,
    });
  },

  REMOVE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter((n) => n.id !== id);
  },

  CLEAR_NOTIFICATIONS(state) {
    state.notifications = [];
  },

  SHOW_PREVIEW_MODAL(state, item) {
    state.showPreviewModal = true;
    state.previewItem = item;
  },

  HIDE_PREVIEW_MODAL(state) {
    state.showPreviewModal = false;
    state.previewItem = null;
  },

  SET_APP_LOADING(state, loading) {
    state.appLoading = loading;
  },
};

const actions = {
  toggleDarkMode({ commit, state }) {
    commit("SET_DARK_MODE", !state.darkMode);
  },

  setDarkMode({ commit }, enabled) {
    commit("SET_DARK_MODE", enabled);
  },

  toggleDrawer({ commit, state }) {
    commit("SET_DRAWER_OPEN", !state.drawerOpen);
  },

  setDrawerOpen({ commit }, open) {
    commit("SET_DRAWER_OPEN", open);
  },

  navigateTo({ commit }, view) {
    commit("SET_CURRENT_VIEW", view);
  },

  setSearchView({ commit }, view) {
    commit("SET_SEARCH_VIEW", view);
  },

  setResultsPerPage({ commit }, count) {
    commit("SET_RESULTS_PER_PAGE", count);
  },

  setCurrentPage({ commit }, page) {
    commit("SET_CURRENT_PAGE", page);
  },

  showNotification({ commit }, notification) {
    commit("ADD_NOTIFICATION", notification);

    // Auto-remove notification after timeout
    if (notification.timeout !== 0) {
      setTimeout(() => {
        commit("REMOVE_NOTIFICATION", notification.id);
      }, notification.timeout || 5000);
    }
  },

  removeNotification({ commit }, id) {
    commit("REMOVE_NOTIFICATION", id);
  },

  clearAllNotifications({ commit }) {
    commit("CLEAR_NOTIFICATIONS");
  },

  showPreview({ commit }, item) {
    commit("SHOW_PREVIEW_MODAL", item);
  },

  hidePreview({ commit }) {
    commit("HIDE_PREVIEW_MODAL");
  },

  setAppLoading({ commit }, loading) {
    commit("SET_APP_LOADING", loading);
  },
};

const getters = {
  isDarkMode: (state) => state.darkMode,
  isDrawerOpen: (state) => state.drawerOpen,
  currentView: (state) => state.currentView,
  isSearchView: (state) => state.currentView === "search",
  isFavoritesView: (state) => state.currentView === "favorites",
  isAboutView: (state) => state.currentView === "about",

  searchViewMode: (state) => state.searchView,
  isGridView: (state) => state.searchView === "grid",
  isListView: (state) => state.searchView === "list",

  paginationInfo: (state) => ({
    resultsPerPage: state.resultsPerPage,
    currentPage: state.currentPage,
  }),

  activeNotifications: (state) => state.notifications,
  hasNotifications: (state) => state.notifications.length > 0,

  previewModalState: (state) => ({
    show: state.showPreviewModal,
    item: state.previewItem,
  }),

  isAppLoading: (state) => state.appLoading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
