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
      <v-btn bottom outlined small @click="navigation('Contact')"
        >Contact</v-btn
      >
      <ButtonPrincipalToolBar
        v-bind:ClickBtnPrincipalToolBar="propButtonPrincipalClick"
        v-bind:labelButtonPrincipalToolBar="propButtonPrincipalLabel"
      ></ButtonPrincipalToolBar>
    </v-app-bar>
  </div>
</template>

<script>
import ButtonPrincipalToolBar from "@/components/ButtonPrincipalToolBar";
export default {
  name: "ToolBarPrincipal",
  components: {
    ButtonPrincipalToolBar,
  },
  props:["propButtonPrincipalLabel", "propButtonPrincipalClick"],
  data: () => ({
    routebtnprincipal: "Login",
    darkTheme: false,
    iconTheme: "mdi-weather-sunny",
    labelBtnPrincipal: "Login",
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
  },
};
</script>


<style lang="scss" scoped>
.btnThemeSwitch {
  margin-right: 5px;
}
</style>