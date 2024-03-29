const fs   = require('fs');
const path = require("path");
const jwt   = require('jsonwebtoken');

var privateKEY  = fs.readFileSync(path.resolve(__dirname, '../private.key'), 'utf8');
var publicKEY  = fs.readFileSync(path.resolve(__dirname, '../public.key'), 'utf8');  
module.exports = {
 sign: payload => { //For signing JWT
  var signOptions = {
      expiresIn:  "30d",
      algorithm:  "RS256"    
  };
  return jwt.sign(payload, privateKEY, signOptions);
},
verify: (req, res, next) => { //For  verifying JWT
  var verifyOptions = {
      expiresIn:  "30d",
      algorithm:  ["RS256"]
  };
   try{
     const result = jwt.verify(req.headers['x-access-token'], publicKEY, verifyOptions);
     if(result.user_id)
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
 }
}