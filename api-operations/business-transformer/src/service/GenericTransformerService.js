'use strict';

const GenericException = require('generic-exception').GenericException;
const ExceptionType = require('../model/ExceptionType');
const ExceptionCategory = require('../model/ExceptionCategory');

const ResponseBo = require('../model/ResponseBo');

const generictransformerDao = require('../dal/RequestDao');
//const transformer = require('../transformer/FXRates_transformer');

//let businessValidator = require('../transformer/BusinessRuleValidator');


class GenericTransformerService {

    /**
     * Transofrms the object passed
     * @param {Object} requestBo
     * @description It transforms the data using transformer file which is sotred in S3 bucket.
     */
    async process(requestBo) {
        try {
            let response = '';
            response = await Promise.all(requestBo.transformationRules.map(async rule => {
                let readStream = await this.readStream(requestBo.jobDetails.bucket, rule.key);
                let transformer = this.evalStream(readStream.toString());
                return await transformer.transform(requestBo.data);
            }));
            if (response && response.length > 1 && (response.length == requestBo.transformationRules.length)) {
                console.log(response)
                return new ResponseBo(response[0]);
            } else {
                return new ResponseBo(response);
            }
        } catch (exception) {
            if (!(exception instanceof GenericException)) {
                throw new GenericException.Builder(ExceptionType.ERROR_WHILE_VALIDATION)
                    .withInspectionFields(', File row must be provided')
                    .withExceptionCategory(ExceptionCategory.VALIDATION_ERROR)
                    .withWrappedException(exception)
                    .withMessage(exception.message)
                    .build()
            } else {
                console.error('########', exception);
                throw exception;
            }
        }
    }


    async readStream(bucket, key) {
        try {
            return await generictransformerDao.getStream(bucket, key);
        } catch (ex) {
            console.error(ex);
            throw new GenericException.Builder(ExceptionType.ERROR_WHILE_READINGFILE)
                .withWrappedException(ex)
                .build()
        }
    }

    evalStream(stream) {
        try {
            return eval(stream);
        } catch (ex) {
            console.error(ex);
            throw new GenericException.Builder(ExceptionType.ERROR_WHILE_EVALUATING_FILE)
                .withWrappedException(ex)
                .build()
        }
    }
}

module.exports = new GenericTransformerService();