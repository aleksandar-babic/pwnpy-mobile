<template>
  <v-container fluid
    :style="{ display: 'flex', alignItems: 'center' }">
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center>
        <loader :isLoading="isLoading" />
        <img
          src="@/assets/logo.png"
          alt="PwnPy">
        <v-form
          :style="{ width: '100%' }">
          <v-text-field
            @keyup.enter.native="submit"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            v-model.trim="form.email"
            data-vv-name="email"
            name="email"
            label="Email"
            type="text"
          />
          <v-text-field
            @keyup.enter.native="submit"
            v-validate="'required|min:6|max:30'"
            :error-messages="errors.collect('password')"
            v-model="form.password"
            data-vv-name="password"
            name="password"
            label="Password"
            type="password"
          />
          <v-btn
            color="primary"
            @click="submit">{{ $t('AUTH.LOGIN') }}
          </v-btn>
          <br />
          <br />
          {{ $t('AUTH.NO_ACC') }} <router-link :to="{ name: 'register' }">{{ $t('AUTH.REGISTER') }}!</router-link>
        </v-form>
      </v-layout>
    </v-slide-y-transition>

    <v-snackbar
      v-model="failed"
      color="red"
      :multi-line="false"
      :timeout="6000"
      :vertical="false"
    >
      {{ $t(`${fatalErr ? 'GENERAL.ERROR' : 'AUTH.FAILED'}`)}}
      <v-btn
        dark
        flat
        @click="failed = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import authService from 'Api/auth.service';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      isValid: false,
      isLoading: false,
      failed: false,
      fatalErr: false
    };
  },
  methods: {
    async submit() {
      this.isValid = await this.$validator.validateAll();

      if (!this.isValid) {
        return;
      }
      this.isLoading = true;
      return authService
        .login(this.form)
        .then((data) => {
          this.isLoading = false;
          if (!data) {
            return (this.failed = true);
          }

          this.$router.push({
            name: 'profile'
          });
        })
        .catch((err) => {
          this.isLoading = false;
          if (!err) {
            this.fatalErr = true;
          }

          this.failed = true;
        });
    }
  }
};
</script>
