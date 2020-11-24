<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-img
          height="20vh"
          src="https://images.pexels.com/photos/4125504/pexels-photo-4125504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        >
          <v-card-title>
            <v-toolbar-title>Profile</v-toolbar-title>
            <v-spacer />
            <v-btn outlined icon @click="selfClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-badge
              color="transparent"
              overlap
              bottom
              bordered
              icon="mdi-camera"
            >
              <v-avatar size="70">
                <v-img
                  v-if="profile.avatar"
                  :src="profile.avatar"
                  @click="imgAvatar"
                />
                <v-img
                  v-else
                  @click="imgAvatar"
                  src="https://images.pexels.com/photos/4125504/pexels-photo-4125504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                ></v-img>
              </v-avatar>
            </v-badge>
            {{ profile.fName + " " + profile.lName }}
          </v-card-text>
        </v-img>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="profile.fName"
          type="text"
          prepend-icon="mdi-pen"
          label="First Name*"
          required
          :rules="[rules.required]"
          @input="onChangeName"
        ></v-text-field>
        <v-text-field
          v-model="profile.lName"
          type="text"
          prepend-icon="mdi-pen"
          label="Last Name*"
          required
          :rules="[rules.required]"
          @input="onChangeName"
        ></v-text-field>
        <v-text-field
          v-model="profile.phone"
          type="tel"
          prepend-icon="mdi-phone"
          label="Phone"
        ></v-text-field>
        <v-text-field
          v-model="profile.email"
          type="email"
          prepend-icon="mdi-email"
          disabled
          label="Email*"
          required
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :value="profile.birthdate"
              type="date"
              prepend-icon="mdi-calendar"
              label="Birthdate*"
              required
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="profile.tag"
              type="text"
              label="Tag*"
              required
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="update"
          outlined
          @click="updateAccount"
          v-bind:disabled="profile.fName == '' || profile.lName == ''"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ProfileScreen",
  data: () => ({
    profile: {
      uID: "",
      fName: "",
      lName: "",
      email: "",
      phone: "",
      birthdate: "",
      tag: "",
      avatar: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  methods: {
    selfClose() {
      this.$router.push({ path: "/Main" });
    },
    imgAvatar() {
      window.open("file:///C:/");
    },
    updateAccount() {
      console.log("Salvou");
    },
    onChangeName() {
      return (this.profile.tag = "@" + this.profile.fName + this.profile.lName);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 40vw;
  padding: 0vh;
  margin-top: -5%;
}
.v-card {
  width: 40vw;
}
.v-btn.update {
  margin-top: -5%;
  margin-left: 2%;
}
</style>