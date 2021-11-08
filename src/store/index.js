import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
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
    SET_MARKET_SEARCH_RESULT(state, searchResults) {
      state.searchResults = searchResults;
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
          commit("SET_MARKET_SEARCH_RESULT", res.data["bestMatches"]);
        })
        .catch((err) => console.log(err));
    },
  },
  getters: {},
  modules: {},
});
