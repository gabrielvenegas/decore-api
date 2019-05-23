import { Storage } from '@google-cloud/storage';
const a = '../'

const GOOGLE_CLOUD_PROJECT_ID = 'diesel-airfoil-218216'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = './diesel-airfoil-218216-7187cad54426.json'; // Replace with the path to the downloaded private key


export const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFile: GOOGLE_CLOUD_KEYFILE
});

export const getPublicUrl = (bucketName: any, fileName: any) => `https://storage.googleapis.com/${bucketName}/${fileName}`;