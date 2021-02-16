<template>
  <user-details :users="users" />
</template>

<script>
import UserService from '../../service/UserService';
import UserDetails from '../../components/user/UserDetails.vue';
export default {
  components: {
    UserDetails,
  },
  data() {
    return {
      users: [],
      errors: '',
    };
  },

  methods: {},
  async created() {
    await UserService.getAllUsers()
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        this.error = err;
      });
  },
};
</script>