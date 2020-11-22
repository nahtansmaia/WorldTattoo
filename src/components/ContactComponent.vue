<template>
  <div class="Contact">
    <form method="POST" class="contact-form" @submit.prevent="SendEmailss">
      <v-card outlined>
        <v-card-title class="justify-center">
          <h1>Contact</h1>
        </v-card-title>
        <v-text-field
          type="text"
          v-model="SendEmail.subject"
          :counter="50"
          :rules="[rules.required, rules.maxLength]"
          label="Subject"
          required
        ></v-text-field>
        <v-text-field
          type="email"
          v-model="SendEmail.email"
          :rules="[rules.required]"
          label="Email"
          name="user_email"
          required
        ></v-text-field>
        <v-textarea
          type="text"
          required
          :counter="200"
          :rules="[rules.required, rules.maxLenghtBody]"
          v-model="SendEmail.body"
          label="Body"
          name="message"
        >
        </v-textarea>
        <v-btn outlined class="btnPrincipal" type="submit"> Send </v-btn>
      </v-card>
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "Contact",
  data: () => ({
    SendEmail: {
      subject: "",
      body: "",
      email: "",
    },
    rules: {
      required: (value) => !!value || "Required",
      maxLenght: (v) => (v && v.length <= 50) || "Max 50 characters",
      maxLenghtBody: (v) => (v && v.length <= 200) || "Max 200 characters",
    },
  }),
  methods: {
    SendEmailss(e) {
      emailjs
        .sendForm(
          process.env.VUE_APP_EMAIL_ID,
          process.env.VUE_APP_EMAIL_TEMPLATE_ID,
          e.target,
          process.env.VUE_APP_YOUR_USER_ID
        )
        .then(
          ((result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          })
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.Contact {
  height: calc(100vh - " + $vuetify.application.top + " px);
  width: 60vw;
  border-color: var(--featured);
}
h1 {
  font-size: 100%;
  color: var(--featured);
}
.cardContact {
  border-color: var(--featured);
  padding: 1%;
}
.v-card {
  border-color: var(--featured);
  padding: 1%;
}
</style>