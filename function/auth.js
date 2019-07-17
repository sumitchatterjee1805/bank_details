const fs   = require('fs');
const path = require("path");
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync(path.resolve(__dirname, '../private.key'), 'utf8');
var publicKEY  = fs.readFileSync(path.resolve(__dirname, '../public.key'), 'utf8');  
module.exports = {
 sign: (payload, $Options) => {
  /*
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  */
  // Token signing options
  var signOptions = {
      issuer:  $Options.issuer,
      subject:  $Options.subject,
      audience:  $Options.audience,
      expiresIn:  "5d",    // 30 days validity
      algorithm:  "RS256"    
  };
  return jwt.sign(payload, privateKEY, signOptions);
},
verify: (req, res, next) => {
  /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }  
  */
 console.log(req.url);
 console.log(req.baseUrl);
 console.log(req.path);
  var verifyOptions = {
      issuer:  'Sumit.Chatterjee.Fyle',
      subject:  req.headers['email'],
      audience:  req.baseUrl,
      expiresIn:  "30d",
      algorithm:  ["RS256"]
  };
   try{
     const result = jwt.verify(req.headers['x-access-token'], publicKEY, verifyOptions);
     if(result.user_id && result.user_id === req.headers['user_id'])
        next();
     else
        res.status(401).send('False Token');
   }catch (err){
       console.log(err)
    res.status(500).send('Server Error');
   }
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}