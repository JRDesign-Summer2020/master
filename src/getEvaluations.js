const https = require('https');

export default function getEvaluations() {
  let data;
  var jsonObj;
  const req = https.get("https://2r6pp3mgnl.execute-api.us-east-1.amazonaws.com/Prod/evaluations", res => {
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