<template>
  <div>
    <v-form @submit.prevent="resetPassword">
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <p v-if="error">{{ error }}</p>
          <p v-if="!isFormValid">Invalid credentials passed!</p>
          <v-text-field
            v-model="username"
            :counter="36"
            label="Username"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2"> --OR-- </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="email"
            :counter="100"
            label="Email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col cols="12" md="2">
            <v-btn type="submit"> Request Password Change </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-overlay v-if="loadingScreen">
        <v-layout justify-center align-center>
          <v-flex justify-center xs10 class="mx-auto">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-overlay>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      isFormValid: true,
      error: '',
      loadingScreen: false,
    };
  },

  methods: {
    async resetPassword() {
      this.isFormValid = true;

      if (!this.username && !this.email) {
        this.isFormValid = false;
        return;
      }
      this.loadingScreen = true;
      try {
        await this.$store.dispatch('resetPasswordRequest', {
          username: this.username,
          email: this.email,
        });
        this.loadingScreen = false;
        this.$emit('backToLogin');
      } catch (err) {
        this.loadingScreen = false;
        this.error = err.response.data.message || 'Failed to request reset.';
      }
    },
  },
};
</script>
