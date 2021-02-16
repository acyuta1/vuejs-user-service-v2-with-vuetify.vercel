<template>
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
          <strong>Roles: </strong>{{ roleTypeString(user.roles) }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <strong>IsActive: </strong>{{ user.isActive }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <strong>IsNonLocked: </strong>{{ user.isNonLocked }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions v-if="!loginUser">
      <v-btn color="deep-purple lighten-2" text @click="toggleAdminPriviliges">
        {{ toggleAdmin }}
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click="toggleAccountLock">
        {{ toggleLock }}
      </v-btn>
    </v-card-actions>
    <v-btn color="deep-purple lighten-2" text
      ><router-link :to="backToManagement">Back</router-link></v-btn
    >
  </v-card>
</template>

<script>
import UserService from '../../service/UserService';
export default {
  props: ['username'],
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        isActive: true,
        isNonLocked: true,
      },
    };
  },
  async created() {
    await UserService.getAUser(this.username)
      .then((res) => {
        this.user.firstName = res.data.firstName;
        this.user.lastName = res.data.lastName;
        this.user.email = res.data.email;
        this.user.isActive = res.data.isActive;
        this.user.isNonLocked = res.data.isNonLocked;
        this.user.roles = res.data.roles;
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    roleTypeString(roles) {
      return roles
        .map((r) => {
          return r.roleType;
        })
        .join(',');
    },
    async toggleAdminPriviliges() {
      await UserService.toggleAdminRole(this.username)
        .then(() => this.$router.go(0))
        .catch(
          (err) =>
            (this.errors =
              err.response.data.message || 'Could not toggle priviliges')
        );
    },

    async toggleAccountLock() {
      await UserService.toggleLockAccount(this.username)
        .then(() => this.$router.go(0))
        .catch(
          (err) =>
            (this.errors =
              err.response.data.message || 'Could not toggle Account Lock')
        );
    },
  },

  computed: {
    toggleLock() {
      return this.user.isNonLocked ? 'Lock Account' : 'Unlock Account';
    },

    toggleAdmin() {
      return this.roleTypeString(this.user.roles).includes('ROLE_ADMIN')
        ? 'Revoke Admin Priv'
        : 'Assign Admin Priv';
    },

    loginUser() {
      return this.user.username === this.$store.getters.getUsername;
    },

    backToManagement() {
      return { name: 'userManagement' };
    },
  },
};
</script>