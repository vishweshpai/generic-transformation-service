
const BaseValidator = require('../validator/BaseValidator');

const Messages = {
    'MISSING_DATA': 'Missing Data',
    'MISSING_CURRENCY': 'Missing Currency',
    'MISSING_RATE': 'Missing rate'
}
const STATUS = { SUCCESS: 'success', SKIPPED: 'skipped', FAILED: 'failed' }

class BusinessRuleValdator extends BaseValidator {

    validate(data) {
        if (data == undefined) {
            return this.response(STATUS.FAILED, Messages.MISSING_DATA, data);

        } else if (data && !data.currency) {
            return this.response(STATUS.FAILED, Messages.MISSING_CURRENCY, data);

        } else if (data && !data.rate) {
            return this.response(STATUS.FAILED, Messages.MISSING_RATE, data);

        } else {
            return this.response(STATUS.SUCCESS, 'Validation Successful', data)
        }
    }
}

module.exports = new BusinessRuleValdator();