const apiProcessor = require('business-transformer').apiProcessor;
const winston = require('winston-wrapper');
const logger = winston.getLogger('generic-transformer-event-handler')

module.exports.handle = function (event, context, callback) {
    winston.serverlessFunction(event, context, () => {
        logger.debug("Entered handler with request " + JSON.stringify(event));
        apiProcessor.process(event, context).then((body) => {
            logger.debug("Exiting with response ", body);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(body)
            })
        }).catch(error => {
            logger.error('Handler', error)
            if (event.body) {
                event = JSON.parse(event.body)
            }
            callback(null, {
                statusCode: error.httpStatusCode,
                body: JSON.stringify({
                    status: 'failed',
                    message: error.reason || error.description,
                    data: event.data
                })
            })
        })
    })
};
