<template>
 <v-container fluid
    :style="{ display: 'flex', alignItems: 'center' }">
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center>
        <h1>Choose quiz difficulty</h1>
        <br>
        <blockquote><strong v-html="$t('QUIZ.INTRO')"></strong></blockquote>
        <router-link
          v-for="(level, index) in levels"
          :key=index
          :event="level.completedQuestions === level.totalQuestions && level.totalQuestions !== 0 ? '' : 'click'"
          :to="{name: 'quiz', params: { difficulty: level.number, title: level.title }}">
          <v-btn :color="level.color" large top
                 :disabled="level.completedQuestions === level.totalQuestions && level.totalQuestions !== 0">
            {{ level.title }}
          </v-btn>
          <p class="mt-3" :style="{color: activeUser.darkTheme ? 'white': '#2c3e50'}">{{ level.completedQuestions }}/{{ level.totalQuestions }} questions completed</p>
        </router-link>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import authService from 'Api/auth.service';

export default {
  name: 'LearnBase',
  data() {
    return {
      levels: [
        {
          title: 'Beginner',
          number: 1,
          color: 'warning',
          totalQuestions: 0,
          completedQuestions: 0
        },
        {
          title: 'Intermediate',
          number: 2,
          color: 'info',
          totalQuestions: 0,
          completedQuestions: 0
        },
        {
          title: 'Pro',
          number: 3,
          color: 'success',
          totalQuestions: 0,
          completedQuestions: 0
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['activeUser'])
  },
  created() {
    authService
      .me()
      .then(({ data }) => {
        for (let prop in data.totalQuestions) {
          this.levels[prop - 1].totalQuestions = data.totalQuestions[prop];
        }

        data.completedQuestions.forEach((q) => {
          this.levels[q.difficulty - 1].completedQuestions += 1;
        });
      })
      .catch((err) =>
        this.$swal({
          type: 'error',
          title: this.$t('QUIZ.ERR_FETCH'),
          text: this.$t('QUIZ.ERR_FETCH_TEXT')
        })
      );
  }
};
</script>
