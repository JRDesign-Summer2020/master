const https = require('https');

export default function getEvaluations() {
  let options = {
    host: '0c8p8cda3f.execute-api.us-east-1.amazonaws.com/Prod',
    path: '/evaluations',
    method: 'GET',
    headers: { 'Authorization': 'eyJraWQiOiJ6bVB1VzdCOTIraXlOZnlcL2xwRWhKdjRRTVEydFh6Y0k2eWZRUkVxVFpKQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NjEyZDAxZi0yOTU5LTQ0Y2ItOGQ2Yi1iNDRmZmE1NmI2OTciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfd1dQOWJ0a21YIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6Imx1a2UiLCJnaXZlbl9uYW1lIjoiTHVrZSIsImF1ZCI6IjNvM3RzcnVrNmZtc2Y0NWkzcm4yMXJtNnBxIiwiZXZlbnRfaWQiOiI4NWI0ZWQwMi1hYTdkLTRlYWEtOTBhYy03MTZjZGNjNDdiODgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU5MDc4MTMxNiwibmFtZSI6Ikx1a2UiLCJleHAiOjE1OTA3ODQ5MTYsImN1c3RvbTpyb2xlIjoiU3R1ZGVudCAoZ3JhZHVhdGUpIiwiaWF0IjoxNTkwNzgxMzE2LCJmYW1pbHlfbmFtZSI6IkRvbm92YW4iLCJlbWFpbCI6Imxkb25vdmFuN0BnYXRlY2guZWR1In0.G-p5BQb53Ki9p8tQya5H7XQgp_QrxZxbrD1xtGXEI3rxBeA5oIQIGG2BB7my6keASYcFjhAmMXscvPiikfNj-JsH51T_lHDBtBo6l5UsJWviI7bf5zll2BUXPczPWUaMg5IRRLgD6EjacFk1a8KbJkoUWxeS9Ru-_UlVKq79SO0oh-2WJKAcZWERl3eJL-r6mRw8btjt8hA-rLnT5smtAakyUam6m5_ckrFvcm0pBnC_Qxh5wre4yaQjExtWLJHCXCoCT4mK-YIke13-r-k5OIthkcMBYJOEn0jwEB5mJmmUrLHXV434bW7HSLUBR9WCxYVedVeCT4lFE8UImB6--g' }
  };

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
    console.error(error);
  });
  req.end();
  return null;
}