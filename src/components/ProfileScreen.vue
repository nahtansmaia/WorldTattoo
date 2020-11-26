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
                  @click="imgAvatar()"
                  id="avatarLogo1"
                />
                <v-img
                  v-else
                  @click="imgAvatar()"
                  id="avatarLogo"
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
              v-model="profile.birthdate"
              class="calendar"
              type="date"
              format="yyyy-mm-dd"
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
          :loading="loading"
          v-bind:disabled="profile.fName == '' || profile.lName == ''"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="SnackVisible" timeout="3000" dark>
      {{ SnackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" @click="SnackVisible = false">Close</v-btn>
      </template>
    </v-snackbar>
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
      createdAt: "",
    },
    loading: false,
    SnackVisible: false,
    SnackText: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  mounted() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      const ProfileUser = {
        fName: null,
        lName: null,
        email: null,
        phone: null,
        birthdate: null,
        tag: null,
        createdAt: null,
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
    },
    selfClose() {
      this.$router.push({ path: "/Main" });
    },
    imgAvatar() {
      var fileSelector = document.createElement("input");
      fileSelector.type = "file";
      fileSelector.accept = "image/png, image/jpeg";
      fileSelector.style.visibility = "hidden";
      fileSelector.click();
      fileSelector.addEventListener("change", (event) => {
        if (
          event.target.files[0] &&
          event.target.files[0].type.includes("image")
        ) {
          this.profile.avatar = URL.createObjectURL(event.target.files[0]);
        } else {
          alert("Please select a valid image!");
        }
      });
    },
    async updateAccount() {
      this.loading = true;
      var dateBirth = new Date(this.profile.birthdate),
        month = new Intl.DateTimeFormat("pt", { month: "2-digit" }).format(
          dateBirth
        ),
        day = "" + (dateBirth.getDate() + 1),
        year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
          dateBirth
        );
      const ProfileUser = {
        fName: this.profile.fName,
        lName: this.profile.lName,
        email: this.profile.email,
        phone: this.profile.phone,
        birthdate: [year, month, day].join("-"),
        tag: this.profile.tag,
        createdAt: this.profile.createdAt,
      };
      const ref = this.$firebase.database().ref(window.uid);
      await ref.child("Profile").set(ProfileUser, (err) => {
        if (err) {
          console.error;
        } else {
          this.SnackText = "profile saved successfully!";
          this.SnackVisible = true;
          this.loading = false;
          //this.$router.push({ name: "Main" });
        }
      });
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