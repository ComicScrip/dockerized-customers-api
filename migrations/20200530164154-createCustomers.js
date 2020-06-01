'use strict';

let dbm; // eslint-disable-line

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
};

exports.up = function (db) {
  return db.createTable('customers', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
    name: 'string',
    email: 'string',
    active: 'boolean'
  });
};

exports.down = function (db) {
  return db.dropTable('customers');
};

exports._meta = {
  version: 1
};
