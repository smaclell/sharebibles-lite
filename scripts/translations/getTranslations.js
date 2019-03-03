/*
  eslint
  no-console: 0,
*/
const translate = require('@k3rn31p4nic/google-translate-api'); // @vitalets/google-translate-api
const fs = require('fs');
const path = require('path');
const en = require('../../assets/i18n/locales/en.json');

const folderPath = path.join(__dirname, '..', '..', 'assets', 'i18n', 'locales');
const files = fs.readdirSync(folderPath);
const stats = {};

function getLocale(file) {
  let locale = file.split('.')[0];
  if (locale === 'zh-hk') {
    locale = 'zh-cn'; // The other option we have available is zh-tw (Traditional chinese), idk which is more similar to chinese (Hong-Kong)
  }
  if (locale === 'pt-br') {
    locale = 'pt'; // Only straight portuguese is available (Better than nothing?)
  }

  return locale;
}

function writeUpdates(fileStats, file) {
  const filename = file.replace(/json/gi, 'changelog.txt');
  const date = new Date();

  const data = fileStats.addedKeys.reduce((acc, key) => `${acc}[ ] ${key}\n`, '');

  fs.appendFileSync(
    path.join(__dirname, 'changelogs', filename),
    `${date}\n--------------------------\n${data}\n\n`,
    'utf-8'
  );
}

async function updateTranslation(file) {
  if (!file) return;

  const locale = getLocale(file);

  const filePath = path.join(folderPath, file);
  const oldData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const newData = { ...oldData };

  const currStats = {
    failed: 0,
    failedKeys: [],
    added: 0,
    addedKeys: [],
    attempted: 0,
  };

  const results = Object.keys(en).map((key) => {
    if (!oldData[key]) {
      currStats.attempted += 1;
      return translate(en[key], { from: 'en', to: locale })
        .then((res) => {
          newData[key] = res.text;
          currStats.added += 1;
          currStats.addedKeys.push(key);
        })
        .catch(() => {
          currStats.failed += 1;
          currStats.failedKeys.push(key);
        });
    }
    return Promise.resolve();
  });

  await Promise.all(results);

  const sortedData = {};
  Object.keys(newData)
    .sort()
    .forEach((key) => {
      sortedData[key] = newData[key];
    });

  fs.writeFileSync(filePath, `${JSON.stringify(sortedData, null, 2)}\n`, 'utf8');
  stats[locale] = currStats;

  if (currStats.addedKeys.length > 0) {
    writeUpdates(currStats, file);
  }

  console.log(`${file}: ${currStats.added} | ${currStats.failed} | ${currStats.failedKeys} | ${currStats.addedKeys} |`);
  console.log('');
}

console.log('Summary');
console.log('[# of success] | [# failed] | [Failed Keys] | [Successful Keys] |');
console.log('----------');

files.forEach(async (file) => {
  if (/\.json$/.test(file) && !/en\.json/.test(file)) {
    updateTranslation(file);
  }
});
