<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-left>

        <v-subheader>UI Settings</v-subheader>
        <v-switch
          :label="`${isDarkTheme ? 'Dark' : 'Light'} theme`"
          v-model="isDarkTheme"
          @change="toggleDark"/>
        <v-divider/>
        <v-subheader>Account Settings</v-subheader>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import authService from 'Api/auth.service';

export default {
  data() {
    return {
      isDarkTheme: this.$store.getters.activeUser.darkTheme || false
    };
  },
  methods: {
    toggleDark() {
      authService.edit({ isDarkTheme: this.isDarkTheme });
    }
  }
};
</script>

