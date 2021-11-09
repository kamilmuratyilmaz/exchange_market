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
  },
  mutations: {
    SET_MARKET_SEARCH_RESULT(state, companyNameSymbol) {
      state.searchResults = companyNameSymbol;
    },
    SET_COMPANY_KEYWORD(state, keyword) {
      state.companyKeyword = keyword;
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
  },
  getters: {},
  modules: {},
});
