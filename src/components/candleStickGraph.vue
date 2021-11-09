<template>
  <v-container> {{ chartType }} </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as d3 from "d3";
export default {
  name: "CandleStickGraph",
  data: () => ({
    chartType: null,
  }),
  watch: {
    chartType() {
      console.log(this.$route.query.view);
      this.chartType = this.$route.query;
    },
  },
};
</script>

<style></style>
