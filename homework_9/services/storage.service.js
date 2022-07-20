const S3 = require('aws-sdk/clients/s3');

const {config} = require('../configs');

const Bucket = new S3({
    region: config.AWS_S3_REGION,
    accessKeyId: config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY
});

const _buildFilePath = (itemType, fileName, itemID) => {
      const extension = fileName.split('.').pop();

      return `${itemType}/${itemID}/${Date.now()}.${extension}`;
};

module.exports = {
    uploadFile: async (file, itemType, itemID) => {
        const Key = _buildFilePath(itemType, file.name, itemID);

        return Bucket
            .upload({
                Bucket: config.AWS_S3_BUCKET,
                Key,
                ACL: 'public-read',
                Body: file.data
            })
            .promise()
    }
};

