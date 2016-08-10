let constants = {
  // GitHub OAuth
  CLIENT_ID: 'ID_HERE',
  CLIENT_SECRET: 'SECRET_HERE',
  SCOPE: ['user:email', 'notifications'],

  // Storage
  STORAGE_KEY: 'gitify-storage',
  GITHUB_NOTIFICATION_URL: 'https://ro67ep8ct4.execute-api.us-east-1.amazonaws.com/prod/',

  // Awesome all read messages
  ALLREAD_MESSAGES: [
    'Wow! You did it.',
    'That\'s amazing!',
    'Yes! All read.',
    'All gone! Nice work!',
    'Yay! Good news.',
  ],

  ALLREAD_EMOJIS: [
    ':wink:',
    ':tada:',
    ':tiger:',
    ':see_no_evil:',
    ':balloon:',
    ':confetti_ball:',
    ':clap:',
    ':circus_tent:',
    ':spaghetti:',
    ':ok_hand:'
  ],

  ERROR_EMOJIS: [
    ':pensive:',
    ':disappointed:',
    ':triumph:',
    ':scream:',
    ':cry:'
  ]
};

export default constants;
