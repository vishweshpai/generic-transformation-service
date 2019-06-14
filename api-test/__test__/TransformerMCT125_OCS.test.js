const fs = require("fs");
var api = require("../utils/CommonApiMethods");
var config = require("../config")
var transformurl = config.baseUrl + config.transformer;
var _headers = { "content-type": "application/json" }
var flag = true;
const _body = JSON.parse(fs.readFileSync("./requestjson/mct-125.json","UTF-8"));


describe('POST To test Transformation for MCT125 For OCS ', function () {
    var res;
    it('verify OK status', async function () {
        res = await api.POST(transformurl, _headers, _body);
        expect(res.statusCode).toBe(200);

    })
})

describe('To verify Data in the file should be transformed for OCS _MCT125', function () {
    it('To verify the input schema for FXRates matches the output CODA Schema', async function () {
        var res;
        res = await api.POST(transformurl, _headers, _body);

        // ifName 
        verifyValue("interfaceName", _body.jobDetails.interfaceName, res.body.data.ifName);
        verifyValue("Company", res.body.data.company, 5000);
        //txCurrency02
        verifyValue("DocType", _body.data.docType, res.body.data.txType01);
        //txXRate01
        verifyValue("DocNo", _body.data.docNo, res.body.data.txNo04);
        verifyValue("Year", _body.data.Year, res.body.data.txYear);
        verifyValue("Period", _body.data.Period, res.body.data.txPeriod);
        verifyValue("Doc Currency1", _body.data.docCurr, res.body.data.txCurrency01);
        verifyValue("Doc Date", _body.data.docDate, res.body.data.txDate01);
        verifyValue("Line", _body.traceFields[1].value, res.body.data.txLine);
        verifyValue("Nominal value", _body.data.Nominal, res.body.data.txAcCode01);
        verifyValue("First Account", _body.data.firstAccount, res.body.data.txAcCode02);
        //verifyValue("rate", _body.data.firstAccount, res.body.data.txAcCode02);
        verifyValue("Second Account", _body.data.secondAccount, res.body.data.txAcCode03);
        verifyValue("Doc Currency2", _body.data.docCurr, res.body.data.txAcCode04);
        verifyValue("Doc Value", _body.data.docValue, res.body.data.txValue01);
        verifyValue("Nominal Value", _body.data.nominalValue, res.body.data.txValue02);
        verifyValue("Account Value", _body.data.accountValue, res.body.data.txValue03);
        verifyValue("Home VAlue", _body.data.homeValue, res.body.data.txValue04);
       
        var str = _body.jobDetails.fileName
        verifyValue("FileName", str, res.body.data.txComment03);
        verifyValue("File Description", _body.data.description, res.body.data.txComment05);
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