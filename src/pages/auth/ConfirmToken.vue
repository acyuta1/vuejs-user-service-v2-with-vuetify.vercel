<template>
  <PasswordChangeForm
    :username="username"
    :token="token"
    v-if="forgotPasswordCorrectToken"
  />
  <v-row align="center" justify="center" v-else>
    <v-col class="text-center" cols="12">
      <h1 class="display-1 font-weight-thin mb-4" v-if="signupCorrectToken">
        Redirecting you to Login page.
        <router-link to="/login"> click here if not redirected. </router-link>
      </h1>
      <h1
        class="display-1 font-weight-thin mb-4"
        v-if="signupInorrectToken || error || forgotPasswordIncorrectToken"
      >
        Incorrect Token Provided {{ error }}
      </h1>
    </v-col>
  </v-row>
</template>

<script>
import PasswordChangeForm from '../../components/auth/PasswordChangeForm';
import AuthenticationService from '../../service/AuthenticationService';
export default {
  props: ['authType', 'token'],
  components: {
    PasswordChangeForm,
  },
  data() {
    return {
      isAuthenticated: false,
      username: '',
      error: '',
    };
  },

  async created() {
    await AuthenticationService.confirmToken(this.authType, this.token)
      .then((res) => {
        this.isAuthenticated = !!res.data.authenticated;
        this.username = res.data.username;

        if (this.isAuthenticated === true && this.authType === 'signup') {
          setTimeout(() => {
            this.$router.replace('/login');
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        this.error =
          err.response.data.message || 'Failed to Authenticate token';
      });
  },

  computed: {
    signupCorrectToken() {
      return this.authType === 'signup' && this.isAuthenticated === true;
    },

    signupInorrectToken() {
      return this.authType === 'signup' && this.isAuthenticated === false;
    },
    forgotPasswordCorrectToken() {
      return (
        this.authType === 'forgot_password' && this.isAuthenticated === true
      );
    },
    forgotPasswordIncorrectToken() {
      return (
        this.authType === 'forgot_password' && this.isAuthenticated === false
      );
    },
  },
};
</script>
