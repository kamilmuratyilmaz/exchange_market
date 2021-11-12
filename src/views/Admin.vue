<template>
  <v-container>
    <Form :hidden="hidden" />
    <v-treeview dense hoverable :items="routeTrack">
      <template v-slot:label="{ item }">
        <span v-if="item.warning" style="color: red">
          {{ item.name }}
        </span>
        <span v-else>
          {{ item.name }}
        </span>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
import Form from "../components/admin/Form.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Admin",
  components: {
    Form,
  },
  data: () => ({
    hidden: false,
  }),
  computed: {
    ...mapState(["alertStatus"]),
    ...mapState(["routeTrack"]),
    hidden() {
      return this.hidden;
    },
  },
  methods: {
    ...mapMutations(["TRACK_ROUTE"]),
    ...mapMutations(["ALERT"]),
  },
  watch: {
    hidden() {
      if (this.alertStatus == true) this.hidden = true;
    },
  },
};
</script>

<style></style>
