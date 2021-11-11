<template>
  <v-container>
    <Form />
    <!-- Vuetify v-treeview component for showing route changes and unauthorized navigation attempt to RouteLogs component-->
    <v-treeview dense hoverable :items="routeTrack">
      <!-- This part is used to style unauthorized navigation attempt items (They will be displayed in Red)-->
      <template v-slot:label="{ item }">
        <!-- If there is a warning property in the item(warning only exists in unauthorized navigation attempt objects) it's color is set as Red-->
        <span v-if="item.warning" style="color: red">
          {{ item.name }}
        </span>
        <!-- If there isn't a warning property in object(normal route change items) it will be displayed normally in black-->
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
  data: () => ({}),
  computed: {
    ...mapState(["alertStatus"]),
    ...mapState(["routeTrack"]),
  },
  methods: {
    ...mapMutations(["TRACK_ROUTE"]),
    ...mapMutations(["ALERT"]),
  },
};
</script>

<style></style>
