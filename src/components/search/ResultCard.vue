<template>
  <v-card
    class="result-card"
    outlined
    hover
    @click="handleClick"
    :aria-label="`${displayName} by ${result.artistName || 'Unknown Artist'}`"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
  >
    <!-- Artwork -->
    <div class="text-center pa-2 position-relative">
      <v-img
        :src="artworkUrl"
        :alt="`${displayName} artwork`"
        aspect-ratio="1"
        class="rounded"
        :lazy-src="result.artworkUrl60"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <!-- Favorite Button -->
      <v-btn
        icon
        small
        class="favorite-btn"
        @click.stop="toggleFavorite"
        :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'"
      >
        <v-icon :color="isFavorited ? 'red' : 'grey'">
          {{ isFavorited ? "mdi-heart" : "mdi-heart-outline" }}
        </v-icon>
      </v-btn>

      <!-- Play Button Overlay -->
      <v-btn
        v-if="hasPreview"
        icon
        large
        class="play-btn"
        @click.stop="playPreview"
        aria-label="Play preview"
      >
        <v-icon large color="white">mdi-play-circle</v-icon>
      </v-btn>
    </div>

    <!-- Card Content -->
    <v-card-text class="pa-2 card-content">
      <div
        class="body-2 font-weight-medium text-truncate mb-1"
        :title="displayName"
      >
        {{ displayName }}
      </div>
      <div
        class="caption grey--text text-truncate"
        v-if="result.artistName"
        :title="result.artistName"
      >
        {{ result.artistName }}
      </div>
      <div
        class="caption grey--text mt-1 d-flex justify-space-between align-center"
      >
        <span v-if="releaseYear">{{ releaseYear }}</span>
        <v-chip v-if="resultType" x-small outlined>{{ resultType }}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ResultCard",

  props: {
    result: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("favorites", ["isFavorite"]),

    displayName() {
      if (this.result.wrapperType === "artist") {
        return this.result.artistName;
      } else if (this.result.wrapperType === "track") {
        return this.result.trackName;
      } else {
        return (
          this.result.collectionName ||
          this.result.trackName ||
          this.result.artistName
        );
      }
    },

    artworkUrl() {
      return (
        this.result.artworkUrl100 ||
        this.result.artworkUrl60 ||
        "/placeholder-album.png"
      );
    },

    releaseYear() {
      if (!this.result.releaseDate) return "";
      return this.result.releaseDate.substring(0, 4);
    },

    resultType() {
      const type = this.result.wrapperType;
      if (type === "track") return "Song";
      if (type === "collection") return "Album";
      if (type === "artist") return "Artist";
      return type ? type.charAt(0).toUpperCase() + type.slice(1) : "";
    },

    hasPreview() {
      return !!this.result.previewUrl;
    },

    isFavorited() {
      return this.isFavorite(this.result);
    },
  },

  methods: {
    ...mapActions("favorites", ["toggleFavorite"]),
    ...mapActions("ui", ["showNotification"]),

    handleClick() {
      this.openInItunes();
    },

    openInItunes() {
      const url =
        this.result.trackViewUrl ||
        this.result.collectionViewUrl ||
        this.result.artistViewUrl;

      if (url) {
        window.open(url, "_blank");
      }
    },

    playPreview() {
      if (this.hasPreview) {
        window.open(this.result.previewUrl, "_blank");
      }
    },

    toggleFavorite() {
      this.$store.dispatch("favorites/toggleFavorite", this.result);

      const message = this.isFavorited
        ? "Removed from favorites"
        : "Added to favorites";

      this.showNotification({
        message,
        type: this.isFavorited ? "info" : "success",
        timeout: 2000,
      });
    },
  },
};
</script>

<style scoped>
.result-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.position-relative {
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.9) !important;
  z-index: 2;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6) !important;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.result-card:hover .play-btn {
  opacity: 1;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
