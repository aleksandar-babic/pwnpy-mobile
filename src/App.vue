<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      persistent
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          @click="item.action()"
          :key="i"
          value="true"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      app
    >
      <v-toolbar-side-icon
        v-if="isLoggedIn"
        @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="$t('GENERAL.TITLE')"/>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import store from 'Store';
import authService from './api-services/auth.service';

export default {
  name: 'App',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'perm_identity',
          title: this.$t('MENU.PROFILE'),
          action: () => {}
        },
        {
          icon: 'lightbulb_outline',
          title: this.$t('MENU.LEARN'),
          action: () => {}
        },
        {
          icon: 'code',
          title: this.$t('MENU.PLAYGROUND'),
          action: () => this.$router.push('/playground')
        },
        {
          icon: 'build',
          title: this.$t('MENU.SETTINGS'),
          action: () => {}
        },
        {
          icon: 'exit_to_app',
          title: this.$t('MENU.LOGOUT'),
          action: () => {
            authService.logout();
            this.$router.push('/login');
          }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  },
  computed: {
    isLoggedIn() {
      return store.getters.isLogged;
    }
  }
};
</script>

<style lang="scss">
@import '/styles/app.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-navigation-drawer {
  width: 205px !important;
}
</style>
