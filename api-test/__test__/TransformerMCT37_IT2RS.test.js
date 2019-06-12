const fs = require("fs");

var api = require("../utils/CommonApiMethods");
var config = require("../config")
var transformurl = config.baseUrl + config.transformer;
var _headers = { "content-type": "application/json" }
var flag = true;
const _body_it2trs = JSON.parse(fs.readFileSync("./requestjson/mct-37.json","UTF-8"));

describe('POST To test Transformation for MCT37 for the job IT2RS ', function () {
    var res;
    it('verify OK status', async function () {
		res = await api.POST(transformurl, _headers, _body_it2trs);
        expect(res.statusCode).toBe(200);

    })
})

describe('To verify if the input json is correctly transformed to the output json for Story MCT37', function () {
    it('To verify if the input json correctly matches the output json ', async function () {

        var res;
		
		res = await api.POST(transformurl, _headers, _body_it2trs);
		
        verifyValue("journalReference",_body_it2trs.data.journalReference, res.body.data.txNo01);
        verifyValue("journalAccountCompany",_body_it2trs.data.journalAccountCompany, res.body.data.company);
        verifyValue("accountingPeriodCode",_body_it2trs.data.accountingPeriodCode, res.body.data.txYear);
        verifyValue("originalCurrency",_body_it2trs.data.originalCurrency, res.body.data.txCurrency03);
        verifyValue("eventDate",_body_it2trs.data.eventDate, res.body.data.txDate01);
        verifyValue("GLAccountName",_body_it2trs.data.GLAccountName, res.body.data.txAcCode01);
        verifyValue("postedAmount",_body_it2trs.data.postedAmount, res.body.data.txValue03);
        verifyValue("ledgerAccountCurrencyCode",_body_it2trs.data.ledgerAccountCurrencyCode, res.body.data.txCurrency01);
        verifyValue("accountFXRate",_body_it2trs.data.accountFXRate, res.body.data.txXRate01);
        verifyValue("accountAmount",_body_it2trs.data.accountAmount, res.body.data.txValue01);
        verifyValue("overallAccountingCurrency",_body_it2trs.data.overallAccountingCurrency, res.body.data.txCurrency04);
        verifyValue("overallFXRate",_body_it2trs.data.overallFXRate, res.body.data.txXRate04);
        verifyValue("overallAmount",_body_it2trs.data.overallAmount, res.body.data.txValue04);
        verifyValue("debitCreditFlag",_body_it2trs.data.debitCreditFlag, res.body.data.txNo03);
        verifyValue("transactionCounterparty",_body_it2trs.data.transactionCounterparty, res.body.data.txDesc01);
        verifyValue("transactionReference",_body_it2trs.data.transactionReference, res.body.data.txRef01);
        verifyValue("bookCode",_body_it2trs.data.bookCode, res.body.data.txRef02);
        verifyValue("postingAccountName",_body_it2trs.data.postingAccountName, res.body.data.txRef03);
        verifyValue("ledgerAccountName",_body_it2trs.data.ledgerAccountName, res.body.data.txComment01);
        verifyValue("MIDASreference", _body_it2trs.data.MIDASreference, res.body.data.txRef04);
        expect(flag).toBe(true)

    })
})

/**
 * 
 * @param {*} keyName  : Name of the key in the input/output json
 * @param {*} act  : Value from the input json 
 * @param {*} exp  : Value from the output json
 * @description : This function is a generic function to assert if the actual value is equal to expected
 */
function verifyValue(keyName, act, exp) {
    if (act != exp) {
        flag = false;
        console.log(keyName + " :::: " + exp + " : value didnt match " + keyName + "::::" + act)
    }

}