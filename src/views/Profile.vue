<template>
  <div class="w-full">
    <nav class="bg-white shadow-lg">
      <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold text-gray-800 md:text-3xl">
            <a href="#">App</a>
          </div>
          <div class="md:hidden">
            <button
              type="button"
              class="
                block
                text-gray-800
                hover:text-gray-700
                focus:text-gray-700 focus:outline-none
              "
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  class="hidden"
                  d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                />
                <path
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-col md:flex-row hidden md:block -mx-2">
          <a
            href="#"
            onclick="return false;"
            v-on:click="signOut"
            class="
              text-gray-800
              rounded
              hover:bg-red-600 hover:text-gray-100 hover:font-medium
              py-2
              px-2
              md:mx-2
            "
            >Sign out</a
          >
        </div>
      </div>
    </nav>
    <div class="flex bg-white" style="height: 600px">
      <div
        class="
          flex flex-1
          items-center
          text-center
          lg:text-left
          px-8
          md:px-12
          lg:w-1/2
          justify-center
        "
      >
        <form>
          <h1
            class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600"
          >
            Profile
          </h1>
          <div class="py-2 text-left">
            <label>User</label>
            <input
              type="text"
              v-model="user"
              disabled
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
            <label>Password</label>
            <input
              type="text"
              v-model="email"
              disabled
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
          <div class="py-2">
            <router-link to="/change-password">
              <button
                type="button"
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
                Change password
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SecureLS from "secure-ls";
import * as Session from "../services/Session";

@Options({
  props: {
    $router: String,
  },
})
export default class HelloWorld extends Vue {
  $router: any;
  user: string = "";
  email: string = "";
  ls = new SecureLS({ encodingType: "aes" });

  created() {
    Session.valisSession(true);
  }

  mounted() {
    const sesion = this.ls.get("session");
    if (sesion) {
      this.user = sesion.user;
      this.email = sesion.email;
    }
  }

  signOut() {
    this.ls.clear();
    this.$router.push({ name: "home" });
  }
}
</script>
