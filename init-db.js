require('dotenv').config();

const readline = require('readline');
const fs = require('fs');
const conn = require('./lib/connectMongoose');
const Advert = require('./models/Advert');
const User = require('./models/User');

async function initAdverts() {
  console.log('Deleting adverts...');
  await Advert.deleteMany();

  console.log('Loading adverts...');

  const data = fs.readFileSync('advertsData.json', 'utf-8');

  const result = await Advert.insertMany(JSON.parse(data));

  console.log(`Created ${result.length} adverts.`);
}

async function initUsers() {
  console.log('Deleting users...');
  await User.deleteMany();

  console.log('Loading users...');

  const result = await User.insertMany([
    {
      username: 'spiderman',
      email: 'spiderman@gmail.com',
      passwd: await User.hashPassword('123456'),
      confirmed: true,
    },
    {
      username: 'batman',
      email: 'batman@example.com',
      passwd: await User.hashPassword('123456'),
      confirmed: true,
    },
    {
      username: 'thor',
      email: 'thor@example.com',
      passwd: await User.hashPassword('123456'),
      confirmed: true,
    },
    {
      username: process.env.MYUSERNAME || 'user4',
      email: process.env.MYEMAIL || 'user4@test.com',
      passwd: await User.hashPassword(process.env.MYPASSWORD || '123456'),
      confirmed: true,
    },
  ]);

  console.log(`Created ${result.length} users.`);
}

function askUser(questionText) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(questionText, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

conn.once('open', async () => {
  try {
    const answer = await askUser(
      'Are you sure you want to initialize the database? (yes/NO):',
    );
    if (answer.toLowerCase() !== 'yes') {
      console.log('Process aborted.');
      return process.exit(0);
    }

    await initUsers();
    //await initAdverts();

    conn.close();
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
});
