import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { config } from 'aws-sdk'
import { sigV4Client } from './sigV4Client';
import '../components/login'

export function setCookie(name, val, extime) {
  let date = new Date(extime);
  let expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + val + ';' + expires + ';path=/';
}

export function getCookie(name) {
  name += '=';

  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return null;
}

export function deleteCookie(name) {
  setCookie(name, '', new Date(new Date().getTime() - 1).getTime());
}

export function loggedIn() {
  let loginAccessKey = getCookie('accesskey');
  let loginSecretKey = getCookie('secretkey');
  let loginSessionToken = getCookie('sessiontoken');

  return (loginAccessKey != null) && (loginSecretKey != null) && (loginSessionToken != null);
}

export async function invokeApig({
    path,
    method = "",
    headers = {},
    queryParams = {},
    body
  }) {
    const signedRequest = sigV4Client
      .newClient({
        accessKey: getCookie('accesskey'),
        secretKey: getCookie('secretkey'),
        sessionToken: getCookie('sessiontoken'),
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

    if (results.status !== 200) {
      throw new Error(await results.text());
    }

    return results.json();
  }
