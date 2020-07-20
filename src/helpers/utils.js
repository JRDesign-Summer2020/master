// import { Auth } from 'aws-amplify';
// import AWS from 'aws-sdk';
// import { CognitoUserPool } from 'amazon-cognito-identity-js'
// import { config } from 'aws-sdk'
import { sigV4Client } from './sigV4Client';
import '../components/login';

export async function getRole() {
  let user = await Auth.currentAuthenticatedUser();
  return user.signInUserSession.accessToken.payload['cognito:groups'][0];
}

export async function getUsername() {
  let user = await Auth.currentAuthenticatedUser();
  return user.signInUserSession.accessToken.payload['username'];
}

export async function invokeApig({
    path,
    method = "",
    headers = {},
    queryParams = {},
    body
  }) {
    let creds = await Auth.currentCredentials();
    const signedRequest = sigV4Client
      .newClient({
        accessKey: creds['accessKeyId'],
        secretKey: creds['secretAccessKey'],
        sessionToken: creds['sessionToken'],
        region: 'us-east-1',
        endpoint: 'https://6z0glw5vac.execute-api.us-east-1.amazonaws.com/Prod'
      })
      .signRequest({
        method,
        path,
        headers,
        queryParams,
        body
      });

    body = body ? JSON.stringify(body) : body;
    headers = signedRequest.headers;

    const results = await fetch(signedRequest.url, {
      method,
      headers,
      body
    });
  
    if (!([200, 201, 204].includes(results.status))) {
      throw new Error(await results.text());
    }

    return results.json();
  }
