<template>
  <div class="login-site">
    <Login v-if="!signup" />
    <SignUp v-else />
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import SignUp from "../components/Signup";
export default {
  props: {
    signup: Boolean,
  },
  components: {
    Login,
    SignUp,
  },
};
</script>

<style scoped>
.login-site {
  height: 100%;
  width: 100%;
}
</style>
