<template>
  <div
    v-if="isLoading && !hasResults"
    class="loading-container text-center py-8"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
      width="6"
    ></v-progress-circular>
    <div class="mt-4 headline">Searching iTunes...</div>
    <div class="mt-2 body-2 grey--text">Finding the best results for you</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoadingState",

  computed: {
    ...mapGetters("search", ["isLoading", "hasResults"]),
  },
};
</script>

<style scoped>
.loading-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
