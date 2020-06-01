import { Auth } from 'aws-amplify';

export async function authorize(init) {
    let authorization = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;

    if ('headers' in init)
        init['headers']['Authorization'] = authorization;
    else
        init['headers'] = { Authorization: authorization };

    return init
}