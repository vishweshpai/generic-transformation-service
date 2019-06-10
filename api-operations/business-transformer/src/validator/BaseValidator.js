const GenericException = require('generic-exception').GenericException;

const ExceptionType = require('../model/ExceptionType');
const ExceptionCategory = require('../model/ExceptionCategory');

class BaseValidator {
    /**
     * Base Transformer Class
     */
    constructor() { }

    /**
     * Validates data as per Validator file
     * @param {JSON} data  JSON data
    *  It validates the data
     */
    validate(data) { }

    response(status, message, data) {
        try {
            return {
                status: status,
                message: message,
                data: data
            };
        } catch (ex) {
            console.log('Error while transformation', ex);
            return this.exceptionHandler(ExceptionType.ERROR_WHILE_VALIDATION, ExceptionCategory.VALIDATION_ERROR, ex.message);
        }
    }

    exceptionHandler(exceptionType, exceptionCategory, inspectionFields) {
        return new GenericException.Builder(exceptionType)
            .withExceptionCategory(exceptionCategory)
            .withWrappedException(ex)
            .withInspectionFields(inspectionFields)
            .build();
    }

}
module.exports = BaseValidator;