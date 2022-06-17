import Auth from '@aws-amplify/auth';
import { Signer } from '@aws-amplify/core';


// sign a request using Amplify Auth and Signer
export default function SignRequest(method, basePath, apiPath, endPoint, data) {
    const url = basePath + endPoint;
    const api = apiPath + endPoint;
    return Auth.currentCredentials()
        .then(credentials => {
            let cred = Auth.essentialCredentials(credentials);
            return Promise.resolve(cred);
        })
        .then(essentialCredentials => {
            let params = {
                headers: { /* request headers */ 
                    'Accept-Language': 'en'
                },
                method: method,
                api: api,
                url: url,
                host: url,
                path: url,
                data: JSON.stringify(data),
                responseType: 'application/json',
                timeout: 0
            };

            // set your AWS region and service here
            const serviceInfo = {
                region: process.env.REACT_APP_AWS_REGION, service: 'execute-api'
            }

            // cred object keys must stay the same so that 
            // Signer.sign function can access the keys
            let cred = {
                secret_key: essentialCredentials.secretAccessKey,
                access_key: essentialCredentials.accessKeyId,
                session_token: essentialCredentials.sessionToken
            }

            // Signer.sign takes care of all other steps of Signature V4
            let signedReq = Signer.sign(params, cred, serviceInfo);
            return Promise.resolve(signedReq);
        });
}
