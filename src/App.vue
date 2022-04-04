<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import * as Storage from "./services/Storage";

export default class HelloWorld extends Vue {
  db: any = null;
  list: any = [];
  person: any = null;

  mounted() {
    Storage.initDB();
  }
}
</script>
