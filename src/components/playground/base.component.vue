<template>
  <v-slide-y-transition mode="out-in">
    <div>
      <editor block v-model="content"
        @init="editorInit"
        lang="python"
        theme="monokai"
        width="100%"
        :height="editorHeight"/>

      <v-btn
        block
        color="blue-grey"
        class="white--text execute-btn">
        {{ $t('PLAYGROUND.RUN_SNIPPET') }}
        <v-icon dark>play_circle_outline</v-icon>
      </v-btn>
    </div>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: 'PlaygroundBase',
  data() {
    return {
      content: ''
    };
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  computed: {
    editorHeight() {
      return `${window.innerHeight - 120}px`;
    }
  },
  methods: {
    editorInit() {
      require('brace/ext/language_tools');
      require('brace/mode/python');
      require('brace/theme/monokai');
      require('brace/snippets/python');
    }
  }
};
</script>

<style scoped>
.execute-btn {
  padding-left: 7px;
}
</style>



