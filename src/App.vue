<template>
  <v-app>
    <div>
      <!-- <v-toolbar app dark>
        <v-toolbar-title>Page title</v-toolbar-title>
      </v-toolbar> -->
      <Header />
    </div>
    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from './layout/Header';
export default {
  name: 'App',
  components: {
    Header,
  },
  created() {
    console.log('hey');
    this.$store.dispatch('autoLogin');
  },
};
</script>
