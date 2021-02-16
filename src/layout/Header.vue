<template>
  <v-app-bar app dark>
    <v-toolbar-title
      ><v-btn @click="redirectToHomePage">Achyutha</v-btn></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn @click="login" v-if="!isAuthenticated">Login</v-btn>
    <v-btn @click="userManagement" v-if="isAdmin">User Management</v-btn>
    <v-btn @click="goToProfile" v-if="isAuthenticated">My Profile</v-btn>
    <v-btn @click="logout" v-if="isAuthenticated">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isAdmin() {
      return this.isAuthenticated && this.$store.getters.isAdmin;
    },
  },

  methods: {
    goToProfile() {
      this.$router.push({ name: 'profile' });
    },
    redirectToHomePage() {
      this.$router.push({ name: 'home' });
    },
    login() {
      this.$router.replace({ name: 'login' });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace({ name: 'login' });
    },
    userManagement() {
      this.$router.push({ name: 'userManagement' });
    },
  },
};
</script>