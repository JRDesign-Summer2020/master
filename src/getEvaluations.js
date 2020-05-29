const https = require('https');

export default function getEvaluations() {
  let options = {
    host: 'https://6z0glw5vac.execute-api.us-east-1.amazonaws.com/Prod' ,
    path: '/evaluations',
    method: 'GET',
    //this header Authorization will be different for every user and certain timeframes, we will have to make a constant for this and pass it to here. this is just an example
    headers: { 'Authorization': 'eyJraWQiOiJ5dkcwYVlQREdkWTNBQ1lLSEJqYm95bzEwWG9mclIzc3lZa0ZmaWFUbW0wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyZTIzOTdlYi02MGIyLTQyNjYtYjI2ZC0xNGQyODg2ZTIzMzgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfdWtXcWV5aE00IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6Impjb3JvbmE4IiwiZ2l2ZW5fbmFtZSI6Ikp1bGlhIiwiYXVkIjoiMWxyMjkwdGJnbDljNTMzcmtsYzduY2d2aGciLCJldmVudF9pZCI6IjcwOWE2YmQ5LTA2M2YtNDMzNS05M2ZmLWY0ZGI0YjVmOTVkMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTkwNzg3MzI4LCJuYW1lIjoiSnVsaWEiLCJleHAiOjE1OTA3OTA5MjgsImN1c3RvbTpyb2xlIjoiU3R1ZGVudCAoY3VycmVudCkiLCJpYXQiOjE1OTA3ODczMjgsImZhbWlseV9uYW1lIjoiQ29yb25hIiwiZW1haWwiOiJqY29yb25hQGdhdGVjaC5lZHUifQ.aHbW_gArqD0bGuLmkup4Wl0tuG7N5goIcyEarrOso6Lw8oTnhVhkTAfG_gD9koi0vWyrphX3Ne1_dhnM92SF5JiVoJ_imBSx4qYzURiYmrbuxrUuZO_tsmO5jOIRjOCXR6uXFvnINeBFrhYBn4k3t7ofuPJU1rBMZMiE9Qpen_19SCxN6ZQHq_wcoiktWe05N2A_c0yPTISvasNJ758lOXCQBd3XGwZIA0LnId0Vd0dvHqSb43RrIDC9tMoezDw1TdrKzrWuuC-fbF0mjX1gja9GwTV93E-Ufj2b-rXN3jbhUgjp1WzR-XlJ5EqL_LtX12yiuZ7vF3JipW87uJGyIw' }
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