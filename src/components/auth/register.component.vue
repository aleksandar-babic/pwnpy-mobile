<template>
  <v-container fluid
    :style="{ display: 'flex', alignItems: 'center' }">
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center>
        <v-form
          :style="{ width: '100%' }">
          <v-text-field
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            v-model.trim="form.email"
            data-vv-name="email"
            name="email"
            label="Email"
            type="text"
          />
          <v-text-field
            v-validate="'required|min:6|max:30'"
            :error-messages="errors.collect('password')"
            v-model="form.password"
            data-vv-name="password"
            name="password"
            label="Password"
            ref="password"
            type="password"
          />
          <v-text-field
            v-validate="'required|confirmed:password'"
            :error-messages="errors.collect('passwordConfirm')"
            v-model="form.passwordConfirm"
            data-vv-name="password"
            name="password2"
            label="Verify Password"
            type="password"
          />
          <v-btn
            color="primary"
            @click="submit">{{ $t('AUTH.REGISTER') }}
          </v-btn>
          <br />
          <br />
          {{ $t('AUTH.HAS_ACC') }} <router-link :to="{ name: 'login' }">{{ $t('AUTH.LOGIN') }}!</router-link>
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
      {{ $t(`${fatalErr && errMsg.length === 0 ? 'GENERAL.ERROR' : errMsg}`)}}
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
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        passwordConfirm: ''
      },
      isValid: false,
      failed: false,
      fatalErr: false,
      errMsg: ''
    };
  },
  methods: {
    async submit() {
      this.isValid = await this.$validator.validateAll();

      if (this.isValid) {
        authService
          .register(this.form)
          .then((data) => {
            if (!data) {
              return (this.failed = true);
            }

            this.$router.push({
              name: 'profile'
            });
          })
          .catch((err) => {
            if (!err) {
              this.fatalErr = true;
              this.failed = true;
              return;
            }

            this.failed = true;

            switch (err.response.status) {
              case 409: {
                this.errMsg = this.$t('AUTH.EXISTS');
                break;
              }
              default: {
                this.errMsg = this.$t('AUTH.REG_FAILURE');
              }
            }
          });
      }
    }
  }
};
</script>
