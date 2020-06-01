const https = require('https');

export default function getEvaluations() {
  let options = {
    host: 'https://6z0glw5vac.execute-api.us-east-1.amazonaws.com/Prod' ,
    path: '/evaluations',
    method: 'GET',
    //this header Authorization will be different for every user and certain timeframes, we will have to make a constant for this and pass it to here. this is just an example
    headers: { 'Authorization': 'eyJraWQiOiIrOTFsZ2lWZzNSUlljWlpFWWR2amVrRjVyMk9HcU1CcEZveGUweDRYazhRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyZTIzOTdlYi02MGIyLTQyNjYtYjI2ZC0xNGQyODg2ZTIzMzgiLCJldmVudF9pZCI6IjBiNzczNWU5LTRmNDAtNGFhMC05ZmFlLTIzM2YxOWIxZDA4MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE1OTEwMjgzMjQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3VrV3FleWhNNCIsImV4cCI6MTU5MTAzMTkyNCwiaWF0IjoxNTkxMDI4MzI0LCJ2ZXJzaW9uIjoyLCJqdGkiOiJlZDE1MjZhNS1hZGU3LTRkYzAtOGM4OC0zZTNhNWY0Y2UwMWYiLCJjbGllbnRfaWQiOiIxbHIyOTB0YmdsOWM1MzNya2xjN25jZ3ZoZyIsInVzZXJuYW1lIjoiamNvcm9uYTgifQ.iEx-Od3nb1uAHLawd0YYb_ANr4FhFPkMp-IQ1D6-bq6gOp5_AJ4brgQba6sn9RYf--yEgQMH7CyETD2-epvp2ohKtZUitcB2RKH31Lw19wcTsm6W-1SpQDjpX2-Q60G2olZENfrSuWVvfNW6WJIX4hfhp4u1ZDlWjBj_ctCzLUxUilZU8_CaJQOYjqQHJcL0JtFPYDF-eWxXubPykm-8Qgd6TLmmKp5b3vrqj85eFPDyJh3583TcrioHSOpTF-Uw_SMwQ6qfO44pKREdE8nj79i0ARxboeD37rLzFXy0xHRkPznM5EefN3xw702K9Sx-kSdtRK4st1X1H9yMbck2Tw' }
  }

  let data;
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      data = JSON.parse(chunk);
      console.log("chunk " + data.Items);
    });
  });
  req.on('error', error => {
    console.error(error)
  });
  req.end();
  return null;
}