const { MongoClient } = require('mongodb');

async function testWrite() {
  const uri = 'mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-00.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&replicaSet=atlas-vmt7pn-shard-0&authSource=admin&retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('sniffnsnooz');
    const col = db.collection('test_writes');
    const res = await col.insertOne({ test: true, date: new Date() });
    console.log('✅ Write success! insertedId:', res.insertedId);
    
    // Clean up
    await col.deleteOne({ _id: res.insertedId });
    console.log('✅ Cleanup success!');
    await client.close();
  } catch (err) {
    console.error('❌ Write failed:', err);
  }
}

testWrite();
