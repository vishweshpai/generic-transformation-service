const GenericException = require('generic-exception').GenericException;

const ExceptionType = require('../model/ExceptionType');
const ExceptionCategory = require('../model/ExceptionCategory');

/**
 * Base Transformer Class, this will be extended in interface specific transformers and `transform` method will be overriden .
 * 
 */
class BaseTransformer {
    /**
     * Base Transformer Class
     */
    constructor() {
        this.errorMessages = [];
    }

    /**
     * Transforms the data as per mapper
     * @param {JSON} data  JSON data
    *  It transforms the data based on transformer file
     */
    transform(data, interfaceConfig, ...args) { }


    addErrorMessage(_message) {
        if (_message)
            this.errorMessages.push({ errorMessage: _message });
    }

    skipTransformation() {

    }

    failedTransformation() {

    }

    toGenericError(exception) {
        if (!(exception instanceof GenericException)) {
            throw new GenericException.Builder(ExceptionType.TRANSFORMATION_FAILED)
                .withExceptionCategory(ExceptionCategory.TRANSFORMATION_ERROR)
                .withWrappedException(exception)
                .withInspectionFields()
                .build();
        } else {
            throw exception;
        }
    }

    generateError(errorMessages) {
        throw new GenericException.Builder(ExceptionType.TRANSFORMATION_FAILED)
            .withReason(errorMessages)
            .withMessage('Transformation failed, check reason property!')
            .withExceptionCategory(ExceptionCategory.TRANSFORMATION_ERROR)
            .withInspectionFields()
            .build();
    }

}
module.exports = BaseTransformer;