const { spawnSync } = require('child_process');

const uri = "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&authSource=admin&directConnection=true";

function addEnv(env) {
    console.log(`Adding ${env}...`);
    const result = spawnSync('npx.cmd', ['vercel', 'env', 'add', 'MONGODB_URI', env], {
        input: uri,
        stdio: ['pipe', 'inherit', 'inherit'],
        shell: true
    });
    if (result.error) console.error(result.error);
}

// Remove first just in case
spawnSync('npx.cmd', ['vercel', 'env', 'rm', 'MONGODB_URI', 'production', '--yes'], { shell: true });
spawnSync('npx.cmd', ['vercel', 'env', 'rm', 'MONGODB_URI', 'preview', '--yes'], { shell: true });
spawnSync('npx.cmd', ['vercel', 'env', 'rm', 'MONGODB_URI', 'development', '--yes'], { shell: true });

addEnv('production');
addEnv('preview');
addEnv('development');

console.log("Done!");
