// 3000 is standard for node apps
// Once deployed, Heroku will supply this var to your app
export const PORT = parseInt(process.env.PORT) || 3000;

// Postgres DB URL
// The default value here will work if you've installed Postgres on MacOS using brew
// One the app is deployed to Heroku, this var will be supplied by the Postgres addon
// export const DATABASE_URL = 'postgresql://dmitriy_a:Derparol12@localhost/landing_first'
export const DATABASE_URL = 'postgresql://devuser:Derparol12@135.148.42.179/test_db'
// export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://yoqutnlrgqzijv:1aadb8ec312ab4ffa36932d3299dd2a9a4f30851d79c01272dd4f529006d8811@ec2-34-230-198-12.compute-1.amazonaws.com:5432/d7cg037pot5h3c'
// export const DATABASE_URL = process.env.SESSION_MAX_AGE || 'postgres://dmitriy_a:Derparol12@localhost:5432/dmitriy_a'
  // process.env.DATABASE_URL || `postgres://${process.env.USER}:${process.env.USER_PASS}@localhost/${process.env.DATEBASE_NAME}`;
  // process.env.DATABASE_URL || `postgres://${process.env.USER}:${process.env.USER_PASS}@localhost/${process.env.DATEBASE_NAME}`;

// Default to 30 days
export const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE) || 60 * 60 * 24 * 30;

// If the environment doesn't supply a value, default the secret to a secure random string
// This will cause all cookies to be invalidated with each app restart (annoying but better than having a hardcoded default)
// A secure value will be set in your Heroku deploy if you use the "Deploy to Heroku" button or follow the instructions in the README
export const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  require('crypto')
    .randomBytes(32)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]+/g, '');
