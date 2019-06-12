var ApiProcessor = require('../src/api/TransformApiProcessor');
const assert = require('chai').assert;

let outputdata = {
    "status": "SUCCESS",
    "message": "Transformation Success",
    "data": {
        "ifNo": null,
        "company": null,
        "txType01": null,
        "txType02": null,
        "txType03": null,
        "txType04": null,
        "txType05": null,
        "txNo01": null,
        "txNo02": null,
        "txNo03": null,
        "txNo04": null,
        "txNo05": null,
        "txYear": null,
        "txPeriod": null,
        "txCurrency03": null,
        "txCurrency04": null,
        "txCurrency05": null,
        "txDate02": null,
        "txDate03": null,
        "txDate04": null,
        "txDate05": null,
        "txLine": null,
        "txSeq": null,
        "txAcCode01": null,
        "txAcCode02": null,
        "txAcCode03": null,
        "txAcCode04": null,
        "txAcCode05": null,
        "txAcCode06": null,
        "txAcCode07": null,
        "txAcCode08": null,
        "txAcCode09": null,
        "txAcCode10": null,
        "txValue01": null,
        "txValue02": null,
        "txValue03": null,
        "txValue04": null,
        "txValue05": null,
        "txValue06": null,
        "txValue07": null,
        "txValue08": null,
        "txValue09": null,
        "txValue10": null,
        "txValue11": null,
        "txValue12": null,
        "txValue13": null,
        "txValue14": null,
        "txValue15": null,
        "txQty01": null,
        "txQty02": null,
        "txQty03": null,
        "txQty04": null,
        "txQty05": null,
        "txQty06": null,
        "txQty07": null,
        "txQty08": null,
        "txQty09": null,
        "txQty10": null,
        "txXRate02": null,
        "txXRate03": null,
        "txXRate04": null,
        "txXRate05": null,
        "txTaxCode01": null,
        "txTaxCode02": null,
        "txTaxCode03": null,
        "txTaxCode04": null,
        "txTaxCode05": null,
        "txRef01": null,
        "txRef02": null,
        "txRef03": null,
        "txRef04": null,
        "txRef05": null,
        "txRef06": null,
        "txRef07": null,
        "txRef08": null,
        "txRef09": null,
        "txRef10": null,
        "txDesc01": null,
        "txDesc02": null,
        "txDesc03": null,
        "txInfo01": null,
        "txInfo02": null,
        "txInfo03": null,
        "txInfo04": null,
        "txInfo05": null,
        "txFlag01": null,
        "txFlag02": null,
        "txFlag03": null,
        "txFlag04": null,
        "txFlag05": null,
        "txComment01": null,
        "txComment02": null,
        "txComment04": null,
        "txComment05": null,
        "txCurrency02": "AUD",
        "txXRate01": 12
    }
};

let inputData = {
    "data": {
        "currency": "AUD",
        "Rate": 12
    },
    "transformers": ["transfomer-02.js"],
    "jobDetails": {
        "bucketName": "tvx-middleware-dev",
        "domain": "finance",
        "interfaceName": "fxrates",
        "jobName": "jo_code_0000_controljobfxratesfile",
        "fileName": "filenamesamplexvcvx.csv"
    },
    "traceFields": [{ "name": "totalRecords", "value": "totalRecordsValue" },
    { "name": "recordNumber", "value": "recordNumberValue" }]
};

describe('transform ApiProcessor - Unit test', () => {
    it('should return transformed json when valid input json is passed', () => {
        ApiProcessor.process(inputData).then((result) => {
            assert.deepEqual(result, outputdata);
        }).catch(error => {
            console.log("error : ", error);
        });
    });

    it('should return error when invalid input json i.e. blank json is passed', () => {
        let jsonData = {
            "data": {
                "currency": "AUD",
                "Rate": 12
            },
            "transformers": ["transfomer-020.js"],
            "jobDetails": {
                "bucketName": "tvx-middleware-dev",
                "domain": "finance",
                "interfaceName": "fxrates",
                "jobName": "jo_code_0000_controljobfxratesfile",
                "fileName": "filenamesamplexvcvx.csv"
            },
            "traceFields": [{ "name": "totalRecords", "value": "totalRecordsValue" },
            { "name": "recordNumber", "value": "recordNumberValue" }]
        };

        let expectedData = {
            "status": "failed",
            "message": "Error while reading file from S3",
            "data": {
                "currency": "AUD",
                "Rate": 12
            }
        }
        ApiProcessor.process(jsonData, '').then((result) => {
            assert.equal(result, expectedData);
        }).catch(error => {
            console.log("error : ", error);
        })
    });

    // it('should return error when invalid bucket name is passed in input json', () => {
    //     let inputData = {
    //         "keyName": "interfaces/transformers/Finance/FXRates_transformer.js",
    //         "objectLocation": "tvx-middleware-dev-Foramtest",
    //         "data": {
    //             "Currency": "AED",
    //             "Rate": 6.0994,
    //             "filename": "codagbp290814.csv",
    //             "interfaceName": "FX_RATES"
    //         }
    //     };
    //     ApiProcessor.process(inputData,'').then((result) => {
    //         assert.notEqual(result, null, 'done2');
    //         assert.notStrictEqual(result, 'bucket does not exist');
    //     }).catch(error => {
    //         console.log("error : ", error);
    //     })
    // });

    // it('should return error when invalid key name is passed in input json', () => {
    //     let inputData = {
    //         "keyName": "interfaces/transformers/Finance/FXRates_transformer123.js",
    //         "objectLocation": "tvx-middleware-dev",
    //         "data": {
    //             "Currency": "AED",
    //             "Rate": 6.0994,
    //             "filename": "codagbp290814.csv",
    //             "interfaceName": "FX_RATES"
    //         }
    //     };
    //     ApiProcessor.process(inputData,'').then((result) => {
    //         assert.notEqual(result, null, 'done3');
    //         assert.notStrictEqual(result, 'key does not exist');
    //     }).catch(error => {
    //         console.log("error : ", error);
    //     })
    // });

});