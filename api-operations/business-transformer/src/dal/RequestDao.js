'use strict';

let AWS = require('aws-sdk');
let s3 = new AWS.S3({
    region: 'eu-west-1'
})

class GenericTransformerDao {

    async getStream(bucket, file) {
        try {
            let params = { Bucket: bucket, Key: file }
            return new Promise((resolve, reject) => {
                s3.getObject(params)
                    .createReadStream()
                    .on('data', data => {
                       // console.log('@@@@@@@@@@', data)
                        resolve(data);
                    })
                    .on('error', error => {
                        reject(error)
                    })
                    .on('end', () => {

                    });
            })
        } catch (e) {
            console.log('$$$$$$$$$$$', e)
            throw e;
        }
    }
}

module.exports = new GenericTransformerDao();

