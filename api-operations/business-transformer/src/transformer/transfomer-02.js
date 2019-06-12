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
        try {
            let map = {
                "jobDetails.interfaceName": {
                    key: "ifName",
                    transform: () => {
                        try {
                            return jobDetails.interfaceName;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_INTERFACENAME}`)
                        }
                    }
                },
                "1": {
                    key: "ifNo?"
                },
                "2": {
                    key: "company",
                    transform: () => {
                        return '5000';
                    }
                },
                "docType": {
                    key: "txType01",
                    transform: () => {
                        try {
                            return dataRow.docType;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "4": {
                    key: "txType02?"
                },
                "5": {
                    key: "txType03?"
                },
                "6": {
                    key: "txType04?"
                },
                "7": {
                    key: "txType05?"
                },
                "8": {
                    key: "txNo01?"
                },
                "txNo02": {
                    key: "txNo02?"
                },
                "10": {
                    key: "txNo03?"
                },
                "docNo": {
                    key: "txNo04",
                    transform: () => {
                        try {
                            return dataRow.docNo;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "12": {
                    key: "txNo05?"
                },
                "Year": {
                    key: "txYear",
                    transform: () => {
                        try {
                            return dataRow.Year;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "Period": {
                    key: "txPeriod",
                    transform: () => {
                        try {
                            return dataRow.Period;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "docCurr": [{
                    key: "txCurrency01",
                    transform: () => {
                        try {
                            return dataRow.docCurr;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_CURRENCY}`)
                        }
                    }
                }, {
                    key: "txAcCode04",
                    transform: () => {
                        try {
                            return dataRow.docCurr;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_DATA}`)
                        }
                    }
                }
                ],
                "97": {
                    key: "txCurrency02?"
                },
                "15": {
                    key: "txCurrency03?"
                },
                "16": {
                    key: "txCurrency04?"
                },
                "17": {
                    key: "txCurrency05?"
                },
                "docDate": {
                    key: "txDate01",
                    transform: () => {
                        try {
                            return dataRow.docDate;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: ifName, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "18": {
                    key: "txDate02?"
                },
                "19": {
                    key: "txDate03?"
                },
                "20": {
                    key: "txDate04?"
                },
                "21": {
                    key: "txDate05?"
                },
                "22": {
                    key: "txLine",
                    transform: () => {
                        try {
                            //Numeric.sequence("s1",1,1)
                            let a = traceFields.filter((row) => {
                                if (row.name == 'recordNumber') {
                                    return row.value;
                                }
                            })
                            return a[0].value;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txLine, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "23": {
                    key: "txSeq?"
                },
                "Nominal": {
                    key: "txAcCode01",
                    transform: () => {
                        try {
                            return dataRow.Nominal;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txAcCode01, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "firstAccount": {
                    key: "txAcCode02",
                    transform: () => {
                        try {
                            return dataRow.firstAccount;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txAcCode02, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "secondAccount": {
                    key: "txAcCode03",
                    transform: () => {
                        try {
                            return dataRow.secondAccount;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txAcCode03, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "28": {
                    key: "txAcCode05?"
                },
                "29": {
                    key: "txAcCode06?"
                },
                "30": {
                    key: "txAcCode07?"
                },
                "31": { key: "txAcCode08?" },
                "32": { key: "txAcCode09?" },
                "33": { key: "txAcCode10?" },
                "docValue": {
                    key: "txValue01",
                    transform: () => {
                        try {
                            return dataRow.docValue;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txValue01, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "nominalValue": {
                    key: "txValue02",
                    transform: () => {
                        try {
                            return dataRow.nominalValue;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txValue02, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "accountValue": {
                    key: "txValue03",
                    transform: () => {
                        try {
                            return dataRow.accountValue;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txValue03, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "homeValue": {
                    key: "txValue04",
                    transform: () => {
                        try {
                            return dataRow.homeValue;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txValue04, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "38": {
                    key: "txValue05?"
                },
                "39": {
                    key: "txValue06?"
                },
                "40": {
                    key: "txValue07?"
                },
                "41": {
                    key: "txValue08?"
                },
                "42": {
                    key: "txValue09?"
                },
                "43": {
                    key: "txValue10?"
                },
                "44": {
                    key: "txValue11?"
                },
                "45": {
                    key: "txValue12?"
                },
                "46": {
                    key: "txValue13?"
                },
                "47": {
                    key: "txValue14?"
                },
                "48": {
                    key: "txValue15?"
                },
                "49": {
                    key: "txQty01?"
                },
                "50": {
                    key: "txQty02?"
                },
                "51": {
                    key: "txQty03?"
                },
                "52": {
                    key: "txQty04?"
                },
                "53": {
                    key: "txQty05?"
                },
                "54": {
                    key: "txQty06?"
                },
                "55": {
                    key: "txQty07?"
                },
                "56": {
                    key: "txQty08?"
                },
                "57": {
                    key: "txQty09?"
                },
                "58": {
                    key: "txQty10?"
                },
                "96": {
                    key: "txXRate01?"
                },
                "59": {
                    key: "txXRate02?"
                },
                "60": {
                    key: "txXRate03?"
                },
                "61": {
                    key: "txXRate04?"
                },
                "62": {
                    key: "txXRate05?"
                },
                "63": {
                    key: "txTaxCode01?"
                },
                "64": {
                    key: "txTaxCode02?"
                },
                "65": {
                    key: "txTaxCode03?"
                },
                "66": {
                    key: "txTaxCode04?"
                },
                "67": {
                    key: "txTaxCode05?"
                },
                "userField1": {
                    key: "txRef01",
                    transform: () => {
                        try {
                            let value = dataRow.userField1;
                            //inFile.userField1.length() > 32 ? inFile.userField1.substring(0, 31) : inFile.userField1
                            if (value.length > 32) {
                                return value.substr(0, 31);
                            }
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txRef01, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "userField2": {
                    key: "txRef02",
                    transform: () => {
                        try {
                            let value = dataRow.userField2;
                            //inFile.userField2.length() > 32 ? inFile.userField2.substring(0, 31) : inFile.userField2
                            if (value.length > 32) {
                                return value.substr(0, 31);
                            }
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txRef02, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "userField3": {
                    key: "txRef03",
                    transform: () => {
                        try {
                            let value = dataRow.userField3;
                            //inFile.userField3.length() > 32 ? inFile.userField3.substring(0, 31) : inFile.userField3
                            if (value.length > 32) {
                                return value.substr(0, 31);
                            }
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txRef03, ${Messages.INVALID_DATA}`)
                        }
                    }
                },
                "71": {
                    key: "txRef04?"
                },
                "72": {
                    key: "txRef05?"
                },
                "73": {
                    key: "txRef06?"
                },
                "74": {
                    key: "txRef07?"
                },
                "75": {
                    key: "txRef08?"
                },
                "76": {
                    key: "txRef09?"
                },
                "77": {
                    key: "txRef10?"
                },
                "78": {
                    key: "txDesc01?"
                },
                "79": {
                    key: "txDesc02?"
                },
                "80": {
                    key: "txDesc03?"
                },
                "81": {
                    key: "txInfo01?"
                },
                "82": {
                    key: "txInfo02?"
                },
                "83": {
                    key: "txInfo03?"
                },
                "84": {
                    key: "txInfo04?"
                },
                "85": {
                    key: "txInfo05?"
                },
                "86": {
                    key: "txFlag01?"
                },
                "87": {
                    key: "txFlag02?"
                },
                "88": {
                    key: "txFlag03?"
                },
                "89": {
                    key: "txFlag04?"
                },
                "90": {
                    key: "txFlag05?"
                },
                "91": {
                    key: "txComment01?"
                },
                "92": {
                    key: "txComment02?"
                },
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
                "93": {
                    key: "txComment04?"
                },
                "description": {
                    key: "txComment05",
                    transform: () => {
                        try {
                            return dataRow.description;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txComment05, ${Messages.INVALID_DATA}`)
                        }
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