<template>
  <div class="page">
    <title>Vuetify Parallax Starter</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          max-height="80px"
          src="https://images.pexels.com/photos/4123707/pexels-photo-4123707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        >
          <v-card class="Cardbanner" outlined>
            <v-card-title primary-title>
              <h1 class="headertekst">World Tattoo</h1>
              <h4 class="headertekst" v-text="DescriptionSite"></h4>
            </v-card-title>
            <v-card-text>
              <h5 class="headertekst" v-text="DescriptionRegister"></h5>
              <v-btn
                class="align-center"
                outlined
                dark
                @click="$vuetify.goTo('#features')"
              >
                Features
              </v-btn>
              <v-btn
                class="align-center"
                outlined
                dark
                @click="navigation('Login')"
                absolute
                right
              >
                Register Now
              </v-btn>
            </v-card-text>
          </v-card>
        </v-img>
      </v-row>
    </section>
    <section>
      <v-row
        class="CardRow"
        id="features"
        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
      >
        <v-card class="CardCol" flat>
          <!-- card Global -->
          <v-icon>mdi-earth</v-icon>
          <v-card-title>
            <h4 class="headertekst">Global</h4>
          </v-card-title>
          <v-card-text v-text="DescriptionGlobal"></v-card-text>
        </v-card>
        <!-- card Faster -->
        <v-card class="CardCol" flat>
          <v-icon>mdi-clock-fast</v-icon>
          <v-card-title>
            <h4 class="headertekst">Faster</h4>
          </v-card-title>
          <v-card-text v-text="DescriptionFaster"></v-card-text>
        </v-card>
        <!-- card Money -->
        <v-card class="CardCol" flat>
          <v-icon>mdi-currency-usd</v-icon>
          <v-card-title>
            <h4 class="headertekst">All prices</h4>
          </v-card-title>
          <v-card-text v-text="DescriptionMoney"></v-card-text>
        </v-card>
        <!-- card Jobs -->
        <v-card class="CardCol" flat>
          <v-icon>mdi-briefcase-variant</v-icon>
          <v-card-title>
            <h4 class="headertekst">Jobs</h4>
          </v-card-title>
          <v-card-text v-text="DescriptionJobs"></v-card-text>
        </v-card>
      </v-row>
      <v-row>
        <v-card-title
          class="justify-center font-weight-black text-uppercase"
          text="Global"
        ></v-card-title>
        <v-card-text class="subtitle-1" text="texto"> </v-card-text>
      </v-row>
    </section>
    <section class="stats">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        src="https://images.pexels.com/photos/4125504/pexels-photo-4125504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      >
        <v-card class="transparent" shaped>
          <v-card-title primary-title>
            <h1 class="headertekst">World Tattoo</h1>
            <h4 class="headertekst" v-text="DescriptionSite"></h4>
          </v-card-title>
          <v-card-text>
            <v-btn
              class="align-center"
              outlined
              dark
              @click="$vuetify.goTo('#hero')"
            >
              <v-icon>mdi-chevron-double-up</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
        <v-footer class="transparent absolute bottom">
          <div class="grey--text text--lighten-1 text-center">
            &copy; {{ new Date().getFullYear() }} — Made with by Nathan Maia
          </div>
          <v-spacer></v-spacer>
          <v-btn text class="btnLink" rounded key="btnGithub">
            <a class="link" target="#" href="https://github.com/nahtansmaia/">
              <v-icon class="btnLink">mdi-github</v-icon>
            </a>
          </v-btn>
          <v-btn text rounded class="btnLink">
            <a target="#" href="https://twitter.com/nahtanmaia/">
              <v-icon>mdi-twitter</v-icon>
            </a>
          </v-btn>
        </v-footer>
      </v-parallax>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  data: () => ({
    DescriptionSite: "Easier to find your ideal tattoo artist!",
    DescriptionRegister: "Don't have an account?",
    DescriptionGlobal:
      "Find the best tattoo artist for you anywhere in the world.",
    DescriptionFaster: "Quick contact and scheduling with the chosen studio.",
    DescriptionMoney: "Find services with values ​​to your liking",
    DescriptionJobs: "Find jobs in studios.",
  }),
  methods: {
    navigation(where) {
      this.$router.push({ name: where });
    },/*
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (window.uid) {
          vm.$router.push({ name: "Main" });
        } else {
          next();
        }
      });
    },*/
  },
};
</script>

<style lang="scss" scoped>
h1.headertekst {
  text-align: center;
  width: 100%;
  color: var(--ligther);
}

h4.headertekst {
  text-align: center;
  width: 100%;
  color: var(--featured-dark);
}

h5.headertekst {
  text-align: right;
  color: var(--ligther);
}

.CardRow {
  align-items: center;
  justify-content: center;
}

.CardCol {
  margin-top: 2%;
  width: 20%;
  height: 200px;
  text-align: center;
  justify-content: center;
}

.Cardbanner {
  padding-top: 5%;
  text-align: center;
  width: 40%;
  margin-left: 59%;
  margin-top: 10%;
  min-height: 300px;
  border-color: var(--featured-dark);
  background-color: transparent;
}
</style>
