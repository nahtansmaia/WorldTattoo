<template>
  <v-btn outlined class="btnPrincipal" @click="navigation(ClickBtnPrincipalToolBar)"
    >{{ labelButtonPrincipalToolBar }}
  </v-btn>
</template>

<script>
export default {
  name: "ButtonPrincipalToolBar",
  props: ["ClickBtnPrincipalToolBar", "labelButtonPrincipalToolBar"],
  methods: {
    navigation(where) {
      this.$router.push({ name: where });
    },
  },
};
</script>
