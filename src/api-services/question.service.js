import Axios from 'axios';

const ENDPOINTS = {
  INDEX: '/questions',
  HASH_ANSWERS: '/questions/hash-answers'
};

export default {
  getQuestions(difficulty, limit = 100) {
    return Axios.get(`${ENDPOINTS.INDEX}?difficulty=${difficulty}&limit=${limit}`);
  },
  checkAnswers(hash, answers) {
    return Axios.post(ENDPOINTS.HASH_ANSWERS, {
      hash,
      answers
    });
  }
}
