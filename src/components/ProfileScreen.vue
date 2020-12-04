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
              :class="tagExists ? '' : 'red--text'"
              :background-color="tagExists ? 'red' : ''"
              :rules="[rules.required, rules.tag]"
              :hint="tagExists ? 'Invalid tag!' : 'Valid!'"
              v-model="profile.tag"
              type="text"
              label="Tag*"
              required
              @input="checkTagExist()"
              prepend-icon="mdi-tag"
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
          v-bind:disabled="
            profile.fName == '' || profile.lName == '' || tagExists
          "
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
      file: "",
    },
    loading: false,
    SnackVisible: false,
    SnackText: "",
    tagList: [],
    tagExists: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (value) => value.length >= 8 || "Min 8 characters",
      tag: (value) => !!value || "Invalid tag!",
    },
  }),
  mounted() {
    this.loadProfile();
  },
  methods: {
    async updateAvatar() {
      await this.$firebase
        .storage()
        .ref(window.uid)
        .child("AvatarProfile")
        .put(this.profile.file);
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
          this.profile.file = event.target.files[0];
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
      if (this.profile.tag.slice(0, 1) !== "@") {
        this.profile.tag = "@" + this.profile.tag;
      }
      await ref.child("Profile").set(ProfileUser, (err) => {
        if (err) {
          console.error;
        } else {
          this.SnackText = "profile saved successfully!";
          this.SnackVisible = true;
          this.loading = false;
          this.insertTag();
          if (this.profile.file) {
            this.updateAvatar();
          }
        }
      });
    },
    async onChangeName() {
      await this.checkTagExist();
      return (this.profile.tag = "@" + this.profile.fName + this.profile.lName);
    },
    async insertTag() {
      const tagInsert = {
        tagName: this.profile.tag,
        tagIdUser: this.profile.uID,
      };
      const ref = await this.$firebase
        .database()
        .ref("tag/" + tagInsert.tagName);
      ref.set(tagInsert.tagIdUser, (err) => {
        if (err) {
          console.error;
        }
      });
    },
    async checkTagExist() {
      let tagExist = {
        key: null,
        tag: tagExist,
        tagList: this.tagList,
        exist: this.tagExists,
        ...this.profile,
      };
      const ref = this.$firebase.database().ref("tag");
      await ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          tagExist.Key = childSnapshot.key;
          tagExist.tagList.push(childSnapshot);
          tagExist.tag = childSnapshot.val();
        });
      });
      for (var i = 0; this.tagList[i]; i++) {
        if (
          this.profile.tag == this.tagList[i].key &&
          this.tagList[i].node_.value_ !== window.uid
        ) {
          this.tagList = [];
          this.tagExists = true;
          break;
        }
        this.tagExists = false;
      }
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