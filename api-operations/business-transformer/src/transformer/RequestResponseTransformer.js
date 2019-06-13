'use strict';

let ResponseDto = require('../model/ResponseDto');
let RequestBo = require('../model/RequestBo');

let requestValidator = require('./RequestValidator');

class RequestResponseTransformer {

    static async transformToBo(requestDto) {
        try {
           // let requestDto = requestValidator.validate(_requestDto);
            return new RequestBo(requestDto.data, requestDto.transformationRules, requestDto.jobDetails, requestDto.traceFields);
        } catch (ex) {
            throw ex;
        }
    }

    static async transformToDto(responseBo) {
        return new ResponseDto(responseBo.response.status, responseBo.response.message, responseBo.response.data).toJson();
    }
}

module.exports = RequestResponseTransformer;