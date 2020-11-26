<template>
  <div class="home">
    <!-- navbar top -->
    <v-app-bar app clipped-left>
      <v-toolbar-title> World Tattoo </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="btnThemeSwitch"
        @click="darkThemeSwitch"
        small
        depressed
        outlined
      >
        <v-icon>{{ iconTheme }} </v-icon>
      </v-btn>
      <!--drop down profile-->
      <v-menu bottom :offset-y="offsetMenuY" transition="slide-y-transition">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip>
            <template v-slot:activator="{ on: tooltip }">
              <v-avatar dark v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                <img v-if="profile.avatar" alt="Avatar" :src="profile.avatar" />
                <v-avatar v-else color="orange">{{ profile.lName }}</v-avatar>
              </v-avatar>
            </template>
            <span>Bem vindo ao World Tattoo</span>
          </v-tooltip>
        </template>
        <v-list outlined>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            dense
            @click="MenuActionClick(item.action)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: "ToolBarPrincipal",
  components: {
  },
  data: () => ({
    offsetMenuY: true,
    darkTheme: false,
    iconTheme: "mdi-weather-sunny",
    items: [
      { title: "Profile", icon: "mdi-account", action: "ShowProfile" },
      {
        title: "Message",
        icon: "mdi-message-text-outline",
        action: "ShowMessage",
      },
      { title: "Logout", icon: "mdi-logout", action: "Logout" },
      { title: "About", icon: "mdi-information-outline", action: "ShowAbout" },
    ],
    profile: {
      uID: "",
      fName: "",
      lName: "",
      email: "",
      avatar: "",
    },
  }),
  methods: {
    navigation(where) {
      this.$router.push({ name: where });
    },
    darkThemeSwitch() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        this.iconTheme = "mdi-weather-night";
      } else {
        this.$vuetify.theme.dark = true;
        this.iconTheme = "mdi-weather-sunny";
      }
    },
    MenuActionClick(method) {
      if (method === "ShowProfile") {
        this.ShowProfile();
      } else if (method === "ShowMessage") {
        console.log("Message");
        alert("Em desenvolvimento")
      } else if (method === "Logout") {
        this.Logout();
      } else {
        console.log("About");
        alert("Em desenvolvimento")
      }
    },
    async Logout() {
      await this.$firebase.auth().signOut();
      console.log("O uID " + window.uid + ", foi desconectado!");
      window.uid = "";
      this.navigation("Login");
    },
    ShowProfile() {
      this.navigation("Profile")
    },
  },
};
</script>


<style lang="scss" scoped>
.btnThemeSwitch {
  margin-right: 5px;
}
</style>