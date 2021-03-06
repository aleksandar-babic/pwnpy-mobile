<template>
  <v-container
      grid-list-md
      text-xs-center
      :style="{ height: '100%' }">
      <loader :isLoading="isLoading" />
      <div class="layout-container" :style="{ height: '100%' }">
        <h1>{{ title }} questions</h1>
        <template v-if="questions[current]">
          <h3 class="question-template" v-html="questions[current].body"></h3>

          <v-radio-group v-model="currentAnswer">
            <v-radio
              v-for="answer in questions[current].answers"
              :key="answer.id"
              :label="answer.value"
              :value="answer"
            ></v-radio>
          </v-radio-group>
          <v-btn color="primary"
                :disabled="!currentAnswer.id"
                 @click="tryNext">{{ submitText }}</v-btn>
        </template>
      </div>
  </v-container>
</template>

<script>
import store from 'Store';
import questionService from 'Api/question.service';

export default {
  name: 'QuizComponent',
  props: {
    difficulty: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: 'Beginner'
    }
  },
  data() {
    return {
      hash: '',
      current: 0,
      questions: [],
      answers: [],
      isDone: false,
      isLoading: false,
      currentAnswer: {}
    };
  },
  computed: {
    submitText() {
      return this.current === this.questions.length - 1 ? 'Finish' : 'Next';
    }
  },
  methods: {
    tryNext() {
      this.answers.push(this.currentAnswer);
      this.currentAnswer = {};

      if (this.current !== this.questions.length - 1) {
        return ++this.current;
      }

      if (this.current === this.questions.length - 1) {
        this.isDone = true;
      }

      if (this.isDone) {
        this.isDone = false;
        this.isLoading = true;
        return questionService
          .checkAnswers(this.hash, this.answers)
          .then(({ data }) => {
            const numOfCorrectAnswers = data.correctAnswers.length;
            const failed = numOfCorrectAnswers === 0;
            if (!failed) {
              store.commit('setActiveUser', data.user);
              localStorage.setItem('user', JSON.stringify(data.user));
            }
            const pwned = numOfCorrectAnswers === this.questions.length;
            const title = failed
              ? this.$t('QUIZ.FAILED')
              : `${this.$t('QUIZ.GJ')}${pwned ? this.$t('QUIZ.AWESOME') : ''}!`;
            const text = failed
              ? this.$t('QUIZ.FAILED_TEXT')
              : this.$t(`QUIZ.${pwned ? 'PWNED' : 'SUCCEDED'}_TEXT `);
            this.isLoading = false;
            this.$swal({
              type: failed ? 'error' : 'success',
              title,
              html: `<strong>${text}</strong>`,
              showCancelButton: true,
              cancelButtonText: 'Take me back',
              confirmButtonText: 'Take me to playground',
              footer: failed
                ? this.$t('QUIZ.ZERO_ANSWERS')
                : `${numOfCorrectAnswers} out of ${this.questions.length} answers ${
                    numOfCorrectAnswers > 1 ? 'were' : 'was'
                  } correct.`
            }).then((result) => this.$router.push(result.dismiss ? '/learn' : '/playground'));
          })
          .catch((err) => {
            this.isLoading = false;
            this.$swal({
              type: 'error',
              title: this.$t('GENERAL.ERROR'),
              html: err.message
            });
          });
      }
    }
  },
  created() {
    this.isLoading = true;
    questionService
      .getQuestions(this.difficulty)
      .then(({ data }) => {
        this.isLoading = false;
        this.questions = data.questions;
        this.hash = data.hash.id;
      })
      .catch((err) => {
        this.isLoading = false;
        this.$swal({
          type: 'error',
          title: this.$t('GENERAL.ERROR'),
          html: err.message
        });
      });
  }
};
</script>

<style>
.layout-container {
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.question-template {
  margin-top: 60px;
}
</style>
