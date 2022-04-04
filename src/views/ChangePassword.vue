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
            Change password
          </h1>
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
              Change
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
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SecureLS from "secure-ls";
import * as Storage from "../services/Storage";

@Options({
  props: {
    $router: String,
  },
})
export default class HelloWorld extends Vue {
  $router: any;
  ls = new SecureLS({ encodingType: "aes" });
  user: string = "";
  password: string = "";
  errors: Array<string> = [];

  changePassword() {
    const session = this.ls.get("session");
    session.password = this.password;
    Storage.updateItem(session)
      .then(() => {
        this.errors.push("Password change successfully");
        this.ls.set("session", session);
        setTimeout(() => {
          this.$router.push("profile");
        }, 3000);
      })
      .catch(() => {
        this.errors.push("Email or password incorret.");
      });
  }

  checkForm() {
    this.errors = [];
    if (this.password) {
      this.changePassword();
      return true;
    }
    if (!this.password) {
      this.errors.push("Password is required.");
    }
  }
}
</script>
