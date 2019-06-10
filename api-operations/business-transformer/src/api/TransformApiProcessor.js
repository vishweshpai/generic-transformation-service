'use strict';

const GenericException = require('generic-exception').GenericException;
const RequestDto = require('../model/RequestDto');
const transformerService = require('../service/GenericTransformerService');
const BoDtoTransformer = require('../transformer/RequestResponseTransformer');

const ExceptionType = require('../model/ExceptionType');

class TransformApiProcessor {
    async process(event) {
        try {
            if (event.body) {
                event = JSON.parse(event.body)
            }
            const requestDto = new RequestDto(event.data, event.transformers, event.jobDetails, event.traceFields);
            const requestBo = await BoDtoTransformer.transformToBo(requestDto);
            const responseBo = await transformerService.process(requestBo);
            const responseDto = await BoDtoTransformer.transformToDto('success', 'Transformation Successful', responseBo.toJson());
            return responseDto.toJson();

        } catch (exception) {
            console.error(`Error occurred:  ${exception.message}`);
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
    }
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