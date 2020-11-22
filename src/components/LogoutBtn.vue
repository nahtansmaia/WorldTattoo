<template>
  <v-btn class="btnPrincipal" @click="Logout()">Logout</v-btn>
</template>

<script>
export default {
  name: "LogoutBtn",
  methods: {
    async Logout() {
        await this.$firebase.auth().signOut();
        console.log("O uID atual " + window.uid + ", foi desconectado!");
        window.uid = "";
        this.$router.push({name: "Login"});
    },
  },
};
</script>