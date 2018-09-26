<template>
  <v-container
    fluid
    :style="{ height: '100%', display: 'flex', alignItems: 'center' }">
    <div :style="{ width: '100%' }">
      <img :src="`static/${userLevel <= 3 ? userLevel : '3'}.svg`" :style="{ width: '150px', marginBottom: '30px' }" />
      <h3>{{ $t('PROFILE.LEVEL', {level: userLevel}) }}</h3>
      <h4>{{ $t('PROFILE.EXP', {points: activeUser.experience - previousLevelBoundary}) }}</h4>
      <v-progress-linear :value="currentPercent" height="20" color="info"></v-progress-linear>
      <strong>{{ $t('PROFILE.PERCENT', {percent: Math.floor(currentPercent), neededPts: userLevelBoundary - activeUser.experience}) }}</strong>
      <br/>
      <br/>
      <strong>{{ $t('PROFILE.LIFETIME', {exp: activeUser.experience}) }}</strong>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { LEVEL_BOUNDARIES } from '@/constants';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['activeUser', 'userLevel', 'userLevelBoundary', 'previousLevelBoundary']),
    currentPercent() {
      return (
        (this.activeUser.experience - this.previousLevelBoundary) /
        (this.userLevelBoundary - this.previousLevelBoundary) *
        100
      );
    }
  }
};
</script>
