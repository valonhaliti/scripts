const pattern = process.argv[2];
if (!pattern) {
  throw new Error(
    'Call this script with argument: node deleteAllKeysPattern "*pattern*"'
  );
}

const Redis = require('ioredis');
const invokeAndLogTime = require('../helpers/invokeAndLogTime');
const config = require('../config');
const redis = new Redis(config.redis);

async function main() {
  let cursor = '0';
  do {
    const resp = await redis.scan(cursor, 'match', pattern);

    cursor = resp[0];

    const scannedKeys = resp[1];
    if (scannedKeys.length > 0) {
      await redis.del(...scannedKeys);
    }
  } while (cursor !== '0');
}

invokeAndLogTime(main);
