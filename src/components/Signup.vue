<template>
  <div id="stars"></div>
  <div class="center">
    <h1>ASTEROID</h1>
    <form v-on:submit.prevent="SignUp">
      <div class="txt_field">
        <input
          type="text"
          name="username_signup"
          v-model="username"
          @change="reset"
          required
        />
        <span></span>
        <label>Username</label>
      </div>

      <div class="txt_field">
        <input
          type="password"
          name="passwd_signup"
          v-model="passwd"
          @change="reset"
          required
        />
        <span></span>
        <label>Password</label>
      </div>
      <p style="color: red">{{ messages }}</p>
      <input type="submit" value="SignUp" />
      <!-- <div class="signup_link">
        Don't have an account? <a href="#">Signup</a>
      </div> -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      passwd: "",
      messages: "",
    };
  },
  methods: {
    SignUp() {
      fetch("http://localhost:7681/register", {
        method: "post",
        header: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: this.username,
          passwd: this.passwd,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "oke") {
            console.log(data.data);
            for (let key in data.data) {
              this.$cookies.set("username", key, 60 * 60 * 5);
              this.$cookies.set("highScore", data.data[key], 60 * 60 * 5);
              this.$router.push({ name: "Menu" });
            }
          } else {
            this.messages = data.message;
          }
        });
    },
    reset() {
      this.messages = "";
    },
  },
};
</script>

<style></style>
