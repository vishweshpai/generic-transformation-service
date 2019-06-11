const objectMapper = require('object-mapper');
const BaseTransformer = require('../transformer/BaseTransformer');

const Messages = {
  'INVALID_CURRENCY': "Invalid data being mapped to txCurrency01",
  'INVALID_FILENAME': "Invalid filename"
}

class FxRatesTransformer extends BaseTransformer {

  async transform(dataRow, jobDetails, interfaceConfig, traceFields) {
    try {
      let map = {
        "currency": {
          key: "txCurrency02",
          transform: (value) => { return value; }
        },

        "rate": {
          key: "txXRate01",
          transform: (value) => { return value; }
        },

        "interfaceName": {
          key: "ifName",
          transform: (value) => { return value; }
        },

        "filename": [
          {
            key: "txCurrency01",
            transform: (value) => {
              try {
                let res = value.substring(4, 7);
                if (res.length < 3) {
                  throw new Error('Invalid value for filename')
                }
                return res;
              } catch (ex) {
                console.error(ex.message);
                this.addErrorMessage(`Key: txCurrency01, ${Messages.INVALID_FILENAME}`)
              }
            }
          },
          {
            key: "txDate01",
            transform: (value) => {
              let res = undefined;
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
            transform: (value) => {
              return value;
            }
          }
        ]
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

module.exports = new FxRatesTransformer();