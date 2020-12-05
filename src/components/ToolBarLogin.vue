<template>
  <div class="home">
    <!-- navbar top -->
    <v-app-bar app clipped-left>
      <v-toolbar-title> World Tattoo</v-toolbar-title>
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
    <MessengerScreen :dialog="dialogMessenger" />
  </div>
</template>

<script>
import MessengerScreen from "@/components/MessengerScreen";
export default {
  name: "ToolBarPrincipal",
  components: {
    MessengerScreen,
  },
  data: () => ({
    dialogMessenger: false,
    offsetMenuY: true,
    darkTheme: false,
    iconTheme: "mdi-weather-sunny",
    profile: {
      uID: "",
      fName: "",
      lName: "",
      email: "",
      phone: "",
      birthdate: "",
      tag: "",
      avatar: "",
      createdAt: "",
      file: "",
    },
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
  }),
  mounted() {
    this.loadProfile();
  },
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
        this.dialogMessenger = true;
      } else if (method === "Logout") {
        this.Logout();
      } else {
        this.ShowAbout();
      }
    },
    async Logout() {
      await this.$firebase.auth().signOut();
      console.log("O uID " + window.uid + ", foi desconectado!");
      window.uid = "";
      this.navigation("Login");
    },
    ShowProfile() {
      this.navigation("Profile");
    },

    async loadProfile() {
      const ProfileUser = {
        ...this.profile,
      };
      const ref = this.$firebase.database().ref(window.uid + "/Profile");
      await ref.once("value").then(function (snapshop) {
        ProfileUser.fName = snapshop.child("fName").val();
        ProfileUser.lName = snapshop.child("lName").val();
        ProfileUser.email = snapshop.child("email").val();
        ProfileUser.phone = snapshop.child("phone").val();
        var dateBirth = new Date(snapshop.child("birthdate").val()),
          month = new Intl.DateTimeFormat("pt", { month: "2-digit" }).format(
            dateBirth
          ),
          day = "" + (dateBirth.getDate() + 1),
          year = dateBirth.getFullYear();

        ProfileUser.birthdate = [year, month, day].join("-");
        var dateCreateAt = new Date(snapshop.child("createdAt").val()),
          monthCreateAt = "" + (dateCreateAt.getMonth() + 1),
          dayCreateAt = "" + dateCreateAt.getDate(),
          yearCreateAt = dateCreateAt.getFullYear();
        ProfileUser.createdAt = [yearCreateAt, monthCreateAt, dayCreateAt].join(
          "-"
        );
        ProfileUser.tag = snapshop.child("tag").val();
      });
      this.profile.fName = ProfileUser.fName;
      this.profile.lName = ProfileUser.lName;
      this.profile.email = ProfileUser.email;
      this.profile.phone = ProfileUser.phone;
      this.profile.tag = ProfileUser.tag;
      this.profile.createdAt = ProfileUser.createdAt;
      this.profile.birthdate = ProfileUser.birthdate;
      this.profile.uID = window.uid;
      const snapshot = await this.$firebase
        .storage()
        .ref(window.uid)
        .child("AvatarProfile")
        .getDownloadURL()
        .then(function (downloadUrl) {
          return downloadUrl;
        })
        .then((data) => {
          this.profile.avatar = data;
          this.profile.file = snapshot;
        });
    },
    ShowAbout() {
      this.navigation("About");
    },
  },
};
</script>


<style lang="scss" scoped>
.btnThemeSwitch {
  margin-right: 5px;
}
</style>