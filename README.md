# 🎵 iTunify

A modern, feature-rich Vue.js application for searching and discovering music through the iTunes API.

## ✨ Features

### 🎨 User Experience

- **Real-time Search** - Debounced search with instant results
- **Multiple Content Types** - Search for albums, artists, songs, music videos, and podcasts
- **Favorites System** - Save and manage your favorite music with persistent storage
- **Multiple View Modes** - Toggle between grid and list views
- **Dark Mode** - Toggle between light and dark themes with persistent preference
- **Search History** - Track and quickly access recent searches
- **Responsive Design** - Beautiful UI that works on all devices
- **Error Handling** - Graceful error messages and loading states
- **Accessibility** - ARIA labels and keyboard navigation support

### 🏗️ Architecture

- **Vuex State Management** - Centralized state for search and UI
- **Component-based Design** - Modular, reusable components
- **Vite Build Tool** - Ultra-fast HMR and build times
- **Vue 2.7** - Latest Vue 2 with modern features
- **Vitest Testing** - Modern, fast unit testing framework

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Lint and fix files
npm run lint
```

## 📦 Tech Stack

- **Frontend Framework**: Vue 2.7.14
- **UI Framework**: Vuetify 2.6.15
- **State Management**: Vuex 3.6.2
- **HTTP Client**: Axios 1.6.0
- **Build Tool**: Vite 5.0.0
- **Testing**: Vitest 1.0.0
- **Router**: Vue Router 3.6.5
- **Icons**: Material Design Icons (@mdi/font)

## 🗂️ Project Structure

```
itunify/
├── src/
│   ├── components/
│   │   └── search/
│   │       ├── SearchBar.vue        # Search input and filters
│   │       ├── ResultCard.vue       # Individual result display
│   │       ├── ResultsGrid.vue      # Results layout (grid/list)
│   │       ├── ErrorAlert.vue       # Error message display
│   │       └── LoadingState.vue     # Loading indicator
│   ├── store/
│   │   ├── index.js                 # Vuex store root
│   │   └── modules/
│   │       ├── search.js            # Search state & logic
│   │       ├── favorites.js         # Favorites management
│   │       └── ui.js                # UI state (theme, view mode)
│   ├── services/
│   │   ├── iTunesService.js         # iTunes API client
│   │   └── __tests__/               # Service unit tests
│   ├── views/
│   │   ├── Home.vue                 # Main search page
│   │   ├── Favorites.vue            # Favorites page
│   │   └── About.vue                # About page
│   ├── plugins/
│   │   └── vuetify.js               # Vuetify configuration
│   ├── router.js                    # Vue Router config
│   └── main.js                      # App entry point
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies
└── index.html                       # HTML entry point
```

## 🎯 Key Features

### Dark Mode

- Toggle between light and dark themes
- Preference saved to localStorage
- Smooth theme transitions

### View Modes

- **Grid View**: Card-based layout with album artwork
- **List View**: Compact list with details and pricing

### Favorites System

- Save unlimited favorites with one click
- Dedicated favorites page
- Filter by type (songs, albums, artists)
- Persistent storage using localStorage
- Badge showing favorite count in navigation
- Quick toggle from result cards

### Search Functionality

- Debounced input (500ms) to reduce API calls
- Search history with recent searches
- Multiple search entity types (albums, songs, artists, etc.)
- Real-time error handling and loading states

### State Management

Vuex modules handle different concerns:

- **search**: Search state, results, and history
- **favorites**: Favorite items management and filtering
- **ui**: Theme preferences and view mode

## 🧪 Testing

```bash
# Run tests once
npm run test

# Run tests with UI
npm run test:ui
```

Current test coverage:

- ✅ Search store mutations and getters
- ✅ iTunes service error handling
- ✅ Input validation and sanitization

## 🌐 API

This app uses the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/).

### Search Parameters

- `term`: Search query (required)
- `entity`: album, musicArtist, song, musicVideo, podcast
- `limit`: Max results (default: 50, max: 200)
- `media`: music, movie, podcast, etc.
- `country`: 2-letter country code (default: US)

## ⚠️ Known Issues

### Security Vulnerabilities

The project currently has 10 moderate security vulnerabilities in development dependencies:

1. **esbuild** - Development server vulnerability (only affects local dev)
2. **Vue 2.7.16** - ReDoS vulnerability in HTML parser
3. **vue-template-compiler** - Build-time XSS vulnerability

**Note**: These vulnerabilities:

- Only affect development environment, not production builds
- Would require breaking changes to fix (Vue 3 migration)
- Are acceptable for development and learning projects
- Should be addressed in future major version upgrade

To see details: `npm audit`

## 🚧 Planned Features

- [ ] Pagination for large result sets
- [ ] Advanced filtering options
- [ ] Audio preview functionality
- [ ] Share search results
- [ ] Export favorites

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Vue.js and the iTunes API
