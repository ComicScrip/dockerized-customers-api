'use strict';

let dbm;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
};

exports.up = function(db) {
  return db.createTable('test', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true }
  });
};

exports.down = function(db) {
  return db.dropTable('test');
};

exports._meta = {
  "version": 1
};