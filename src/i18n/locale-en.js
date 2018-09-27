export const EN = {
  GENERAL: {
    TITLE: 'PwnPy!',
    WELCOME: 'Welcome to PwnPy!',
    ERROR: 'Oops.. Something terrible happened!',
    FOOTER: '2018 Aleksandar Babic - PwnPy '
  },
  AUTH: {
    REGISTER: 'Register',
    LOGIN: 'Log in',
    NO_ACC: 'Don\'t have an account?',
    HAS_ACC: 'Already have an account?',
    REG_FAILURE: 'Registration failed',
    FAILED: 'Oops.. Double check login data!',
    EXISTS: 'Account already exists!'
  },
  MENU: {
    PROFILE: 'Profile',
    LEARN: 'Learn',
    PLAYGROUND: 'Playground',
    SETTINGS: 'Settings',
    LOGOUT: 'Logout'
  },
  PLAYGROUND: {
    RUN_SNIPPET: 'Run snippet',
    ERROR: 'Oh.. Something is wrong.',
    SUCCESS: 'Looks fine to me, good job!',
    CODE: 'Ran with exit code',
    HELP: 'Show Help',
    HELP_TITLE: 'Welcome to playground mode!',
    HELP_TEXT: `This is place where you can fool around with Python.<br/>
           <br/>Try to start with simple expression like <code>print("Hi PwnPy")</code><br/>
           <br/>Once you click 'Run Snippet' button we will execute given code and return STDOUT and STDERR(if any) outputs, <br/>
           additionaly, you will see exit code of your snippet.`,
    HELP_CONFIRM: 'Alright, let me try'
  },
  QUIZ: {
    INTRO: `No matter which difficulty you choose you will always get questions in randomized order.<br><br>
    Every question has only 1 correct answer.<br><br>
    Carefully read every question, it might be tricky one.`,
    FAILED: 'Oh no, you failed.',
    GJ: 'Good job',
    AWESOME: ', you are awesome',
    FAILED_TEXT: 'Go online, read docs, stalk Stack Overflow, have fun with our playground mode and come back to quiz again when you are ready.',
    PWNED_TEXT: 'You destroyed our quiz, well played.',
    SUCCEDED_TEXT: 'You did well, we are sure that you will defeat our quiz soon.',
    ZERO_ANSWERS: 'You got 0 correct answers, but keep trying.',
    ERR_FETCH: 'Error while fetching user progress information',
    ERR_FETCH_TEXT: 'You may still continue using quiz, but minor incidents are to be expected.'
  },
  SETTINGS: {
    UI: 'UI Settings',
    SECURITY: 'Security Settings',
    CHANGE: 'Change',
    PASSWORD: 'New Password',
    VERIFY_PASSWORD: 'Verify New Password',
    SUCCESS_PW: 'Password has been changed.',
    ERROR_PW: 'Error while changing password'
  },
  PROFILE: {
    LEVEL: 'You are currently at level {level}.',
    EXP: 'Experience points earned at this level {points}.',
    PERCENT: 'You are currently at {percent}% of this level, earn {neededPts} points to level-up!',
    LIFETIME: 'Total experience earned from start: {exp}'
  }
}
