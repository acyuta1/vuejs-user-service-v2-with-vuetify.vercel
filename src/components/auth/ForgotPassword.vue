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
    };
  },

  methods: {
    async resetPassword() {
      this.isFormValid = true;

      if (!this.username && !this.email) {
        this.isFormValid = false;
        return;
      }
      console.log(this.username);
      try {
        await this.$store.dispatch('resetPasswordRequest', {
          username: this.username,
          email: this.email,
        });
        this.$emit('backToLogin');
      } catch (err) {
        this.error = err.response.data.message || 'Failed to request reset.';
      }
    },
  },
};
</script>
