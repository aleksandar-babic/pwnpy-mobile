<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-left>
        <loader :isLoading="isLoading" />
        <v-subheader>{{ $t('SETTINGS.UI') }}</v-subheader>
        <v-switch
          :label="`${isDarkTheme ? 'Dark' : 'Light'} theme`"
          v-model="isDarkTheme"
          @change="toggleDark"/>
        <v-divider/>
        <v-subheader>{{ $t('SETTINGS.SECURITY') }}</v-subheader>
        <v-form>
          <v-text-field
            @keyup.enter.native="submit"
            v-validate="'required|min:6|max:30'"
            :error-messages="errors.collect('password')"
            v-model="form.password"
            data-vv-name="password"
            name="password"
            :label="$t('SETTINGS.PASSWORD')"
            ref="password"
            type="password"
          />
          <v-text-field
            @keyup.enter.native="submit"
            v-validate="'required|confirmed:password'"
            :error-messages="errors.collect('passwordConfirm')"
            v-model="form.passwordConfirm"
            data-vv-name="password"
            name="password2"
            :label="$t('SETTINGS.VERIFY_PASSWORD')"
            type="password"
          />
          <v-flex xs3>
            <v-btn
              small
              color="primary"
              @click="changePassword">
            {{ $t('SETTINGS.CHANGE') }}
            </v-btn>
          </v-flex>
        </v-form>
        <v-snackbar
          v-model="showSnack"
          :color="success ? 'primary' : 'red'"
          :multi-line="false"
          :timeout="6000"
          :vertical="false"
        >
          {{ $t(`SETTINGS.${success ? 'SUCCESS' : 'ERROR'}_PW`) }}
          <v-btn
            dark
            flat
            @click="showSnack = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import authService from 'Api/auth.service';

export default {
  data() {
    return {
      isDarkTheme: this.$store.getters.activeUser.darkTheme || false,
      isValid: false,
      isLoading: false,
      success: false,
      showSnack: false,
      form: {
        password: '',
        passwordConfirm: ''
      }
    };
  },
  methods: {
    toggleDark() {
      authService.edit({ isDarkTheme: this.isDarkTheme });
    },
    async changePassword() {
      this.isValid = await this.$validator.validateAll();

      if (!this.isValid) {
        return;
      }

      this.isLoading = true;
      return authService
        .changePassword(this.form)
        .then((data) => {
          this.isLoading = false;
          this.success = true;
          this.showSnack = true;
        })
        .catch((err) => {
          this.isLoading = false;
          this.success = false;
          this.showSnack = true;
        });
    }
  }
};
</script>

