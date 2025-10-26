<template>
  <v-alert
    v-if="hasError"
    type="error"
    dismissible
    @click:close="clearError"
    class="mb-4"
    outlined
    prominent
  >
    <v-row align="center">
      <v-col class="grow">
        <div class="font-weight-bold mb-1">Search Error</div>
        <div>{{ error }}</div>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ErrorAlert",

  computed: {
    ...mapGetters("search", ["hasError"]),

    error() {
      return this.$store.state.search.error;
    },
  },

  methods: {
    ...mapActions("search", ["clearError"]),
  },
};
</script>
