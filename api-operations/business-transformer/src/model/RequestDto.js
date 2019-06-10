'use strict'

let _data, _transformationRules, _jobDetails, _traceFields;

class RequestDto {
    constructor(data, transformationRules, jobDetails, traceFields) {
        _data = data;
        _transformationRules = transformationRules;
        _jobDetails = jobDetails;
        _traceFields = traceFields;
    }

    get data() {
        return _data;
    }

    get transformationRules() {
        return _transformationRules;
    }

    get jobDetails() {
        return _jobDetails;
    }

    get traceFields() {
        return _traceFields;
    }

    toString() {
        return JSON.stringify({
            data: this.data,
            transformationRules: this.transformationRules,
            jobDetails: this.jobDetails,
            traceFields: this.data.traceFields
        })
    }
}

module.exports = RequestDto;