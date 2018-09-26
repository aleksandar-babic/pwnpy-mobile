let apiBaseUrl = '';
switch (process.env.API_ENV) {
  case 'production':
    {
      apiBaseUrl = '';
      break;
    }

  case 'lan':
    {
      apiBaseUrl = 'http://10.0.99.87:1337';
      break;
    }

  default:
    {
      apiBaseUrl = 'http://localhost:1337';
      break;
    }
}

export const API_BASE_URL = apiBaseUrl;

export const LEVEL_BOUNDARIES = [500, 2000, 5000];
