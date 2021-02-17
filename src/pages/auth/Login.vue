<template>
  <div>
    <v-form
      v-model="valid"
      @submit.prevent="submitLogin"
      v-if="!requestPassword"
    >
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <p v-if="error">{{ error }}</p>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="36"
            label="Username"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            :counter="36"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col cols="12" md="2">
            <v-btn type="submit" color="primary" :disabled="!valid">
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
    <forgot-password
      v-else-if="requestPassword"
      @backToLogin="toggleForgotRequest"
    />
    <v-row align="center" justify="center">
      <v-col cols="12" md="2">
        <v-btn small @click="toggleForgotRequest">
          {{ loginOrForgotPassword }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" md="2">
        <v-btn small @click="signupInstead"> Create a new Account </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ForgotPassword from '../../components/auth/ForgotPassword';
export default {
  components: {
    ForgotPassword,
  },
  data: () => ({
    valid: false,
    username: '',
    password: '',
    error: '',
    requestPassword: false,
    usernameRules: [
      (v) => !!v || 'Username is required',
      (v) => v.length >= 5 || 'Username must be greater than 5 characters',
    ],

    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 5 || 'Password must be greater than 5 characters',
    ],
  }),

  methods: {
    signupInstead() {
      this.$router.replace('/signup');
    },

    async submitLogin() {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });
        this.$router.replace('/');
      } catch (err) {
        this.error = err.response.data.message || 'Failed to Authenticate';
      }
    },

    toggleForgotRequest() {
      this.requestPassword = !this.requestPassword;
    },
  },
  computed: {
    loginOrForgotPassword() {
      return !this.requestPassword
        ? 'Forgot Password?'
        : 'Have an Account? Login instead.';
    },
  },
};
</script>


