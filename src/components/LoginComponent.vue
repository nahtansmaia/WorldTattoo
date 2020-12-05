<template>
  <article>
    <div
      @submit.prevent="doLogin()"
      class="container"
      :class="{ 'sign-up-active': signUp }"
    >
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Welcome Back!</h2>
            <p>Please login with your personel info</p>
            <v-btn
              :disabled="loading"
              class="invert"
              id="signIn"
              @click="signUp = !signUp"
            >
              Sign In
            </v-btn>
          </div>
          <div class="overlay-right">
            <h2>Hello Friend!</h2>
            <p>Please enter your personel details</p>
            <v-btn :disabled="loading" class="invert" @click="signUp = !signUp"
              >Sign Up</v-btn
            >
          </div>
        </div>
      </div>
      <form class="sign-up" action="#">
        <h2>Create Login</h2>
        <v-text-field
          v-model="login.email"
          type="email"
          placeholder="Email"
          dense
          required
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="login.password2"
          :type="showPassword2 ? 'text' : 'password'"
          placeholder="Password"
          autocomplete="on"
          :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword2 = !showPassword2"
          dense
          required
          counter="8"
          :rules="[rules.required, rules.min]"
        />
        <v-text-field
          v-model="login.password3"
          :type="showPassword3 ? 'text' : 'password'"
          placeholder="Confirm your Password"
          autocomplete="on"
          :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword3 = !showPassword3"
          dense
          required
          counter="8"
          :rules="[rules.required, rules.min, passwordConfirmationRule]"
        />
        <v-btn
          @click="doCreate()"
          :loading="loading"
          v-bind:disabled="
            login.email == '' || login.password2 == '' || login.password3 == ''
          "
          class="btnPrincipalLogin"
          >Sign Up</v-btn
        >
      </form>
      <form class="sign-in" action="#">
        <h2>Sign In</h2>
        <v-text-field
          v-model="login.email"
          type="email"
          placeholder="Email"
          :rules="[rules.required]"
          dense
          required
        />
        <v-text-field
          v-model="login.password"
          :type="showPassword1 ? 'text' : 'password'"
          placeholder="Password"
          autocomplete="on"
          :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword1 = !showPassword1"
          dense
          required
          counter="8"
          :rules="[rules.required, rules.min]"
        />
        <a
          @click="
            showRecoveryPassWordScreenDialog = !showRecoveryPassWordScreenDialog
          "
          >Forget your password?</a
        >
        <v-btn
          @click="doLogin()"
          :loading="loading"
          class="btnPrincipalLogin"
          v-bind:disabled="login.email == '' || login.password == ''"
          >Sign In</v-btn
        >
      </form>

      <!--Recovery Password-->

      <v-dialog
        class="v-diaLog"
        width="580"
        alig
        v-model="showRecoveryPassWordScreenDialog"
      >
        <v-card class="RecoveryPassWord" outlined>
            <h1 class="text-center">Forget your password?</h1>
          <v-card-text>
            <h2 class="text-center">Please enter your email to recover password</h2>
            <v-text-field
              v-model="emailRecovery"
              type="email"
              placeholder="E-Mail"
              autocomplete="on"
              dense
              required
              :rules="[rules.required]"
            />
          </v-card-text>
          <v-btn @click="showRecoveryPassWordScreenDialog = false">
            Close
          </v-btn>
          <v-btn
            class="btnPrincipal"
            v-bind:disabled="emailRecovery == ''"
            @click="doSendRecoveryPassword()"
          >
            Submit
          </v-btn>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar v-model="SnackVisible" timeout="3000" dark>
      {{ SnackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" @click="SnackVisible = false">Close</v-btn>
      </template>
    </v-snackbar>
  </article>
</template>

<script>
export default {
  data: () => ({
    SnackVisible: false,
    SnackText: "",
    showRecoveryPassWordScreenDialog: false,
    signUp: false,
    loading: false,
    showPassword1: false,
    showPassword2: false,
    showPassword3: false,
    login: {
      email: "",
      password: "",
      password2: "",
      password3: "",
    },
    emailRecovery: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.login.password2 == this.login.password3 || "Password must match";
    },
  },
  methods: {
    navigation(where) {
      this.$router.push({ name: where });
    },
    async doLogin() {
      this.loading = true;
      try {
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(this.login.email, this.login.password);
        window.uid = res.user.uid;
        this.doCreatedProfile();
      } catch (error) {
        this.SnackText = error.message;
        this.SnackVisible = true;
        this.loading = false;
      }
    },
    async doCreate() {
      if (this.login.password2 == this.login.password3) {
        this.loading = true;
        try {
          await this.$firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.login.email,
              this.login.password3
            );
          this.SnackText = "Conta criada com sucesso!";
          this.SnackVisible = true;
          this.loading = false;
          this.signUp = false;
        } catch (error) {
          this.SnackText = error.message;
          this.SnackVisible = true;
          this.loading = false;
        }
      } else {
        this.SnackText =
          "Não foi possível criar sua conta, verifique os dados informados e tente novamente.";
        this.SnackVisible = true;
        this.loading = false;
        return;
      }
    },
    async doSendRecoveryPassword() {
      if (!this.emailRecovery == "") {
        await this.$firebase
          .auth()
          .sendPasswordResetEmail(this.emailRecovery)
          .then(function () {
            alert("Email successfully sent");
          })
          .catch(function (error) {
            alert(error.message);
            return;
          });
      } else {
        this.showRecoveryPassWordScreenDialog = true;
      }
    },
    async doCreatedProfile() {
      let firstAcess = null;
      let dateCreatedAt = new Date(),
        month = "" + (dateCreatedAt.getMonth() + 1),
        day = "" + (dateCreatedAt.getDate() + 1),
        year = dateCreatedAt.getFullYear();
      const setUser = {
        email: this.login.email,
        createdAt: [year, month, day].join("-"),
      };
      const ref = this.$firebase.database().ref(window.uid);
      await ref.once("value").then(function (snapshop) {
        const key = snapshop.exists();
        if (key) {
          firstAcess = true;
        } else {
          firstAcess = false;
        }
      });
      if (firstAcess == true) {
        this.navigation("Main");
      } else {
        ref.child("Profile").set(setUser, (err) => {
          if (err) {
            console.error;
          } else {
            this.navigation("Profile");
          }
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (window.uid) {
        vm.$router.push({ name: "Main" });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
article {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.RecoveryPassWord {
  border-color: var(--featured);
  padding: 5px;
  min-width: 40vw;
  h1 {
    color: var(--featured-dark);
    font-size: 100%;
    text-align: center;
  }
  h2 {
    color: var(--ligther);
    font-size: 90%;
  }
}
.v-text-field {
  width: 90%;
  justify-content: center;
  display: flex;
}
.container {
  position: relative;
  min-width: 60vw;
  height: 70vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, var(--darker), var(--darker-medium));

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 70vh;
    overflow: hidden;
    transition: transform 0.5s ease-in-out;
    z-index: 100;
  }
  .overlay {
    position: relative;
    left: -100%;
    height: 70vh;
    width: 60vw;
    background: linear-gradient(
      to bottom right,
      var(--featured-dark),
      var(--featured)
    );
    color: var(--light);
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }
  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 140px 80px;
    width: calc(50% -80px);
    height: calc(100% -140px);
    text-align: center;
    transform: translateX($property);
    transition: transform 0.5s ease-in-out;
  }
  .overlay-left {
    @include overlays(-40%);
  }
  .overlay-right {
    @include overlays(0%);
    right: 0;
  }
}
h2 {
  margin: 0;
}
p {
  margin: 20px 0 30xp;
}
a {
  color: var(--ligther);
  text-decoration: none;
  margin: 15px 0;
  font-size: 1rem;
}
button {
  border-radius: 8px;
  border: 1px solid var(--featured-dark);
  background-color: var(--featured-dark);
  color: var(--ligther);
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  margin-top: 5px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.1s ease-in;

  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
}
button.invert {
  background-color: transparent;
  border-color: var(--ligther);
}
form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 140px 90px;
  width: 30vw;
  height: calc(100% -180px);
  text-align: center;
  background: linear-gradient(to bottom, var(--darker-medium), var(--darker));
  transition: all 0.5s ease-in-out;
  div {
    font-size: 1rem;
  }
  input {
    background-color: var(--ligther);
    border: none;
    padding: 8px 15px;
    margin: 6px 0;
    width: calc(100% -30px);
    border-radius: 8px;
    border-bottom: 1px solid var(--ligther);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px var(--ligther),
      0 1px 0 var(--ligther);
    overflow: hidden;
    &:focus {
      outline: none;
      background-color: var(--light);
    }
  }
}

.sign-in {
  left: 0;
  z-index: 2;
  opacity: 1;
  color: var(--ligther);
}
.sign-up {
  left: 0;
  z-index: 1;
  opacity: 0;
  color: var(--ligther);
}
.sign-up-active {
  .sign-in {
    transform: translateX(100%);
    opacity: 0;
  }
  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.5s;
  }
  .overlay-container {
    transform: translateX(-100%);
  }
  .overlay {
    transform: translateX(50%);
  }
  .overlay-left {
    transform: translateX(0);
  }
  .overlay-right {
    transform: translateX(20%);
  }
}
@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 1;
  }
}
</style>