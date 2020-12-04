<template>
  <div id="aboutScreen" class="page">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <v-card class="CardRow" >
      <ToolBarPrincipal
        propButtonPrincipalLabel="Main"
        propButtonPrincipalClick="Main"
      />
      <section class="step_1" id="step_1">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(50vh - ' + $vuetify.application.top + 'px)'"
            max-height="80px"
            src="https://image.freepik.com/fotos-gratis/feliz-espantada-senhora-de-cabelo-rosa-agradavel-em-t-shirt-azul-com-a-boca-bem-aberta-em-surpresa-amplamente-sorrindo-esta-sobre-um-fundo-rosa-e-apontando-para-a-direita-no-espaco-da-copia_295783-3412.jpg"
          >
            <v-row class="step_1_title" align="end" justify="end">
              <v-col class="text-center">
                <h1 class="display-1 font-weight-thin mb-4">WORLD TATTOO</h1>
                <h4 class="subheading">
                  Approaching you and your favorite tattoo artists
                </h4>
              </v-col>
            </v-row>
          </v-img>
        </v-row>
      </section>
      <section class="step_2">
        <div>
          <v-row no-gutters align="center" justify="center">
            <v-row align="center" justify="center">
              <v-col class="text-center" cols="12">
                <h1 class="display-1 font-weight-thin mb-4">ALL ARE WELCOME</h1>
                <h4 class="subheading">
                  A safe and supportive community for all.
                </h4>
              </v-col>
            </v-row>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/world-tattoo-1.appspot.com/o/aboutScreen%2Fproduction-ID_4124029.gif?alt=media&amp;token=9d126a2a-f848-4680-8663-74f225e179cb"
              width="180"
              height="320"
            />
          </v-row>
        </div>
      </section>
      <section class="step_3">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-parallax
              src="https://image.freepik.com/fotos-gratis/secao-intermediaria-de-um-homem-em-pe-perto-da-bicicleta_23-2148176488.jpg"
            >
              <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                  <h1 class="display-1 font-weight-thin mb-4">STAND OUT</h1>
                  <h4 class="subheading">
                    Connect with people from all over the world, share, find
                    fans.
                  </h4>
                </v-col>
              </v-row>
            </v-parallax>
          </v-col>
        </v-row>
      </section>
      <section class="step_4">
        <v-row no-gutters align="center" justify="center">
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
              <h1 class="display-1 font-weight-thin mb-4">GROW</h1>
              <h4 class="subheading">
                Share and expand your brand with our community.
              </h4>
              <v-btn
                class="returnTop"
                outlined
                dark
                @click="$vuetify.goTo('#step_1')"
              >
                <v-icon>mdi-chevron-double-up</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <img
            class="step_4_img"
            src="https://image.freepik.com/fotos-gratis/tatuador-segurando-e-olhando-para-uma-maquina-de-tatuagem_181624-18025.jpg"
          />
        </v-row>
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
      </section>
    </v-card>
  </div>
</template>

<script>
import ToolBarPrincipal from "@/components/ToolBarPrincipal";
export default {
  name: "About",
  components: {
    ToolBarPrincipal,
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.page {
  width: 90vw;
}
.CardRow {
  border-color: var(--featured-dark) !important;
  padding: 1px;
}
.step_3 {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  overflow: hidden;
}
.step_4_img {
  max-width: 40%;
  max-height: 100%;
  width: auto;
  height: auto;
  overflow: hidden;
}
.step_1_title {
  margin-left: 60%;
  margin-top: 8%;
}
.v-btn.returnTop {
  margin-top: 10%;
}
</style>