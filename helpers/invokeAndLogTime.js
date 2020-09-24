async function invokeAndLogTime(func) {
  const isAsync = func.constructor.name === 'AsyncFunction';
  const funcName = func.name || 'anonymous function';

  if (!isAsync) {
    throw new Error(`function ${funcName} should be async function`);
  }

  console.log('Starting to call', funcName);
  console.time(funcName);
  await func();
  console.timeEnd(funcName);
}

module.exports = invokeAndLogTime;
