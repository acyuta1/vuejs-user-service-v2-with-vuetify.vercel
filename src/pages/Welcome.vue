<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <h1>Hello {{ username }}</h1>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },

  created() {
    this.username = this.$store.getters.getUsername;
  },
};
</script>
