'use strict';

require('dotenv').config();

const readline = require('readline');
const fs = require('fs');
const conn = require('./lib/connectMongoose');
const Advert = require('./models/Advert');
const User = require('./models/User');
const Fav = require('./models/Fav');

conn.once('open', async () => {
  try {
    const answer = await askUser(
      'Are you sure you want to initialize the database? (yes/NO):',
    );
    if (answer.toLowerCase() !== 'yes') {
      console.log('Process aborted.');
      return process.exit(0);
    }

    await initAdverts();
    await initUsers();
    await initFavs();

    conn.close();
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
});

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
      username: 'user1',
      email: 'user1@example.com',
      passwd: await User.hashPassword('1234'),
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      passwd: await User.hashPassword('1234'),
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      passwd: await User.hashPassword('1234'),
    },
  ]);

  console.log(`Created ${result.length} users.`);
}

async function initFavs() {
  console.log('Deleting favs...');
  await Fav.deleteMany();

  console.log('Loading favs...');

  const result = await Fav.insertMany([
    {
      username: 'user1',
      advertId: '123654',
    },
    {
      username: 'user2',
      advertId: '456321',
    },
  ]);

  console.log(`Created ${result.length} favs.`);
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
