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
                "ifName": {
                    key: "ifName",
                    transform: () => {
                        return jobDetails.interfaceName;
                    }
                },
                "ifNo": "ifNo?",
                "company": "company?",
                "txType01": "txType01?",
                "txType02": "txType02?",
                "txType03": "txType03?",
                "txType04": "txType04?",
                "txType05": "txType05?",
                "txNo01": "txNo01?",
                "txNo02": "txNo02?",
                "txNo03": "txNo03?",
                "txNo04": "txNo04?",
                "txNo05": "txNo05?",
                "txYear": "txYear?",
                "txPeriod": "txPeriod?",
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
                            return jobDetails.fileName;
                        }
                    }
                ],
                "currency": "txCurrency02",
                "txCurrency03": "txCurrency03?",
                "txCurrency04": "txCurrency04?",
                "txCurrency05": "txCurrency05?",
                "txDate02": "txDate02?",
                "txDate03": "txDate03?",
                "txDate04": "txDate04?",
                "txDate05": "txDate05?",
                "txLine": "txLine?",
                "txSeq": "txSeq?",
                "txAcCode01": "txAcCode01?",
                "txAcCode02": "txAcCode02?",
                "txAcCode03": "txAcCode03?",
                "txAcCode04": "txAcCode04?",
                "txAcCode05": "txAcCode05?",
                "txAcCode06": "txAcCode06?",
                "txAcCode07": "txAcCode07?",
                "txAcCode08": "txAcCode08?",
                "txAcCode09": "txAcCode09?",
                "txAcCode10": "txAcCode10?",
                "txValue01": "txValue01?",
                "txValue02": "txValue02?",
                "txValue03": "txValue03?",
                "txValue04": "txValue04?",
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
                "rate": "txXRate01",
                "txXRate02": "txXRate02?",
                "txXRate03": "txXRate03?",
                "txXRate04": "txXRate04?",
                "txXRate05": "txXRate05?",
                "txTaxCode01": "txTaxCode01?",
                "txTaxCode02": "txTaxCode02?",
                "txTaxCode03": "txTaxCode03?",
                "txTaxCode04": "txTaxCode04?",
                "txTaxCode05": "txTaxCode05?",
                "txRef01": "txRef01?",
                "txRef02": "txRef02?",
                "txRef03": "txRef03?",
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
                "txComment04": "txComment04?",
                "txComment05": "txComment05?",
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