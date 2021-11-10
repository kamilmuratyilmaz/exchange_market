<template>
  <v-container> {{ sendQueryInstance }} </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as d3 from "d3";
export default {
  name: "CandleStickGraph",
  data() {
    return {};
  },
  computed: {
    sendQueryInstance() {
      return this.$route.query.view;
    },
  },
};
</script>

<style></style>
