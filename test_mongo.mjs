import mongoose from 'mongoose';

async function testConnection() {
  const uris = [
    "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-00.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true",
    "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true",
    "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true"
  ];
  
  for (const uri of uris) {
    try {
      console.log("Testing:", uri);
      await mongoose.connect(uri);
      console.log("Connected. Checking if writable...");
      
      const db = mongoose.connection.db;
      const isMaster = await db.command({ isMaster: 1 });
      console.log("isMaster result:", isMaster.ismaster);
      
      if (isMaster.ismaster) {
        console.log("SUCCESS, found primary:", uri);
        process.exit(0);
      } else {
         console.log("Connected but not primary");
      }
      await mongoose.disconnect();
    } catch (err) {
      console.error("FAIL", err.message);
    }
  }
}

testConnection();
