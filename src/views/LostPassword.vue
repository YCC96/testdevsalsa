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
        <form v-if="!withParams" @submit.prevent="checkForm" class="text-center">
          <h1
            class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600"
          >
            Lost password
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
              Send email
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
            <!-- <router-link to="/">
            </router-link> -->
          </div>
        </form>
        <div v-if="withParams && typeParam==='email'" class="text-center mt-12">
          <router-link
            :to="'/lost-password?code=' + code"
            class="
              font-light
              text-md text-indigo-600
              underline
              font-semibold
              hover:text-indigo-800
            "
          >
            /lost-password?code={{code}}
          </router-link>
        </div>
        <div v-if="withParams && typeParam==='code'"></div>
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
  errors: Array<string> = [];
  withParams: boolean = false;
  typeParam: string = "";
  param: any;
  code: string = "";

  created() {
    this.init();
  }

  beforeUpdate() {
    this.init();
  }

  init() {
    Session.valisSession();
    this.param = this.$router.currentRoute?.value?.query;
    this.typeParam = this.param.code ? "code" : this.param.email ? "email" : "";
    if (this.typeParam !== "") {
      this.withParams = true;
      if (this.typeParam === "email") {
        this.code = this.getUiid();
        this.ls.set("email", this.param.email);
      }
      if (this.typeParam === "code") {
        this.ls.set("code", this.param.code);
        Storage.getByEmail(this.ls.get("email")).then((response) => {
          this.ls.set("session", response);
          this.$router.push("change-password");
        });
      }
    }
  }

  checkForm() {
    this.errors = [];
    if (this.email) {
      return true;
    }
    if (!this.email) {
      this.errors.push("Email is required.");
    }
  }

  getUiid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
</script>
