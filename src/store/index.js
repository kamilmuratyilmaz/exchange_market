import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    companyKeyword: "",
    searchResults: [],
    apiURL: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "5d3b9dd928mshd83e4ca030f3034p1e932ejsnaece4d46d226",
    },
    timeSeries: "TIME_SERIES_DAILY",
    marketData: null,
  },
  mutations: {
    SET_MARKET_SEARCH_RESULT(state, companyNameSymbol) {
      state.searchResults = companyNameSymbol;
    },
    SET_COMPANY_KEYWORD(state, keyword) {
      state.companyKeyword = keyword;
    },
    SET_MARKET_DATA(state, seriesData) {
      state.marketData = seriesData;
    },
    SET_TIME_SERIES(state, timeSeries) {
      state.timeSeries = timeSeries;
    },
  },
  actions: {
    getCompanySearchResult({ state, commit }) {
      commit("SET_MARKET_SEARCH_RESULT", []);
      return axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: {
            keywords: `${state.companyKeyword}`,
            function: "SYMBOL_SEARCH",
            datatype: "json",
          },
        })
        .then((res) => {
          let apiData = res.data["bestMatches"];
          let companyNameSymbol = [];
          apiData.forEach((apiData) => {
            let obj = new Object({
              name: apiData["2. name"],
              symbol: apiData["1. symbol"],
            });
            companyNameSymbol.push(obj);
          });
          commit("SET_MARKET_SEARCH_RESULT", companyNameSymbol.slice(0, 5));
          console.log(state.searchResults);
        })
        .catch((err) => console.log(err));
    },
    getTimeSeries({ state, commit, getters }) {
      commit("SET_DAILY", []);
      return axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: {
            function: `${state.timeSeries}`,
            symbol: state.searchResults.symbol,
            outputsize: "compact",
            datatype: "json",
          },
        })
        .then((res) => {
          let seriesData = Object.keys(res[getters.timeSeriesType]).map(
            (item) => ({
              item: res[getters.timeSeries][item],
            })
          );
          seriesData = seriesData.slice(0, 100);
          commit("SET_MARKET_DATA", seriesData);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  getters: {
    timeSeriesType(state) {
      switch (state.timeSeries) {
        case "TIME_SERIES_DAILY":
          return "Time Series (Daily)";
        case "TIME_SERIES_WEEKLY":
          return "Weekly Time Series";
        case "TIME_SERIES_MONTHLY":
          return "Monthly Time Series";
      }
    },
  },
  modules: {},
});
