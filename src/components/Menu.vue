<template>
  <div class="center" id="menu">
    <div class="option">
      <h1>WELCOME!</h1>
      <router-link to="/home/game">
        <button class="button-option" id="playgame">Play Game</button>
      </router-link>
      <router-link to="/home/rank">
        <button class="button-option" id="highscore">High Score</button>
      </router-link>
      <router-link to="/login">
        <button class="button-option" id="logout">Log Out</button>
      </router-link>
    </div>
  </div>
  <div class="chat">
    <div class="chatbox">
      <div class="chatzone">
        <p v-for="(msg, index) in msgs" :key="index">
          {{ msg.username }} : {{ msg.message }}
        </p>
      </div>
    </div>
    <input
      type="text"
      name="chat"
      id="chatAll"
      v-model="msg"
      @keydown.enter="sendMes"
      @keyup.enter="cleanUp"
      :placeholder="'Send Message as ' + user"
    />
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    msgs: Array,
  },
  data() {
    return {
      msg: "",
      user: this.$cookies.get("username"),
    };
  },
  methods: {
    cleanUp() {
      this.msg = "";
    },
    sendMes() {
      this.$socket.send(
        JSON.stringify({
          SendMess: { username: this.user, message: this.msg },
        })
      );
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
}
::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #010101;
  border: 2px solid #2a2b2e;
  border-radius: 10px;
}
.chat {
  position: absolute;
  bottom: 20%;
  right: 20%;
  width: 400px;
}
.chatbox {
  height: 350px;
  background: black;
  color: white;
  overflow-y: scroll;
}
.chatzone {
  padding-top: 10px;
  margin: 0 10px 0 10px;
}
.chat input {
  margin-top: 5px;
  width: 392px;
  height: 25px;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  border: 1.5px solid rgb(110, 110, 33);
  color: white;
}
.chat input:focus {
  outline: 0;
}
</style>
