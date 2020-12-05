<template>
    <v-dialog
      class="MessengerDialog"
      v-model="dialog"
      persistent
      max-width="40vw"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Messenger</span>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="Minimize()">
            Minimize
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-row col="4">Lista de pessoas</v-row>
              <v-row col="8">Conversa</v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "Messenger",
  props: { dialog: Boolean },
  data: () => ({
    dialog: false,
  }),
  methods: {
    Minimize() {
      console.log("Minimizou")
    },
  },
};
</script>

<style lang="scss" scoped>
.MessengerDialog {
  right: calc(.3em + 20px);
}
</style>