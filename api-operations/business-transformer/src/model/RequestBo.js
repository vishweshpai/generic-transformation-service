'user strict';

let _data, _businessRules, _transformationRules, _jobDetails;

class RequestBo {
    constructor(data, transformationRules, jobDetails) {
        _data = data;
        _transformationRules = transformationRules;
        _jobDetails = jobDetails;
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
                //let fileName = `interfaces/transformers/${this.objectLocation.domain}/${this.objectLocation.interfaceName}/${_transformationRules[i].file}`;
                let fileName = `interfaces/transformers/${this.jobDetails.domain}/${_transformationRules[i]}`;
                transformationRules.push({ file: _transformationRules[i], key: fileName })
            };
        } else {
            console.log('No transformations rules defined')
        }
        return transformationRules;
    }

    get jobDetails() {
        return new JobDetails(_jobDetails.bucket, _jobDetails.domain, _jobDetails.interfaceName, _jobDetails.jobName);
    }

    toString() {
        return JSON.stringify({
            data: this.data,
            transformationRules: this.transformationRules,
            objectLocation: this.objectLocation
        })
    }

}

class JobDetails {
    constructor(bucketName, domain, interfaceName, jobName) {
        if (bucketName)
            this.bucket = bucketName;
        if (domain)
            this.domain = domain;
        if (interfaceName)
            this.interfaceName = interfaceName;
        if (jobName)
            this.jobName;
    }
}

module.exports = RequestBo;