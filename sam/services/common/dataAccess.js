'use strict';
const pg             = require('pg');
const transaction    = require('pg-transaction');
const Error =  include('exception/exception.js');
pg.defaults.poolSize = 50;

/**
 * Only Select Query - without transaction. Promise Response.
 * @param query - query to be executed.
 * @param db    - database on which the query has to be fired.
 * @param base  - the main class.
 * @returns {*} - query result - Array
 */
function fetchNoTranPromise(query, db, base) {
  return new Promises((resolve, reject) => {
    pg.connect(db, (err, client, done) => {
      if (err) {

        var error = Error.dbConnectionError();
        done();
        //const error = errors.dbConnectionError(err.message);
        // console.log({
        //   base.logId,
        //   `P FNTP. Error while creating database connection ${query.key} >> ${query.value}, ${err.message}`
        // });
        return reject(error);
      }

      client.query(query.value.text, query.value.values,(err, result) => {
        done();
        if (err) {
          //const error = errors.dbConnectionError(err.message);
          // console.log({
          //   logId: base.logId,
          //   msg  : `P FNTP. Error while fetching records for ${query.key} >> ${query.value}, ${err.message}`
          // });
          var error = Error.queryError();
          return reject(error);
        }

        // log.info({
        //   logId: base.logId,
        //   msg  : `P FNTP. ${query.key} >> ${query.value}. Result -- ${JSON.stringify(result.rows)}`
        // });
        //console.log("db response: ", JSON.stringify(result.rows));
        return resolve(result.rows);
      });
    });
  });
}

/**
 * select query promise response
 * @param base  - main class
 * @param query - query to be executed
 * @returns {*} - the query response in promises.
 */
function fetchTranPromise(base, query) {
  return new Promises((resolve, reject) => {
    base.client.query(query.value.text, query.value.values, (err, result) => {
      if (err) {
        //base.done();
        //const error = errors.dbConnectionError(err.message);
        // console.log({
        //   base.logId,
        //   `P FNTP. Error while fetching records for ${query.key} >> ${query.value}, ${err.message}`
        // });
        var error = Error.queryError();

        return reject(error);
      }

      // log.info({
      //   logId: base.logId,
      //   msg  : `P FNTP. ${query.key} >> ${query.value}. Result -- ${JSON.stringify(result.rows)}`
      // });
      return resolve(result.rows);
    });
  });
}

/**
 * Creates Transaction for a database connection.
 * @param base  - The main class
 * @param db    - Database for which the connection and transaction have to be created.
 * @returns {*} - Promise Response. Transaction, and Done assigned to class props.
 */
function createTranPromise(base, db) {
  return new Promises((resolve, reject) => {
    pg.connect(db, (err, client, done) => {
      if (err) {
        done();
        //const error = errors.dbConnectionError(err.message);
        // console.log({
        //   logId: base.logId,
        //   msg  : `P CTP. Error while creating database connection ${db}, ${err.message}`
        // });

        return reject(error);
      }

      const txn = new transaction(client);
      txn.begin();

      base.txn    = txn;
      base.done   = done;
      base.client = client;
      // log.info({
      //   logId: base.logId,
      //   msg  : `P CTP. Transaction created and started successfully. ${db} >> ${txn}`
      // });
      return resolve(true);
    });
  });
}

/**
 * Executes the query mentioned. All DMLs only.
 * @param base  - the main class.
 * @param query - query to be executed.
 * @returns {*} - query result. Promise Response
 */
function executeQueryPromise(base, query) {
  return new Promises((resolve, reject) => {
    base.txn.query(query.value.text, query.value.values, (err, result) => {
      if (err) {
        base.txn.rollback();
        return reject(err);
      }

      // log.info({
      //   logId: base.logId,
      //   msg  : `P EQP. Query ${query.key} executed successfully. >> ${query.value} >> ${JSON.stringify(result)}`
      // });
      // for success code.
      return resolve(0);
      base.txn.close()
    });
  });
}

/**
 * commit the transaction.
 * @param base  - the main class
 * @returns {*} - success / error. Promise response.
 */
function commitTranPromise(base) {
  return new Promises((resolve, reject) => {
    base.txn.commit((err) => {
      base.done();
      if (err) {
        base.txn.rollback();
        //const error = errors.dbConnectionError(err.message);

        // log.error({
        //   logId: base.logId,
        //   msg  : `P CmTP. Error while creating database connection ${err.message}`
        // });

        return reject(error);
      }

      // log.info({
      //   logId: base.logId,
      //   msg  : `P CmTP. Transaction committed successfully.  >> ${base.txn}`
      // });

      return resolve(true);
    });
  });
}

/**
 * rolls back the transaction.
 * @param base  - the main class
 * @returns {*} - true;
 */
function rollBackTranPromise(base) {
  return new Promises((resolve, reject) => {
    base.txn.rollback();
    base.done();
    return resolve(true);
  });
}

/**
 * Data operations class.
 * This will handle all the operations related to the database.
 */
class Operations {
  constructor(requestId) {
    this.logId  = requestId;
    this.txn    = null;
    this.done   = null;
    this.client = null;
  }

  /**
   * select query
   * @param query     - query to be executed.
   * @param db        - database on which the query has to be fired.
   * @param callback  - callback method if needed.
   * @returns {*}     - query result.
   */
  fetch(query, db) {
    return fetchNoTranPromise(query, db, this);
  }

  /**
   * Select query - to be executed in the transaction
   * @param query     - query to be executed
   * @param callback  - callback method [optional]
   * @returns {*}     -
   */
  fetchInTransaction(query) {
    return fetchTranPromise(this, query);
  }

  /**
   * Creates the transaction.
   * @param db        - DB on which the transaction has to be created.
   * @param callback  - call back method if needed
   * @returns {*}     - success / failure for creation of transaction.
   */
  createTransaction(db) {
    return createTranPromise(this, db);
  }

  /**
   * Executes the Query.
   * @param query     - query to be executed.
   * @param callback  - callback method if needed.
   * @returns {*}     - query response.
   */
  executeQuery(query) {
    return executeQueryPromise(this, query);
  }
  /**
   * Commit the started transaction
   * @param callback  - callback if needed
   * @returns {*}     - success / failure for committing the transaction.
   */
  commitTransaction() {
    return commitTranPromise(this);
  }

  /**
   * rolls back the transaction. To be used only in case when explicit rollback is needed.
   * If error occurs in
   * @param callback
   * @returns {*}
   */
  rollBackTransaction() {
    return rollBackTranPromise(this);
  }
}

module.exports.Operations = Operations;
