'use strict';
const objectMapper = require('object-mapper');
const BaseTransformer = require('../transformer/BaseTransformer');

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
      'lineID': 'lineID?',
      'ifName': 'ifName?',
      'ifNo': 'ifNo?',
      'journalAccountCompany': 'company',
      'txType01': 'txType01?',
      'txType02': 'txType02?',
      'txType03': 'txType03?',
      'txType04': 'txType04?',
      'txType05': 'txType05?',
      'journalReference': 'txNo01?',
      'txNo02': 'txNo02?',
      'debitCreditFlag': 'txNo03?',
      'txNo04': 'txNo04?',
      'txNo05': 'txNo05?',
      'accountingPeriodCode': [
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
      ], 'ledgerAccountCurrencyCode': 'txCurrency01?',
      'txCurrency02': 'txCurrency02?',
      'originalCurrency': 'txCurrency03?',
      'overallAccountingCurrency': 'txCurrency04?',
      'txCurrency05': 'txCurrency05?',
      'eventDate': 'txDate01?',
      'txDate02': 'txDate02?',
      'txDate03': 'txDate03?',
      'txDate04': 'txDate04?',
      'txDate05': 'txDate05?',
      'txLine': 'txLine?',
      'txSeq': 'txSeq?',
      'GLAccountName': 'txAcCode01?',
      'txAcCode02': 'txAcCode02?',
      'txAcCode03': 'txAcCode03?',
      'txAcCode04': 'txAcCode04?',
      'txAcCode05': 'txAcCode05?',
      'txAcCode06': 'txAcCode06?',
      'txAcCode07': 'txAcCode07?',
      'txAcCode08': 'txAcCode08?',
      'txAcCode09': 'txAcCode09?',
      'txAcCode10': 'txAcCode10?',
      'accountAmount': 'txValue01?',
      'txValue02': 'txValue02?',
      'postedAmount': 'txValue03?',
      'overallAmount': 'txValue04?',
      'txValue05': 'txValue05?',
      'txValue06': 'txValue06?',
      'txValue07': 'txValue07?',
      'txValue08': 'txValue08?',
      'txValue09': 'txValue09?',
      'txValue10': 'txValue10?',
      'txValue11': 'txValue11?',
      'txValue12': 'txValue12?',
      'txValue13': 'txValue13?',
      'txValue14': 'txValue14?',
      'txValue15': 'txValue15?',
      'txQty01': 'txQty01?',
      'txQty02': 'txQty02?',
      'txQty03': 'txQty03?',
      'txQty04': 'txQty04?',
      'txQty05': 'txQty05?',
      'txQty06': 'txQty06?',
      'txQty07': 'txQty07?',
      'txQty08': 'txQty08?',
      'txQty09': 'txQty09?',
      'txQty10': 'txQty10?',
      'accountFXRate': 'txXRate01?',
      'txXRate02': 'txXRate02?',
      'txXRate03': 'txXRate03?',
      'overallFXRate': 'txXRate04?',
      'txXRate05': 'txXRate05?',
      'txTaxCode01': 'txTaxCode01?',
      'txTaxCode02': 'txTaxCode02?',
      'txTaxCode03': 'txTaxCode03?',
      'txTaxCode04': 'txTaxCode04?',
      'txTaxCode05': 'txTaxCode05?',
      'transactionReference': 'txRef01?',
      'bookCode': 'txRef02?',
      'postingAccountName': 'txRef03?',
      'MIDASreference': 'txRef04?',
      'txRef05': 'txRef05?',
      'txRef06': 'txRef06?',
      'txRef07': 'txRef07?',
      'txRef08': 'txRef08?',
      'txRef09': 'txRef09?',
      'txRef10': 'txRef10?',
      'transactionCounterparty': 'txDesc01?',
      'txDesc02': 'txDesc02?',
      'txDesc03': 'txDesc03?',
      'txInfo01': 'txInfo01?',
      'txInfo02': 'txInfo02?',
      'txInfo03': 'txInfo03?',
      'txInfo03': 'txInfo04?',
      'txInfo05': 'txInfo05?',
      'txFlag01': 'txFlag01?',
      'txFlag02': 'txFlag02?',
      'txFlag03': 'txFlag03?',
      'txFlag04': 'txFlag04?',
      'txFlag05': 'txFlag05?',
      'ledgerAccountName': 'txComment01?',
      'txComment02': 'txComment02?',
      'fileNameOnly': 'txComment03?',
      'txComment04': 'txComment04?',
      'txComment05': 'txComment05'
    }
    return map;
  }
}

module.exports = new IT2RSDataTransformer();