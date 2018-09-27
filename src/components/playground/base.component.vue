<template>
  <v-slide-y-transition mode="out-in">
    <div>
      <loader :isLoading="isLoading"/>
      <div class="content">
        <codemirror class="editor"
                ref="editor"
                v-model="content"
                :options="cmOptions" />

        <v-btn
          @click="showHelp"
          color="blue-grey"
          class="white--text execute-btn mt-2">
          {{ $t('PLAYGROUND.HELP') }}
          <v-icon right dark>help</v-icon>
        </v-btn>
        <v-btn
          :disabled="isEmptyContent"
          @click="sendSnippet"
          color="blue-grey"
          class="white--text execute-btn mt-2">
          {{ $t('PLAYGROUND.RUN_SNIPPET') }}
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
      </div>
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
      isLoading: false,
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
      if (this.$refs.editor) {
        return this.$refs.editor.codemirror;
      }
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
      this.isLoading = true;
      playgroundService
        .execute(this.content)
        .then(({ data }) => {
          this.isLoading = false;
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
        .catch((err) => {
          this.isLoading = false;
          this.$swal({
            type: 'error',
            title: this.$t('GENERAL.ERROR')
          });
        });
    },
    showHelp() {
      this.$swal({
        type: 'info',
        title: this.$t('PLAYGROUND.HELP_TITLE'),
        confirmButtonText: this.$t('PLAYGROUND.HELP_CONFIRM'),
        html: this.$t('PLAYGROUND.HELP_TEXT')
      });
    }
  },
  mounted() {
    if (this.codemirror) {
      this.codemirror.setSize('100%', this.editorHeight);
    }
  }
};
</script>

<style scoped>
.editor {
  text-align: left;
}
</style>



