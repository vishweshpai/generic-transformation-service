'use strict';
const objectMapper = require('object-mapper');
const BaseTransformer = require('../transformer/BaseTransformer');

const Messages = {
    'INVALID_CURRENCY': "Invalid data being mapped to txCurrency",
    'INVALID_INTERFACENAME': "Invalid interfacename",
    'INVALID_RATE': "Invalid rate",
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
                    key: "company?"
                },
                "3": {
                    key: "txType01?"
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
                "9": {
                    key: "txNo02?"
                },
                "10": {
                    key: "txNo03?"
                },
                "11": {
                    key: "txNo04?"
                },
                "12": {
                    key: "txNo05?"
                },
                "13": {
                    key: "txYear?"
                },
                "14": {
                    key: "txPeriod?"
                },
                "jobDetails.fileName": [
                    {
                        key: "txCurrency01",
                        transform: () => {
                            let res = undefined;
                            let value = jobDetails.fileName;
                            try {
                                res = value.substring(4, 7);
                                if (res.length < 3) {
                                    throw new Error("Invalid data being mapped to txCurrency01");
                                }
                                return res;
                            } catch (ex) {
                                console.log(ex.message);
                                this.addErrorMessage(`Key: txCurrency01, ${Messages.INVALID_FILENAME}`)
                            }
                        }
                    },
                    {
                        key: "txDate01",
                        transform: () => {
                            let res = undefined;
                            let value = jobDetails.fileName;
                            try {
                                res = value.substring(7, 13);
                                if (res.length < 6) {
                                    throw new Error("Invalid data being mapped to txDate01");
                                }
                                return res;
                            } catch (ex) {
                                console.log(ex.message);
                                this.addErrorMessage(`Key: txDate01, ${Messages.INVALID_FILENAME}`)
                            }
                        }
                    },
                    {
                        key: "txComment03",
                        transform: () => {
                            try {
                                return jobDetails.fileName;;
                            } catch (ex) {
                                console.log(ex.message);
                                this.addErrorMessage(`Key: txComment03, ${Messages.INVALID_FILENAME}`)
                            }
                        }
                    }
                ],
                "currency": {
                    key: "txCurrency02",
                    transform: () => {
                        try {
                            return dataRow.currency;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txCurrency02, ${Messages.INVALID_CURRENCY}`)
                        }
                    }
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
                    key: "txLine?"
                },
                "23": {
                    key: "txSeq?"
                },
                "24": {
                    key: "txAcCode01?"
                },
                "25": {
                    key: "txAcCode02?"
                },
                "26": {
                    key: "txAcCode03?"
                },
                "27": {
                    key: "txAcCode04?"
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
                "31": {
                    key: "txAcCode08?"
                },
                "32": {
                    key: "txAcCode09?"
                },
                "33": {
                    key: "txAcCode10?"
                },
                "34": {
                    key: "txValue01?"
                },
                "35": {
                    key: "txValue02?"
                },
                "36": {
                    key: "txValue03?"
                },
                "37": {
                    key: "txValue04?"
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
                "rate": {
                    key: "txXRate01",
                    transform: () => {
                        try {
                            return dataRow.rate;
                        } catch (ex) {
                            console.log(ex.message);
                            this.addErrorMessage(`Key: txXRate01, ${Messages.INVALID_RATE}`)
                        }
                    }
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
                "68": {
                    key: "txRef01?"
                },
                "69": {
                    key: "txRef02?"
                },
                "70": {
                    key: "txRef03?"
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
                "93": {
                    key: "txComment04?"
                },
                "94": {
                    key: "txComment05?"
                },
            };

            let transformedData = objectMapper(dataRow, map);
            if (this.errorMessages && this.errorMessages.length > 0) {
                return this.sendTransformedData(this.status.FAILED, 'Transformation failed', null, this.errorMessages);
                // return this.generateError(this.errorMessages);
            }
            return this.sendTransformedData(this.status.SUCCESS, 'Transformation Success', transformedData, this.errorMessages);
        } catch (exception) {
            console.error(exception);
            throw this.toGenericError(exception)
        }
    }
}

module.exports = new Transform();