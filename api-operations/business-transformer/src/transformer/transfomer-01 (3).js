'use strict';
var objectMapper = require('object-mapper');
const BaseTransformer = require('../transformer/BaseTransformer');

const Messages = {
    'INVALID_CURRENCY': "Invalid data being mapped to txCurrency",
    'INVALID_INTERFACENAME': "Invalid interfacename",
    'INVALID_DATA': "Invalid data being mapped",
    'INVALID_FILENAME': "Invalid filename"
}

class Transform extends BaseTransformer {

    transform(dataRow, jobDetails, interfaceConfig, traceFields) {
        console.log("TCL: Transform -> transform -> dataRow", dataRow)

        try {
            let map = {
                "ifName": {
                    key: "ifName",
                    transform: () => {
                        return jobDetails.interfaceName;
                    }
                },
                "ifNo": "ifNo?",
                "company": {
                    key: "company",
                    transform: () => {
                        return '5000';
                    }
                },
                "docType": {
                    key: "txType01",
                    transform: (value) => {
                        return value;
                    }
                },
                "txType02": "txType02?",
                "txType03": "txType03?",
                "txType04": "txType04?",
                "txType05": "txType05?",
                "txNo01": "txNo01?",
                "txNo02": "txNo02?",
                "txNo03": "txNo03?",
                "docNo": {
                    key: "txNo04",
                    transform: (value) => {
                        return value;
                    }
                },
                "12": "txNo05?",
                "Year": {
                    key: "txYear",
                    transform: (value) => {
                        return value;
                    }
                },
                "Period": {
                    key: "txPeriod",
                    transform: (value) => {
                        return value;
                    }
                },
                "docCurr": [{
                    key: "txCurrency01",
                    transform: (value) => {
                        return value;
                    }
                }, {
                    key: "txAcCode04",
                    transform: (value) => {
                        return value;
                    }
                }
                ],
                "97": "txCurrency02?",
                "15": "txCurrency03?",
                "16": "txCurrency04?",
                "17": "txCurrency05?",
                "docDate": {
                    key: "txDate01",
                    transform: (value) => {
                        return value;
                    }
                },
                "18": "txDate02?",
                "19": "txDate03?",
                "20": "txDate04?",
                "21": "txDate05?",
                "22": {
                    key: "txLine",
                    transform: () => {
                        try {
                            //Numeric.sequence("s1",1,1)
                            let a = traceFields.filter(row => row.name == 'recordNumber')
                            return a[0].value;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txLine, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "23": "txSeq?",
                "Nominal": {
                    key: "txAcCode01",
                    transform: (value) => {
                        return value;
                    }
                },
                "firstAccount": {
                    key: "txAcCode02",
                    transform: (value) => {
                        return value;
                    }
                },
                "secondAccount": {
                    key: "txAcCode03",
                    transform: (value) => {
                        return value;
                    }
                },
                "28": "txAcCode05?",
                "29": "txAcCode06?",
                "30": "txAcCode07?",
                "31": "txAcCode08?",
                "32": "txAcCode09?",
                "33": "txAcCode10?",
                "docValue": {
                    key: "txValue01",
                    transform: (value) => {
                        return value;
                    }
                },
                "nominalValue": {
                    key: "txValue02",
                    transform: (value) => {
                        return value;
                    }
                },
                "accountValue": {
                    key: "txValue03",
                    transform: (value) => {
                        return value;
                    }
                },
                "homeValue": {
                    key: "txValue04",
                    transform: (value) => {
                        return value;
                    }
                },
                "txValue05": "txValue05?",
                "txValue06": "txValue06?",
                "txValue07": "txValue07?",
                "txValue08": "txValue08?",
                "txValue09": "txValue09?",
                "txValue10": "txValue10?",
                "txValue11": "txValue11?",
                "txValue12": "txValue12?",
                "txValue13": "txValue13?",
                "txValue14": "txValue14?",
                "txValue15": "txValue15?",
                "txQty01": "txQty01?",
                "txQty02": "txQty02?",
                "txQty03": "txQty03?",
                "txQty04": "txQty04?",
                "txQty05": "txQty05?",
                "txQty06": "txQty06?",
                "txQty07": "txQty07?",
                "txQty08": "txQty08?",
                "txQty09": "txQty09?",
                "txQty10": "txQty10?",
                "txXRate01": "txXRate01?",
                "txXRate02": "txXRate02?",
                "txXRate03": "txXRate03?",
                "txXRate04": "txXRate04?",
                "txXRate05": "txXRate05?",
                "txTaxCode01": "txTaxCode01?",
                "txTaxCode02": "txTaxCode02?",
                "txTaxCode03": "txTaxCode03?",
                "txTaxCode04": "txTaxCode04?",
                "txTaxCode05": "txTaxCode05?",
                "userField1": {
                    key: "txRef01",
                    transform: (value) => {
                        try {
                            //inFile.userField1.length() > 32 ? inFile.userField1.substring(0, 31) : inFile.userField1
                            return value.length > 32 ? value.substr(0, 31) : value; //it should alos work
                            // if (value.length > 32) {
                            //     return value.substr(0, 31);
                            // }
                            // return value;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txRef01, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "userField2": {
                    key: "txRef02",
                    transform: (value) => {
                        try {
                            //inFile.userField2.length() > 32 ? inFile.userField2.substring(0, 31) : inFile.userField2
                            if (value.length > 32) {
                                return value.substr(0, 31);
                            }
                            return value;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txRef02, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "userField3": {
                    key: "txRef03",
                    transform: (value) => {
                        try {
                            //inFile.userField3.length() > 32 ? inFile.userField3.substring(0, 31) : inFile.userField3
                            if (value.length > 32) {
                                return value.substr(0, 31);
                            }
                            return value;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txRef03, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "txRef04": "txRef04?",
                "txRef05": "txRef05?",
                "txRef06": "txRef06?",
                "txRef07": "txRef07?",
                "txRef08": "txRef08?",
                "txRef09": "txRef09?",
                "txRef10": "txRef10?",
                "txDesc01": "txDesc01?",
                "txDesc02": "txDesc02?",
                "txDesc03": "txDesc03?",
                "txInfo01": "txInfo01?",
                "txInfo02": "txInfo02?",
                "txInfo03": "txInfo03?",
                "txInfo04": "txInfo04?",
                "txInfo05": "txInfo05?",
                "txFlag01": "txFlag01?",
                "txFlag02": "txFlag02?",
                "txFlag03": "txFlag03?",
                "txFlag04": "txFlag04?",
                "txFlag05": "txFlag05?",
                "txComment01": "txComment01?",
                "txComment02": "txComment02?",
                "jobDetail.fileName": {
                    key: "txComment03",
                    transform: () => {
                        //context.fileName
                        try {
                            return jobDetails.fileName;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txComment03, ${Messages.INVALID_FILENAME}`)
                        }
                    }
                },
                "txComment04": "txComment04?",
                "description": {
                    key: "txComment05",
                    transform: (value) => {
                        return value;
                    }
                },
            };

            let transformedData = objectMapper(dataRow, map);
            if (this.errorMessages && this.errorMessages.length > 0) {
                return this.sendTransformedData(this.status.FAILED, 'Transformation failed', null, this.errorMessages);
            }
            return this.sendTransformedData(this.status.SUCCESS, 'Transformation success', transformedData, this.errorMessages);
        } catch (exception) {
            console.error(exception);
            throw this.toGenericError(exception)
        }
    }
}

module.exports = new Transform();