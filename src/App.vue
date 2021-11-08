<template>
  <v-app>
    <v-app-bar app color="warning" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-4"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-row>
          <strong>Exchange-Market </strong>
        </v-row>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Yeah </span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn fab>
        <router-link to="/admin" style="color: white">Admin</router-link>
      </v-btn>
      <v-btn fab>
        <router-link to="/" style="color: white">Home</router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
