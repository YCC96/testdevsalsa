<template>
  <section class="min-h-screen flex flex-col">
    <div class="flex flex-1 items-center justify-center">
      <div
        class="
          rounded-lg
          sm:border-2
          px-4
          lg:px-24
          py-16
          lg:max-w-xl
          sm:max-w-md
          w-full
          text-center
        "
      >
        <form @submit.prevent="checkForm" class="text-center">
          <h1
            class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600"
          >
            Sign in
          </h1>
          <div class="py-2 text-left">
            <input
              type="email"
              v-model="email"
              class="
                bg-gray-200
                border-2 border-gray-100
                focus:outline-none
                bg-gray-100
                block
                w-full
                py-2
                px-4
                rounded-lg
                focus:border-gray-700
              "
              placeholder="Email"
            />
          </div>
          <div class="py-2 text-left">
            <input
              type="password"
              v-model="password"
              class="
                bg-gray-200
                border-2 border-gray-100
                focus:outline-none
                bg-gray-100
                block
                w-full
                py-2
                px-4
                rounded-lg
                focus:border-gray-700
              "
              placeholder="Password"
            />
          </div>
           <p v-if="errors.length">
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <div class="py-2">
            <button
              type="submit"
              class="
                border-2 border-gray-100
                focus:outline-none
                bg-sky-500
                text-white
                font-bold
                tracking-wider
                block
                w-full
                p-2
                rounded-lg
                focus:border-gray-700
                hover:bg-sky-500
              "
            >
              Sign In
            </button>
            <button
              type="button"
              @click="$router.go(-1)"
              class="
                border-2 border-gray-100
                focus:outline-none
                bg-gray-500
                text-white
                font-bold
                tracking-wider
                block
                w-full
                p-2
                rounded-lg
                focus:border-gray-700
                hover:bg-gray-500
              "
            >
              Back
            </button>
          </div>
        </form>
        <div class="text-center mt-12">
          <router-link
            to="/lost-password"
            class="
              font-light
              text-md text-indigo-600
              underline
              font-semibold
              hover:text-indigo-800
            "
          >
            Did you forget your password?
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as Storage from "../services/Storage";
import SecureLS from "secure-ls";
import * as Session from "../services/Session";

@Options({
  props: {
    $router: String,
  },
})
export default class HelloWorld extends Vue {
  $router: any;
  ls = new SecureLS({ encodingType: "aes" });
  email: string = "";
  password: string = "";
  errors: Array<string> = [];

  created() {
    Session.valisSession();
  }

  login() {
    Storage.login(this.email, this.password)
      .then((response: any) => {
        this.ls.set("session", response.user);
        this.$router.push("profile");
      })
      .catch(() => {
        this.errors.push("Email or password incorret.");
      });
  }

  checkForm() {
    this.errors = [];
    if (this.email && this.password) {
      this.login();
      return true;
    }
    if (!this.email) {
      this.errors.push("Email is required.");
    }
    if (!this.password) {
      this.errors.push("Password is required.");
    }
  }
}
</script>
