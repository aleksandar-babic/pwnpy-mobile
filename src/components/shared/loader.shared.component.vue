<template>
  <v-layout row justify-center>
    <v-dialog v-model="isLoading" persistent fullscreen content-class="loading-dialog">
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular indeterminate :size="size" :width="width" :color="color"/>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    size: {
      type: Number,
      default: 70
    },
    width: {
      type: Number,
      default: 7
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

