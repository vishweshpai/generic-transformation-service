'user strict';

let _data, _businessRules, _transformationRules, _jobDetails, _traceFields;

class RequestBo {
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
        let transformationRules = [];
        if (_transformationRules && _transformationRules.length > 0) {
            // _transformationRules.map(rule => {
            //     return `interfaces/transformers/${this.jobDetails.domain}/${rule}`;
            // })
            for (let i = 0; i < _transformationRules.length; i++) {
                let fileName = `interfaces/transformers/${this.jobDetails.domain}/${this.jobDetails.interfaceName}/${this.jobDetails.jobName}/${_transformationRules[i]}`;
                //let fileName = `interfaces/transformers/${this.jobDetails.domain}/${_transformationRules[i]}`;
                transformationRules.push({ file: _transformationRules[i], key: fileName })
            };
        } else {
            console.log('No transformations rules defined')
        }
        return transformationRules;
    }

    get jobDetails() {
        return new JobDetails(_jobDetails.bucketName, _jobDetails.domain, _jobDetails.interfaceName, _jobDetails.jobName, _jobDetails.fileName, _jobDetails.sizeInKb, _jobDetails.region);
    }
    get traceFields() {
        return _traceFields;
    }

    toString() {
        return JSON.stringify({
            data: this.data,
            transformationRules: this.transformationRules,
            jobDetails: this.jobDetails,
            traceFields: this.traceFields
        })
    }

}

class JobDetails {
    constructor(bucketName, domain, interfaceName, jobName, fileName, sizeInKb, region) {
        // if (bucketName)
        this.bucketName = bucketName;
        //if (domain)
        this.domain = domain;
        // if (interfaceName)
        this.interfaceName = interfaceName;
        //  if (jobName)
        this.jobName = jobName;
        this.fileName = fileName;
        this.sizeInKb = sizeInKb;
        this.region = region;
    }
}

module.exports = RequestBo;