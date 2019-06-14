const fs = require("fs");
var api = require("../utils/CommonApiMethods");
var config = require("../config")
var transformurl = config.baseUrl + config.transformer;
var _headers = { "content-type": "application/json" }
var flag = true;
const _body = JSON.parse(fs.readFileSync("./requestjson/mct-121.json","UTF-8"));


describe('POST To test Transformation for MCT121 FXRates ', function () {
    var res;
    it('verify OK status', async function () {
        res = await api.POST(transformurl, _headers, _body);
        expect(res.statusCode).toBe(200);

    })
})

describe('To verify Data in the file should be transformed for FXRATES_MCT121', function () {
    it('To verify the input schema for FXRates matches the output CODA Schema', async function () {
        var res;
        res = await api.POST(transformurl, _headers, _body);

        // ifName 
        verifyValue("interfaceName", _body.jobDetails.interfaceName, res.body.data.ifName);
        //txCurrency02
        verifyValue("currency", _body.data.currency, res.body.data.txCurrency02);
        //txXRate01
        verifyValue("rate", _body.data.rate, res.body.data.txXRate01);

        //txCurrency01

        var str = _body.jobDetails.fileName
        verifyValue("FileName", str, res.body.data.txComment03);
        var fileCurrency = str.substring(7, 4)
        verifyValue("FileCurrency", fileCurrency, res.body.data.txCurrency01);
        var fileDateTime = str.substring(7, 13)
        verifyValue("FileDateTime", fileDateTime, res.body.data.txDate01);
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