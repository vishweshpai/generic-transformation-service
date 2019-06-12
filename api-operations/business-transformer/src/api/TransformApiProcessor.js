'use strict';

const GenericException = require('generic-exception').GenericException;

const RequestDto = require('../model/RequestDto');
const ExceptionType = require('../model/ExceptionType');
const transformerService = require('../service/GenericTransformerService');
const BoDtoTransformer = require('../transformer/RequestResponseTransformer');

//const logger = require('../../../../serverless/node_modules/winston-wrapper').getLogger('generic-transformer-api');

class TransformApiProcessor {
    async process(event, context) {
        try {
            if (event.body) { event = JSON.parse(event.body) }
            //logger.debug('Processing request..', JSON.stringify(event));
            const requestDto = new RequestDto(event.data, event.transformers, event.jobDetails, event.traceFields);
            const requestBo = await BoDtoTransformer.transformToBo(requestDto);
            const responseBo = await transformerService.process(requestBo);
            const responseDto = await BoDtoTransformer.transformToDto(responseBo);
            //logger.info(responseDto.status)
            return responseDto.toJson();
        } catch (exception) {
            console.log('Error', exception);
            //logger.error(`Error occurred:  ${exception.message}`);
            if (!(exception instanceof GenericException)) {
                throw new GenericException.Builder(ExceptionType.UNKNOWN_ERROR)
                    .withWrappedException(exception)
                    .withMessage(exception.message)
                    .build();
            } else {
                console.error(exception.toString())
                throw exception;
            }
        }
    };
}

// let obj = new TransformApiProcessor();
// obj.process({
//     data: {
//         currency: "AUD",
//         rate: 1122,
//         interfaceName: 'sdadasdasd',
//         filename: 'filenamess3423.csv'
//     },
//     businessRules: [
//         {
//             file: "BusinessRuleValidator.js"
//         }
//     ],
//     transformers: [
//         {
//             file: "FXRates_transformer.js"
//         }
//     ],
//     objectLocaltion: {
//         bucket: "tvx-middleware-dev",
//         domain: "Finance",
//         interfaceName: "coda",
//         jobName: ""
//     }
// })

// {
//     "data": {
//         "currency": "AUD",
//             "rate": 12,
//                 "interfaceName": "sdadasdasd",
//                     "filename": "yg1.csv"
//     },
//     "transformers": ["FXRates_transformer.js"],
//         "jobDetails": {
//         "bucket": "tvx-middleware-dev",
//             "domain": "Finance",
//                 "interfaceName": "coda",
//                     "jobName": ""
//     },
//     "traceFields": [{ "name": "totalRecords", "value": "totalRecordsValue" },
//     { "name": "recordNumber", "value": "recordNumberValue" }]   
module.exports = new TransformApiProcessor();