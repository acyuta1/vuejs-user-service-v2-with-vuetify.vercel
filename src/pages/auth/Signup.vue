<template>
  <div>
    <v-form v-model="valid" @submit.prevent="subgmitSignup">
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <div v-if="error">
            {{ error }}
          </div>
          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            :counter="36"
            label="First Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            :counter="36"
            label="Last Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :counter="100"
            label="Email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
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
            type="date"
            v-model="dateOfBirth"
            label="Date Of Birth"
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
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <v-text-field
            type="password"
            v-model="confirmPassword"
            :rules="[password === confirmPassword || 'Password must match']"
            :counter="36"
            label="Confirm Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col cols="12" md="2">
            <v-btn type="submit" color="primary" :disabled="!valid">
              Signup
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
    <v-row align="center" justify="center">
      <v-col cols="12" md="2">
        <v-btn @click="loginInstead"> Have an Account? Login Instead </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      valid: false,
      firstName: '',
      firstNameRules: [
        (v) => !!v || 'First Name is required',
        (v) => v.length >= 6 || 'Firstname must be greater than 6 characters',
      ],
      lastName: '',
      lastNameRules: [
        (v) => !!v || 'Last Name is required',
        (v) => v.length >= 6 || 'Last Name must be greater than 6 characters',
      ],
      username: '',
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => v.length >= 6 || 'Username must be greater than 6 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      dateOfBirth: moment(new Date()).format('yyyy-MM-DD'),
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be greater than 6 characters',
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        (v) => !!v || 'Confirm password is required',
        (v) =>
          v.length <= 6 || 'Confirm password must be greater than 6 characters',
      ],
      error: '',
    };
  },

  methods: {
    loginInstead() {
      this.$router.replace('/login');
    },
    async subgmitSignup() {
      try {
        await this.$store.dispatch('signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          dateOfBirth: this.dateOfBirth,
          password: this.password,
        });
        this.$router.replace('/login');
      } catch (err) {
        this.error =
          err.response.data.message || 'Failed to create new account';
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || 'Password must match';
    },
  },
};
</script>

