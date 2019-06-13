'use strict';

const GenericException = require('generic-exception').GenericException;

class Utils {
    static generateException(exception, exceptionType, substitutionArgs, exceptionCategory) {
        if (!(exception instanceof GenericException)) {
            return new GenericException.Builder(exceptionType)
                .withMessage(exception.message)
                .withWrappedException(exception)
                .withSubstitutionArgs(substitutionArgs)
                .withExceptionCategory(exceptionCategory)
                .build();
        } else {
            return exception;
        }
    }
}

module.exports = Utils;