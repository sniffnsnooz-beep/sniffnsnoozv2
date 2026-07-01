const mongoose = require('mongoose');

const hosts = [
  'ac-j5lfmqj-shard-00-00.fgjcqov.mongodb.net',
  'ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net',
  'ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net'
];

async function checkPrimary() {
  for (const host of hosts) {
    const uri = `mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@${host}:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true`;
    console.log(`Testing ${host}...`);
    try {
      const conn = await mongoose.createConnection(uri, { serverSelectionTimeoutMS: 3000 }).asPromise();
      const db = conn.db;
      const isMaster = await db.command({ isMaster: 1 });
      if (isMaster.ismaster) {
        console.log(`=> PRIMARY FOUND: ${host}`);
      } else {
        console.log(`   (Secondary)`);
      }
      await conn.close();
    } catch (e) {
      console.log(`   Error connecting: ${e.message}`);
    }
  }
  process.exit(0);
}

checkPrimary();
