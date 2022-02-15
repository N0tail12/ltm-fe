<template>
  <div id="stars"></div>
  <router-view :users="users" :msgs="msgs"></router-view>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      msgs: [],
    };
  },
  created() {
    if (!this.$cookies.isKey("username") && !this.$cookies.isKey("highScore")) {
      this.$router.push({ name: "Login-Site" });
    }
  },
  mounted() {
    console.log("Main Mounted");
    this.$connect("ws://localhost:7681/");
    console.log("Connected");
    this.$options.sockets.onopen = () => {
      console.log("On Open");
      this.$socket.send(JSON.stringify("GetUsers"));
    };
    this.$options.sockets.onmessage = (m) => {
      let data = JSON.parse(m.data);
      console.log(data);
      if (data.HighScore) {
        let sortable = [];
        for (let user in data.HighScore) {
          sortable.push([user, data.HighScore[user]]);
        }
        sortable.sort(function (a, b) {
          return b[1] - a[1];
        });
        this.users = [...(sortable || [])];
        console.log(this.users);
      } else if (data.SendToAll) {
        this.msgs.push({ ...data.SendToAll });
        console.log(this.msgs);
      }
    };
  },
};
</script>

<style>
#ranking {
  width: 100%;
}
#table {
  /* width: 500px; */
  text-align: center;
  background-color: #fff;
  /* min-height: 70%; */
}
.high-score-title {
  color: white;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
#asteroid {
  width: 100vw;
  height: 100vh;
}
.option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button-option {
  appearance: none;
  background-color: #000000;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-top: 10px;
  min-height: 60px;
  width: 10rem;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  /* width: 100%; */
  will-change: transform;
}

/* CSS */
.back {
  background: #e62143;
  border-radius: 11px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: Mija, -apple-system, BlinkMacSystemFont, Roboto, "Roboto Slab",
    "Droid Serif", "Segoe UI", system-ui, Arial, sans-serif;
  font-size: 1em;
  font-weight: 500;
  justify-content: center;
  padding: 0.8em 1em;
  text-align: center;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  text-shadow: rgba(0, 0, 0, 0.3) 1px 1px 1px;
  text-underline-offset: 1px;
  transition: all 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 10rem;
  word-break: break-word;
  border: 0;
}

.back:active,
.back:focus {
  border-bottom-style: none;
  border-color: #dadada;
  box-shadow: rgba(0, 0, 0, 0.3) 0 3px 3px inset;
  outline: 0;
}

.back:hover {
  border-bottom-style: none;
  border-color: #dadada;
}
.link {
  width: 10rem;
}
a {
  text-decoration: none;
}
</style>
