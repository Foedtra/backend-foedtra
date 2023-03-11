//import the methods
// const {
//   generateKeyPair,
//   createSign,
//   createVerify,
//   createDiffieHellman,
// } = require("crypto");
// const { encrypt, decrypt } = require("./helpers/crypt");

// // var prime_length = 200;
// // var diffHell = createDiffieHellman(prime_length);

// // diffHell.generateKeys("base64");
// // console.log("Public Key : ", diffHell.getPublicKey("base64"));
// // console.log("Private Key : ", diffHell.getPrivateKey("base64"));

// // console.log("Public Key : ", diffHell.getPublicKey("hex"));
// // console.log("Private Key : ", diffHell.getPrivateKey("hex"));
// // console.log(generateKey());
// // // module.exports = new Crypt();

// const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");
// const { generateSecretHash } = require("./helpers/crypt");

// function generateKey(size = 32, format = "base64") {
//   const buffer = randomBytes(size);
//   return buffer.toString(format);
// }

// // // used the previous function
// console.log(generateKey());
// const hai = encrypt("haii");
// console.log(decrypt(hai));

const { default: axios } = require("axios");
const { admin } = require("./configs/config");
// const { generateKey } = require("./helpers/crypt");

const createIdTokenfromCustomToken = async (uid) => {
  try {
    const customToken = await admin.auth().createCustomToken(uid);

    const res = await axios({
      url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${"AIzaSyBaI44s7hauphtW8qy6zGfVckQOYWMOT2A"}`,
      method: "post",
      data: {
        token: customToken,
        returnSecureToken: true,
      },
      json: true,
    });

    return res.data.idToken;
  } catch (e) {
    console.log(e);
  }
};
// generateKey();
createIdTokenfromCustomToken("ZYYhF7TSTrWExPwCYDBHEmZOMnK2").then((res) => {
  console.log(res);
});
