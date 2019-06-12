'use strict';

let GenericException = require('generic-exception').GenericException;

const ExceptionCategory = require('../model/ExceptionCategory');
const ExceptionType = require('../model/ExceptionType');

class RequestValidator {

    async validate(requestDto) {
        if (!requestDto.data) {
            throw this.generateValidationException(ExceptionType.MISSING_FILE_ROW_DATA);
        }
        if (!requestDto.jobDetails) {
            throw this.generateValidationException(ExceptionType.MISSING_JOB_DETAILS);
        }
        if (!requestDto.traceFields) {
            throw this.generateValidationException(ExceptionType.MISSING_TRACE_FIELDS);
        }
        return requestDto;
    }

    generateValidationException(exceptionType, inspectionFields) {
        return new GenericException.Builder(exceptionType)
            .withMessage(`Validation error : ${exceptionType}`)
            .withExceptionCategory(ExceptionCategory.VALIDATION_ERROR)
            .withInspectionFields(inspectionFields)
            .build();
    }
}

module.exports = new RequestValidator();