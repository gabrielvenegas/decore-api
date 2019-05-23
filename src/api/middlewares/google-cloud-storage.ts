
import { storage, getPublicUrl } from '../helpers/google-cloud-storage';
import { Response } from 'express-serve-static-core';

const DEFAULT_BUCKET_NAME = 'product-images-ecommerce'; // Replace with the name of your bucket

export class GcUpload {
    /**
     * Middleware for uploading file to GCS.
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {*}
     */

    public sendUploadToGCS = (file: any, next: any) => {

        if (!file) {
            return next();
        }

        const bucketName = DEFAULT_BUCKET_NAME;
        const bucket = storage.bucket(bucketName);
        const gcsFileName = `${Date.now()}-${file.originalname}`;
        const fileImg = bucket.file(gcsFileName);

        const stream = fileImg.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on('error', (err) => {
            file.cloudStorageError = err;
            console.log(err);
        });

        stream.on('finish', async () => {
            file.cloudStorageObject = gcsFileName;

            fileImg.makePublic()
                .then(() => {
                    file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
                });
        });

        stream.end(file.buffer);
    };
}
