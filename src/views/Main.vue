<template>
  <div id="Main"><ToolBarLogin/></div>
</template>

<script>
import ToolBarLogin from "@/components/ToolBarLogin"

export default {
  name: "Main",
  components: {
    ToolBarLogin,
  },
  data: () => ({}),
  methods: {
    isAuth() {
      this.$firebase.auth().onAuthStateChanged(() => {
        if (!window.uid) {
          /* (window.uid != user.uid) || (window.uid == null) */
          this.$router.push({ name: "Login" });
          console.log(
            "Não foi possível localizar seus dados pessoais, realize o login novamente."
          );
        } else {
          console.log("uID conectado é: " + window.uid);
        }
      });
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.isAuth();
    });
  },
};
</script>