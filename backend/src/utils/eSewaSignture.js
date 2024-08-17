const CryptoJS  = require("crypto-js")
const { eSewaSecretKey, eSewaProductCode } = require("../config/config")

function createSignature(totalAmt,id){
  console.log(totalAmt);
  console.log(id);
  console.log(eSewaProductCode);
  
  const message = `total_amount=${totalAmt},transaction_uuid=${id},product_code=${eSewaProductCode}`
  const hash = CryptoJS.HmacSHA256(message,eSewaSecretKey)
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);  
  
  return hashInBase64
}

module.exports ={
  createSignature
}