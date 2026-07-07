import fs from 'fs';
import { execSync } from 'child_process';

const newUri = "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-00.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&replicaSet=atlas-vmt7pn-shard-0&authSource=admin&retryWrites=true&w=majority";
fs.writeFileSync('uri_new.txt', newUri);

for (const env of ['production', 'preview', 'development']) {
  try {
    execSync(`npx vercel env rm MONGODB_URI ${env} --yes`, { stdio: 'inherit' });
  } catch (_) {}
  try {
    execSync(`npx vercel env add MONGODB_URI ${env} < uri_new.txt`, { stdio: 'inherit', shell: 'cmd.exe' });
    console.log(`✅ MONGODB_URI set for ${env}`);
  } catch (e) {
    console.error(`❌ Failed for ${env}:`, e);
  }
}
