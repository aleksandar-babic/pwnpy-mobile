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
          :to="{name: 'quiz', params: { difficulty: level.number, title: level.title }}">
          <v-btn :color="level.color" large top> {{ level.title }}</v-btn>
        </router-link>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: 'LearnBase',
  data() {
    return {
      levels: [
        {
          title: 'Beginner',
          number: 1,
          color: 'warning'
        },
        {
          title: 'Intermediate',
          number: 2,
          color: 'info'
        },
        {
          title: 'Pro',
          number: 3,
          color: 'success'
        }
      ]
    };
  }
};
</script>
