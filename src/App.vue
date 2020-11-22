<template>
  <div>
    <v-app id="inspire">
      <v-app id="inspire">
        <!-- Principal container -->
        <v-main>
          <v-container fluid fill-height>
            <v-layout justify-center align-center>
              <v-card align-self-end>
                <router-view />
              </v-card>
            </v-layout>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
  }),
  mounted() {
    this.navigation("Home");
    console.log(this.$firebase);
  },
  methods: {
    navigation(where) {
      this.$router.push({ name: where });
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>