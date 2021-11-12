<template>
  <v-form ref="form" v-model="isAdmin" lazy-validation>
    <v-text-field
      v-model="admin"
      :counter="10"
      :rules="adminRules"
      label="Admin User"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>
    <v-btn color="success" class="mr-4" @click="validate"> Sign In </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    isAdmin: false,
    admin: "admin",
    adminRules: [(v) => !!v || "Admin User is required"],
    password: "123456",
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
    validate() {
      if (this.admin == "admin" && this.password == "123456") {
        this.$store.state.alertStatus = true;
        this.isAdmin = true;
      } else this.$store.state.isAdmin = false;
      console.log(this.isAdmin);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
