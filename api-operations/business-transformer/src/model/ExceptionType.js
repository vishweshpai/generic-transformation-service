'use strict';
let ExceptionType = {
    // Example: 
    "MISSING_FILE_ROW_DATA": "missingFileRowData",
    'TRANSFORMATION_FAILED': 'transformationError',
    'MISSING_JOB_DETAILS': 'missingJobDetails',
    "MISSING_TRACE_FIELDS": "missingTraceFields",
    'UNKNOWN_ERROR': 'unknownError',
    "ERROR_WHILE_VALIDATION": 'errorWhileValidation',
    "ERROR_WHILE_READING_FILE": 'errorWhileReadingFile',
    "ERROR_WHILE_EVALUATING_FILE": 'errorWhileEvaluatingFile',
    'ERROR_GENERATING_RESPONSE': 'errroGeneratingResponse'
};

module.exports = ExceptionType;