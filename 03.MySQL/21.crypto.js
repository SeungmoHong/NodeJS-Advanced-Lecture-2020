var crypto = require('crypto');

// SHA : Secure Hash Algorithm
var shasum = crypto.createHash('sha256'); // sha256, sha512
shasum.update('11');
var output = shasum.digest('base64');  //hex, base64

console.log('crypto_hash:', output);
console.log(output.length);