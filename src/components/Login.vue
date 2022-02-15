<template>
  <div id="stars"></div>
  <div class="center">
    <h1>ASTEROID</h1>
    <form v-on:submit.prevent="Login">
      <div class="txt_field">
        <input
          type="text"
          name="username"
          v-model="username"
          required
          @change="reset"
        />
        <span></span>
        <label>Username</label>
      </div>

      <div class="txt_field">
        <input
          type="password"
          name="passwd"
          v-model="passwd"
          required
          @change="reset"
        />
        <span></span>
        <label>Password</label>
      </div>
      <p style="color: red">{{ messages }}</p>
      <input type="submit" value="Login" />
      <div class="signup_link">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </div>
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
    Login() {
      fetch("http://localhost:7681/login", {
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

<style>
/* @mixin sp-layout {
  @media screen and (max-width: 750px) {
    @content;
  }
} */

.center {
  /*BACKGROUND LOGIN*/
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #ffffff;
  padding-bottom: 20px;
}
.center h1 {
  /*LOGIN*/
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 3px solid silver;
  font-size: 50px;
  color: #000;
}
.center form {
  /*FORM*/
  padding: 0 40px;
  box-sizing: border-box;
}
form .txt_field {
  /*TXT FIELD*/
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.txt_field input {
  /*FIELD INPUT*/
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}
.txt_field label {
  /*LABEL*/
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s;
}
.txt_field span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #000;
  transition: 0.3s;
}
.txt_field input:focus ~ label,     /*NAME-TRANSITION*/
.txt_field input:valid ~ label {
  top: -5px;
  color: #000;
}
.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}

input[type="submit"] {
  width: 100%;
  height: 50px;
  border: none;
  background: #aaaaaa;
  font-size: 18px;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}
input[type="submit"]:hover {
  /*LOGIN-TRANSITION*/
  color: #fff;
  border-color: #000;
  background: #000;
  transition: 0.3s;
  outline: none;
}
.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup_link a {
  color: #1d1d1d;
  text-decoration: none;
}
.signup_link a:hover {
  text-decoration: underline;
}
.asteroid {
  width: 100px;
  height: 100px;
  left: 300px;
  top: 300px;
  float: left;
  border: 1px solid white;
  stroke: rgb(160, 160, 160);
  stroke-width: 4px;
  opacity: 1;
  animation: spin 10s linear forwards infinite;
  z-index: -9;
}
</style>
