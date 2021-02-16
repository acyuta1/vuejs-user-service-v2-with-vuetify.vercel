<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">{{ username }}</h1>
        <h4 class="subheading">Welcome!</h4>
      </v-col>
    </v-row>
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
