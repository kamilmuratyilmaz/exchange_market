<template>
  <v-container>
    <Form />
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
  data: () => ({}),
  computed: {
    ...mapState(["alertStatus"]),
  },
  methods: {
    ...mapMutations(["TRACK_ROUTE"]),
    ...mapMutations(["ALERT"]),
  },
};
</script>

<style></style>
