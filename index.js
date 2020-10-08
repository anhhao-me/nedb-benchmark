const fs = require('fs');
const path = require('path');

async function makeTest(db, amount) {
  const firstMem = process.memoryUsage().heapUsed / 1024 / 1024;

  // insert operator
  let ltime = Date.now();
  const insert = counter => new Promise((resolve, reject) => {
    db.insert({
      counter
    }, resolve);
  });

  for (let counter = 0; counter < amount; counter++){
    await insert(counter);
  }
  let duration = Date.now() - ltime;
  console.log(` + Insert ${amount} docs in ${duration}ms: ${Math.floor(amount/(duration/1000))} ops/s`);

  // find operator
  const find = () => new Promise((resolve, reject) => {
    db.find({ counter: Math.floor(Math.random() * amount) }, resolve);
  });
  ltime = Date.now();
  for (let counter = 0; counter < amount; counter++){
    await find();
  }
  duration = Date.now() - ltime;
  console.log(` + Find ${amount} docs in ${duration}ms: ${Math.floor(amount/(duration/1000))} ops/s`);

  const lastMem = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(` - Memory Used: ${Math.floor(lastMem - firstMem)} MB`);
}

;(async () => {
  const Datastore = require('nedb');

  console.log('In-memory test - without indexing');
  let db = new Datastore();
  await makeTest(db, 10000);

  console.log('In-memory test - with indexing');
  db = new Datastore();
  await (new Promise(resolve => db.ensureIndex({ fieldName: 'counter' }, resolve)));
  await makeTest(db, 10000);

  const root = path.resolve(__dirname, './dist');
  if (!fs.existsSync(root)){
    fs.mkdirSync(root);
  }
  const dataPath = path.resolve(root, './data.db');

  console.log('Disk test - without indexing');
  if (fs.existsSync(dataPath)){
    fs.unlinkSync(dataPath);
  }
  db = new Datastore({ filename: dataPath, autoload: true });
  await makeTest(db, 10000);

  console.log('Disk test - with indexing');
  if (fs.existsSync(dataPath)){
    fs.unlinkSync(dataPath);
  }
  db = new Datastore({ filename: dataPath, autoload: true });
  await (new Promise(resolve => db.ensureIndex({ fieldName: 'counter' }, resolve)));
  await makeTest(db, 10000);
})();