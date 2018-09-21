<template>
  <v-slide-y-transition mode="out-in">
    <div>
      <codemirror class="editor"
                  ref="editor"
                  v-model="content"
                  :options="cmOptions" />

      <v-btn
        :disabled="isEmptyContent"
        @click="sendSnippet"
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
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/python/python.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import playgroundService from 'Api/playground.service';

export default {
  name: 'PlaygroundBase',
  data() {
    return {
      content: '',
      cmOptions: {
        autoCloseBrackets: true,
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-python',
        theme: 'base16-dark'
      }
    };
  },
  components: {
    codemirror
  },
  computed: {
    codemirror() {
      return this.$refs.editor.codemirror;
    },
    editorHeight() {
      return `${window.innerHeight - 120}px`;
    },
    isEmptyContent() {
      return this.content.length === 0;
    }
  },
  methods: {
    sendSnippet() {
      playgroundService
        .execute(this.content)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.codemirror.setSize('100%', this.editorHeight);
  }
};
</script>

<style scoped>
.execute-btn {
  padding-left: 7px;
}

.editor {
  text-align: left;
}
</style>



