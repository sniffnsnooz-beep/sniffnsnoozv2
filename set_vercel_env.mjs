import fs from 'fs';
import { execSync } from 'child_process';

const gmailPass = "hacvfrfnzjshkhln";
fs.writeFileSync('gmail_pass.txt', gmailPass);

// Add for all environments (rm first to avoid conflicts)
for (const env of ['production', 'preview', 'development']) {
  try {
    execSync(`npx vercel env rm GMAIL_APP_PASS ${env} --yes`, { stdio: 'inherit' });
  } catch (_) {}
  try {
    execSync(`npx vercel env add GMAIL_APP_PASS ${env} < gmail_pass.txt`, { stdio: 'inherit', shell: 'cmd.exe' });
    console.log(`✅ GMAIL_APP_PASS set for ${env}`);
  } catch (e) {
    console.error(`❌ Failed for ${env}:`, e);
  }
}

// Also ensure OWNER_EMAIL is set for all environments
const ownerEmail = "sniffnsnooz@gmail.com";
fs.writeFileSync('owner_email.txt', ownerEmail);

for (const env of ['production', 'preview', 'development']) {
  try {
    execSync(`npx vercel env rm OWNER_EMAIL ${env} --yes`, { stdio: 'inherit' });
  } catch (_) {}
  try {
    execSync(`npx vercel env add OWNER_EMAIL ${env} < owner_email.txt`, { stdio: 'inherit', shell: 'cmd.exe' });
    console.log(`✅ OWNER_EMAIL set for ${env}`);
  } catch (e) {
    console.error(`❌ Failed for ${env}:`, e);
  }
}

// Also ensure MONGODB_URI for preview/development  
const mongoUri = "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true";
fs.writeFileSync('uri.txt', mongoUri);

for (const env of ['preview', 'development']) {
  try {
    execSync(`npx vercel env rm MONGODB_URI ${env} --yes`, { stdio: 'inherit' });
  } catch (_) {}
  try {
    execSync(`npx vercel env add MONGODB_URI ${env} < uri.txt`, { stdio: 'inherit', shell: 'cmd.exe' });
    console.log(`✅ MONGODB_URI set for ${env}`);
  } catch (e) {
    console.error(`❌ Failed for ${env}:`, e);
  }
}

console.log('\n✅ All env vars updated!');
