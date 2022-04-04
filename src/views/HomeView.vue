<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
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
        <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
          Home
        </h1>
        <div class="py-2">
          <router-link to="/sign-in">
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
              Sign in
            </button>
          </router-link>
          <router-link to="/sign-up">
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
              Sign up
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SecureLS from "secure-ls";

@Options({
  props: {
    $router: String,
  },
})
export default class HelloWorld extends Vue {
  $router: any;
  ls = new SecureLS({ encodingType: "aes" });

  created() {
    const session = this.ls.get("session");
    if (session) {
      this.$router.push("profile");
    }
  }
}
</script>
