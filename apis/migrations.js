/* eslint no-await-in-loop: 0 */
import Sentry from 'sentry-expo';
import { executeTransaction } from './database';

const migrations = [
  () =>
    executeTransaction(
      'CREATE TABLE IF NOT EXISTS locations (id integer PRIMARY KEY NOT NULL, key text, coordinateKey text, createdAt text, resources text, status text, uploaded int)'
    ),
  () => executeTransaction('ALTER TABLE locations ADD COLUMN version integer NOT NULL DEFAULT 0'),
];

export default async function createDatabases() {
  const result = await executeTransaction('PRAGMA user_version');
  const version = result.rows.item(0).user_version || -1;

  for (let i = version + 1; i < migrations.length; i += 1) {
    try {
      await migrations[i]();
      await executeTransaction(`PRAGMA user_version = ${i}`);
    } catch (err) {
      Sentry.captureException(err, { extra: { migration: i } });
      throw err;
    }
  }
}
