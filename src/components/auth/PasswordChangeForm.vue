<template>
  <v-form @submit.prevent="submitNewPassword">
    <v-row align="center" justify="center">
      <v-col cols="12" md="2">
        <p v-if="error">{{ error }}</p>
        <p v-if="!isFormValid">Atlease one of Username or email is required.</p>
        <v-text-field
          :value="username"
          :counter="36"
          label="Username"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="!token">
      <v-col cols="12" md="2">
        <v-text-field
          type="password"
          v-model="oldPassword"
          :rules="oldPasswordRules"
          :counter="36"
          label="Old Password"
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
          :rules="[passwordMatchCheck]"
          :counter="36"
          label="Confirm Password"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-row align="center" justify="center">
        <v-col cols="12" md="2">
          <v-btn type="submit"> Change Password </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-form>
</template>

<script>
import AuthenticationService from '../../service/AuthenticationService';
import UserService from '../../service/UserService';
export default {
  props: ['username', 'token'],

  data() {
    return {
      valid: false,
      oldPassword: '',
      oldPasswordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 5 || 'Password must be greater than 5 characters',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 5 || 'Password must be greater than 5 characters',
      ],
      confirmPassword: '',
      isFormValid: true,
      error: '',
    };
  },

  methods: {
    async submitNewPassword() {
      if (this.token) {
        await AuthenticationService.resetPassword(
          this.token,
          this.username,
          this.password
        )
          .then(() => {
            this.$router.replace('/login');
          })
          .catch((err) => {
            this.error =
              err.response.data.message || 'Failed to Authenticate token';
          });
      } else {
        await UserService.changePassword(
          this.username,
          this.oldPassword,
          this.password
        )
          .then(() => {
            this.$emit('passwordChangeFinished');
          })
          .catch((err) => {
            this.error =
              err.response.data.message || 'Failed to Authenticate token';
          });
      }
    },
  },

  computed: {
    passwordMatchCheck() {
      return this.password === this.confirmPassword || 'Password must match';
    },
  },
};
</script>

