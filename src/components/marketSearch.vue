<template>
  <v-container>
    <v-col class="text-center">
      <v-autocomplete
        :search-input.sync="searchInput"
        :items="searchResults"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Search for a company..."
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>Company</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, searchResults, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left> mdi-bitcoin </v-icon>
            <span v-text="searchResults.name"></span>
          </v-chip>
        </template>
        <template v-slot:searchResults="{ searchResults }">
          <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
          >
            {{ searchResults.name.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="searchResults.name"></v-list-item-title>
            <!-- eslint-disable-next-line prettier/prettier -->
            <v-list-item-subtitle v-text="searchResults.symbol"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <v-btn class="text-right" @click="selectCompany">
        <v-icon left> mdi-update </v-icon>
        Search Now
      </v-btn>
    </v-col>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "marketSearch",
  data: () => ({
    searchInput: null,
  }),

  computed: {
    ...mapState(["searchResults"]),
    ...mapState(["companyKeyword"]),
  },
  methods: {
    ...mapActions(["getCompanySearchResult"]),
    ...mapMutations(["SET_COMPANY_KEYWORD"]),

    selectCompany() {
      console.log(this.searchResults);
    },
  },
  watch: {
    searchInput() {
      if (this.searchInput !== "" && this.searchInput.length >= 3) {
        this.$store.commit("SET_COMPANY_KEYWORD", this.searchInput);
        this.$store.dispatch("getCompanySearchResult");
      }
    },
  },
};
</script>
