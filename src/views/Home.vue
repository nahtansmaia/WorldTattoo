<template>
  <div class="home">
    <ToolBarPrincipal propButtonPrincipalLabel="Login" propButtonPrincipalClick="Login" />
    <HomeComponent />
  </div>
</template>

<script>
import ToolBarPrincipal from '@/components/ToolBarPrincipal'
import HomeComponent from "@/components/HomeComponent.vue";

export default {
  name: "Home",
  components: {
    HomeComponent,
    ToolBarPrincipal
  },
  data: () => ({
    darkTheme: false,
    iconTheme: "mdi-weather-sunny",
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