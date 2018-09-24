<template>
  <v-app :dark="activeUser && activeUser.theme && activeUser.theme === 'dark'">
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
        <template v-for="(item, i) in items">
          <v-list-tile
            large
            :to="item.action"
            :key="i"
            active-class="active"
          >
            <v-list-tile-action>
              <v-icon class="material-icons.md-24" v-html="item.icon"/>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"/>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider
            class="my-2"
            :key="i+10"
          ></v-divider>
        </template>
        <v-list-tile
            error
            v-if="activeUser"
            @click="logout()"
            active-class="active"
            key="15"
            value="true"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="$t('MENU.LOGOUT')"/>
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
      <v-toolbar-title v-text="currentTitle"/>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import { capitalize } from 'lodash';
import store from 'Store';
import { mapGetters } from 'vuex';
import authService from './api-services/auth.service';

export default {
  name: 'App',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      currentTitle: this.$t('GENERAL.TITLE'),
      active: false,
      items: [
        {
          icon: 'account_box',
          title: this.$t('MENU.PROFILE'),
          action: '/profile'
        },
        {
          icon: 'library_books',
          title: this.$t('MENU.LEARN'),
          action: '/learn'
        },
        {
          icon: 'code',
          title: this.$t('MENU.PLAYGROUND'),
          action: '/playground'
        },
        {
          icon: 'build',
          title: this.$t('MENU.SETTINGS'),
          action: '/settings'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  },
  computed: {
    ...mapGetters(['activeUser']),
    isLoggedIn() {
      return store.getters.isLogged;
    }
  },
  methods: {
    logout() {
      authService.logout();
      return this.$router.push('/login');
    }
  },
  watch: {
    $route(to, from) {
      if (to.name !== 'login' && to.name !== 'register') {
        return (this.currentTitle = capitalize(to.name));
      }

      this.currentTitle = this.$t(`GENERAL.${to.name === 'register' ? 'WELCOME' : 'TITLE'}`);
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

a,
u {
  text-decoration: none;
}

.v-navigation-drawer {
  width: 205px !important;
}
</style>
