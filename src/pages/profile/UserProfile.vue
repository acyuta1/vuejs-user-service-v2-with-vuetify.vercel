<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card class="mx-auto my-12" max-width="374">
        <v-card-title>{{ user.username }}</v-card-title>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <strong> Name: </strong>{{ user.firstName }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>Last Name: </strong>{{ user.lastName }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>Email: </strong>{{ user.email }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>DOB: </strong>{{ user.dateOfBirth }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="toggleChangePassword"
          >
            Change Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col class="text-center" cols="12" md="8">
      <PasswordChangeForm
        :username="user.username"
        v-if="changePassword"
        @passwordChangeFinished="toggleChangePassword"
      />
    </v-col>
  </v-row>
</template>

<script>
import UserService from '../../service/UserService';
import PasswordChangeForm from '../../components/auth/PasswordChangeForm';
export default {
  components: {
    PasswordChangeForm,
  },
  data() {
    return {
      user: {
        username: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        email: '',
      },
      error: '',
      changePassword: false,
      loadingScreen: false,
    };
  },
  async created() {
    await UserService.getAUser(this.$store.getters.getUsername)
      .then((res) => {
        this.user.username = res.data.username;
        this.user.firstName = res.data.firstName;
        this.user.lastName = res.data.lastName;
        this.user.dateOfBirth = res.data.dateOfBirth;
        this.user.email = res.data.email;
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    toggleChangePassword() {
      this.changePassword = !this.changePassword;
    },
  },
};
</script>