'use strict';

const utils = require('../utils/Utils');
const ResponseBo = require('../model/ResponseBo');
const ExceptionType = require('../model/ExceptionType');
const generictransformerDao = require('../dal/RequestDao');

//const transformer = require('../transformer/transfomer-01');


class GenericTransformerService {

    /**
     * Transofrms the object passed
     * @param {Object} requestBo
     * @description It transforms the data using transformer file which is sotred in S3 bucket.
     */
    async process(requestBo) {
        try {
            let transformedResponse = await Promise.all(requestBo.transformationRules.map(async rule => {
                let readStream = await this.readStream(requestBo.jobDetails.bucketName, rule.key);
                let transformer = await this.evalStream(readStream.toString());
                return await transformer.transform(requestBo.data, requestBo.jobDetails, null, requestBo.traceFields);
            }));
            return await this.response(transformedResponse);

        } catch (ex) {
            console.error(ex)
            throw utils.generateException(ex, ExceptionType.ERROR_WHILE_VALIDATION);
        }
    }

    /**
     * Reads filestream from s3
     * @param {String} bucket 
     * @param {String} key 
     * @description Returns file stream
     */
    async readStream(bucket, key) {
        try {
            return await generictransformerDao.getStream(bucket, key);
        } catch (ex) {
            console.error(ex);
            throw utils.generateException(ex, ExceptionType.ERROR_WHILE_READING_FILE, key);
        }
    }

    /**
     * Returns object
     * @param {String} stream 
     */
    async evalStream(stream) {
        try {
            return eval(stream);
        } catch (ex) {
            console.error(ex);
            throw utils.generateException(ex, ExceptionType.ERROR_WHILE_EVALUATING_FILE);
        }
    }

    async response(transformedResponse) {
        if (transformedResponse) {
            try {
                return new ResponseBo(transformedResponse[0]);
            } catch (ex) {
                console.error(ex);
                throw utils.generateException(ex, ExceptionType.ERROR_GENERATING_RESPONSE);
            }
        }
    }
}

module.exports = new GenericTransformerService();