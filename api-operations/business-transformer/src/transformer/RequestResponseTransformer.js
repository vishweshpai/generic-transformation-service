'use strict';

let ResponseDto = require('../model/ResponseDto');
let RequestBo = require('../model/RequestBo');
let ResponseBo = require('../model/ResponseBo');

let generictransformerValidator = require('./genericTransformerValidator');

class RequestResponseTransformer {

    static async transformToBo(requestDto) {
        return new RequestBo(requestDto.data, requestDto.transformationRules, requestDto.jobDetails, requestDto.traceFields);
    }

    static async transformToDto(responseBo) {
        return new ResponseDto(responseBo.response.status, responseBo.response.message, responseBo.response.data);
    }
}

module.exports = RequestResponseTransformer;