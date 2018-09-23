import Axios from 'axios';

const ENDPOINTS = {
  EXECUTE: '/playground/execute'
};

const headers = {
  'Content-Type': 'multipart/form-data'
};

export default {
  execute(source) {
    const blob = new Blob([source], {
      type: 'text/plain'
    });

    const data = new FormData();
    data.set('source', blob)

    return Axios({
      url: ENDPOINTS.EXECUTE,
      method: 'POST',
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}
