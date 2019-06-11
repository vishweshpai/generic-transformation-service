'use strict';
const objectMapper = require('object-mapper');
const BaseTransformer = require('./BaseTransformer');

class IT2RSDataTransformer extends BaseTransformer {

  transform(dataRow, jobDetails, interfaceConfig, traceFields) {
    try {
            dataRow.ifName = jobDetails.interfaceName;
            dataRow.fileNameOnly = jobDetails.fileName;
            let transformedData = objectMapper(dataRow, this.mapToCodaAttributes());
            if (this.errorMessages && this.errorMessages.length > 0) {
              return this.sendTransformedData(this.status.FAILED, 'Transformation failed', null, this.errorMessages);
            }
      return this.sendTransformedData(this.status.SUCCESS, 'Transformation Success', transformedData, this.errorMessages);
    } catch (exception) {
      console.error(exception);
      throw this.toGenericError(exception)
    }
  }

  mapToCodaAttributes() {
    let map = {
      'lineID': {
        key: 'lineID?',
        transform: (value) => { return value; }
      }, 'ifName': {
        key: 'ifName?',
        transform: (value) => { return value; }
      }, 'ifNo': {
        key: 'ifNo?',
        transform: (value) => { return value; }
      }, 'journalAccountCompany': {
        key: 'company',
        transform: (value) => { return value; }
      }, 'txType01': {
        key: 'txType01?',
        transform: (value) => { return value; }
      }, 'txType02': {
        key: 'txType02?',
        transform: (value) => { return value; }
      }, 'txType03': {
        key: 'txType03?',
        transform: (value) => { return value; }
      }, 'txType04': {
        key: 'txType04?',
        transform: (value) => { return value; }
      }, 'txType05': {
        key: 'txType05?',
        transform: (value) => { return value; }
      }, 'journalReference': {
        key: 'txtNo01?',
        transform: (value) => { return value; }
      }, 'txtNo02': {
        key: 'txtNo02?',
        transform: (value) => { return value; }
      }, 'debitCreditFlag': {
        key: 'txtNo03?',
        transform: (value) => { return value; }
      }, 'txtNo04': {
        key: 'txtNo04?',
        transform: (value) => { return value; }
      }, 'txtNo05': {
        key: 'txtNo05?',
        transform: (value) => { return value; }
      }, 'accountingPeriodCode': [
        {
          key: 'txYear',
          transform: (value) => {
            return value == null ? null : value / 100;
          }
        }, {
          key: 'txPeriod',
          transform: (value) => {
            return value == null ? null : value % 100;
          }
        }
      ], 'ledgerAccountCurrencyCode': {
        key: 'txCurrency01?',
        transform: (value) => { return value; }
      }, 'txCurrency02': {
        key: 'txCurrency02?',
        transform: (value) => { return value; }
      }, 'originalCurrency': {
        key: 'txCurrency03?',
        transform: (value) => { return value; }
      }, 'overallAccountingCurrency': {
        key: 'txCurrency04?',
        transform: (value) => { return value; }
      }, 'txCurrency05': {
        key: 'txCurrency05?',
        transform: (value) => { return value; }
      }, 'eventDate': {
        key: 'txDate01?',
        transform: (value) => { return value; }
      }, 'txDate02': {
        key: 'txDate02?',
        transform: (value) => { return value; }
      }, 'txDate03': {
        key: 'txDate03?',
        transform: (value) => { return value; }
      }, 'txDate04': {
        key: 'txDate04?',
        transform: (value) => { return value; }
      }, 'txDate05': {
        key: 'txDate05?',
        transform: (value) => { return value; }
      }, 'txLine': {
        key: 'txLine?',
        transform: (value) => { return value; }
      }, 'txSeq': {
        key: 'txSeq?',
        transform: (value) => { return value; }
      }, 'GLAccountName': {
        key: 'txAcCode01?',
        transform: (value) => { return value; }
      }, 'txAcCode02': {
        key: 'txAcCode02?',
        transform: (value) => { return value; }
      }, 'txAcCode03': {
        key: 'txAcCode03?',
        transform: (value) => { return value; }
      }, 'txAcCode04': {
        key: 'txAcCode04?',
        transform: (value) => { return value; }
      }, 'txAcCode05': {
        key: 'txAcCode05?',
        transform: (value) => { return value; }
      }, 'txAcCode06': {
        key: 'txAcCode06?',
        transform: (value) => { return value; }
      }, 'txAcCode07': {
        key: 'txAcCode07?',
        transform: (value) => { return value; }
      }, 'txAcCode08': {
        key: 'txAcCode08?',
        transform: (value) => { return value; }
      }, 'txAcCode09': {
        key: 'txAcCode09?',
        transform: (value) => { return value; }
      }, 'txAcCode10': {
        key: 'txAcCode10?',
        transform: (value) => { return value; }
      }
      , 'accountAmount': {
        key: 'txValue01?',
        transform: (value) => { return value; }
      }, 'txValue02': {
        key: 'txValue02?',
        transform: (value) => { return value; }
      }, 'postedAmount': {
        key: 'txValue03?',
        transform: (value) => { return value; }
      }, 'overallAmount': {
        key: 'txValue04?',
        transform: (value) => { return value; }
      }, 'txValue05': {
        key: 'txValue05?',
        transform: (value) => { return value; }
      }, 'txValue06': {
        key: 'txValue06?',
        transform: (value) => { return value; }
      }, 'txValue07': {
        key: 'txValue07?',
        transform: (value) => { return value; }
      }, 'txValue08': {
        key: 'txValue08?',
        transform: (value) => { return value; }
      }, 'txValue09': {
        key: 'txValue09?',
        transform: (value) => { return value; }
      }, 'txValue10': {
        key: 'txValue10?',
        transform: (value) => { return value; }
      }, 'txValue11': {
        key: 'txValue11?',
        transform: (value) => { return value; }
      }, 'txValue12': {
        key: 'txValue12?',
        transform: (value) => { return value; }
      }, 'txValue13': {
        key: 'txValue13?',
        transform: (value) => { return value; }
      }, 'txValue14': {
        key: 'txValue14?',
        transform: (value) => { return value; }
      }, 'txValue15': {
        key: 'txValue15?',
        transform: (value) => { return value; }
      }, 'txQty01': {
        key: 'txQty01?',
        transform: (value) => { return value; }
      }, 'txQty02': {
        key: 'txQty02?',
        transform: (value) => { return value; }
      }, 'txQty03': {
        key: 'txQty03?',
        transform: (value) => { return value; }
      }, 'txQty04': {
        key: 'txQty04?',
        transform: (value) => { return value; }
      }, 'txQty05': {
        key: 'txQty05?',
        transform: (value) => { return value; }
      }, 'txQty06': {
        key: 'txQty06?',
        transform: (value) => { return value; }
      }, 'txQty07': {
        key: 'txQty07?',
        transform: (value) => { return value; }
      }, 'txQty08': {
        key: 'txQty08?',
        transform: (value) => { return value; }
      }, 'txQty09': {
        key: 'txQty09?',
        transform: (value) => { return value; }
      }, 'txQty10': {
        key: 'txQty10?',
        transform: (value) => { return value; }
      }, 'accountFXRate': {
        key: 'txXRate01?',
        transform: (value) => { return value; }
      }, 'txXRate02': {
        key: 'txXRate02?',
        transform: (value) => { return value; }
      }, 'txXRate03': {
        key: 'txXRate03?',
        transform: (value) => { return value; }
      }, 'overallFXRate': {
        key: 'txXRate04?',
        transform: (value) => { return value; }
      }, 'txXRate05': {
        key: 'txXRate05?',
        transform: (value) => { return value; }
      }, 'txTaxCode01': {
        key: 'txTaxCode01?',
        transform: (value) => { return value; }
      }, 'txTaxCode02': {
        key: 'txTaxCode02?',
        transform: (value) => { return value; }
      }, 'txTaxCode03': {
        key: 'txTaxCode03?',
        transform: (value) => { return value; }
      }, 'txTaxCode04': {
        key: 'txTaxCode04?',
        transform: (value) => { return value; }
      }, 'txTaxCode05': {
        key: 'txTaxCode05?',
        transform: (value) => { return value; }
      }, 'transactionReference': {
        key: 'txRef01?',
        transform: (value) => { return value; }
      }, 'bookCode': {
        key: 'txRef02?',
        transform: (value) => { return value; }
      }, 'postingAccountName': {
        key: 'txRef03?',
        transform: (value) => { return value; }
      }, 'MIDASreference': {
        key: 'txRef04?',
        transform: (value) => { return value; }
      }, 'txRef05': {
        key: 'txRef05?',
        transform: (value) => { return value; }
      }, 'txRef06': {
        key: 'txRef06?',
        transform: (value) => { return value; }
      }, 'txRef07': {
        key: 'txRef07?',
        transform: (value) => { return value; }
      }, 'txRef08': {
        key: 'txRef08?',
        transform: (value) => { return value; }
      }, 'txRef09': {
        key: 'txRef09?',
        transform: (value) => { return value; }
      }, 'txRef10': {
        key: 'txRef10?',
        transform: (value) => { return value; }
      }, 'transactionCounterparty': {
        key: 'txDesc01?',
        transform: (value) => { return value; }
      }, 'txDesc02': {
        key: 'txDesc02?',
        transform: (value) => { return value; }
      }, 'txDesc03': {
        key: 'txDesc03?',
        transform: (value) => { return value; }
      }, 'txInfo01': {
        key: 'txInfo01?',
        transform: (value) => { return value; }
      }, 'txInfo02': {
        key: 'txInfo02?',
        transform: (value) => { return value; }
      }, 'txInfo03': {
        key: 'txInfo03?',
        transform: (value) => { return value; }
      }, 'txInfo03': {
        key: 'txInfo04?',
        transform: (value) => { return value; }
      }, 'txInfo05': {
        key: 'txInfo05?',
        transform: (value) => { return value; }
      }, 'txFlag01': {
        key: 'txFlag01?',
        transform: (value) => { return value; }
      }, 'txFlag02': {
        key: 'txFlag02?',
        transform: (value) => { return value; }
      }, 'txFlag03': {
        key: 'txFlag03?',
        transform: (value) => { return value; }
      }, 'txFlag04': {
        key: 'txFlag04?',
        transform: (value) => { return value; }
      }, 'txFlag05': {
        key: 'txFlag05?',
        transform: (value) => { return value; }
      }, 'ledgerAccountName': {
        key: 'txComment01?',
        transform: (value) => { return value; }
      }, 'txComment02': {
        key: 'txComment02?',
        transform: (value) => { return value; }
      }, 'fileNameOnly': {
        key: 'txComment03?',
        transform: (value) => { return value; }
      }, 'txComment04': {
        key: 'txComment04?',
        transform: (value) => { return value; }
      }, 'txComment05': {
        key: 'txComment05',
        transform: (value) => { return value; }
      }

    }
    return map;
  }
}

module.exports = new IT2RSDataTransformer();