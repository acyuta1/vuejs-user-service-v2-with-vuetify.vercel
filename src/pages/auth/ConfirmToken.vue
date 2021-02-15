<template>
  <p v-if="signupCorrectToken">
    Authenticated Successfully! Redirecting you to Login page.
    <router-link to="/login"> here if not redirected. </router-link>
  </p>
  <p v-else-if="signupInorrectToken || error || forgotPasswordIncorrectToken">
    Incorrect Token Provided {{ error }}
  </p>
  <PasswordChangeForm
    :username="username"
    :token="token"
    v-else-if="forgotPasswordCorrectToken"
  />
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
