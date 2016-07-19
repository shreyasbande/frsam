'use strict';
const PuId       = require('puid');
const puIdObject = new PuId();

function getLogID(logId) {
    if (logId == null || logId == undefined) {
        try {
            return puIdObject.generate();
        } catch (e) {
            return defaultKey;
        }
    }
    else {
        return logId;
    }
}

module.exports.getLogId = getLogID;
