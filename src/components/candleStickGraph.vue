<template>
  <v-container>
    <h3>{{ sendQuery }}</h3>
    <v-btn @click="checkTimeSeriesFromQuery">Click</v-btn>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as d3 from "d3";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "CandleStickGraph",
  data() {
    return {};
  },
  computed: {
    ...mapState(["marketData"]),
    ...mapState(["timeSeries"]),
    sendQuery() {
      return this.$route.query.view;
    },
    sendId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["timeSeriesType"]),
    ...mapActions(["companySymbolFromID"]),
    ...mapActions(["getTimeSeriesData"]),
    ...mapMutations(["SET_MARKET_DATA"]),
    ...mapMutations(["SET_TIME_SERIES"]),
    // eslint-disable-next-line prettier/prettier

    checkTimeSeriesFromQuery() {
      this.companySymbolFromID(this.sendId);
      switch (this.sendQuery) {
        case "daily":
          this.timeSeriesType("TIME_SERIES_DAILY");
          break;
        case "weekly":
          this.timeSeriesType("TIME_SERIES_WEEKLY");
          break;
        case "monthly":
          this.timeSeriesType("TIME_SERIES_MONTHLY");
          break;
      }
      console.log(this.timeSeries);
      console.log(this.$store.state.companySymbol);
      this.getTimeSeriesData();
      console.log(this.marketData);
    },
  },
};
</script>

<style></style>
