<template>
  <v-app-bar app dark>
    <v-toolbar-title>Achyutha</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="login" v-if="!isAuthenticated">Login</v-btn>
    <v-btn @click="logout" v-if="isAuthenticated">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    login() {
      this.$router.replace({ name: 'login' });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>