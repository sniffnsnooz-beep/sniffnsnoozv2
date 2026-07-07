import mongoose from 'mongoose';

async function testConnection() {
  const uri = "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true";
  
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const isMaster = await db.command({ isMaster: 1 });
    console.log("Replica Set Name:", isMaster.setName);
    process.exit(0);
  } catch (err) {
    console.error("FAIL", err.message);
  }
}

testConnection();
