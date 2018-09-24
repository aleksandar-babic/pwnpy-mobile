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
        <v-icon right dark>cloud_upload</v-icon>
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
        .then(({ data }) => {
          const isError = data.stderr || data.exitCode !== 0;
          this.$swal({
            type: isError ? 'error' : 'success',
            title: this.$t(`PLAYGROUND.${isError ? 'ERROR' : 'SUCCESS'}`),
            html: `<strong>${data.stdout ? data.stdout : ''} ${
              data.stderr ? data.stderr : ''
            }</strong>`,
            footer: `${this.$t('PLAYGROUND.CODE')} ${data.exitCode}.`
          });
        })
        .catch((err) =>
          this.$swal({
            type: 'error',
            title: this.$t('GENERAL.ERROR')
          })
        );
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



