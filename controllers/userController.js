const {
  auth,
} = require('../configs/config');

// This is just testing Because we use only use Google Account for login/signup

const userSignUp = async (req, res) => {
  try {
    const {
      displayName,
      email,
      password,
      role,
    } = req.body;
    const {uid} = await auth.createUser({
      displayName,
      email,
      password,
    });
    await auth.setCustomUserClaims(uid, {role});

    return res.status(200).send({uid});
  } catch (error) {
    return res.status(400).send('SignUp Error', error);
  };
};

// const userSignOut = async (req, res) => {
//   await auth.signOut().then(() => {
//     return res.send('User Signed Out');
//   }).catch((error) => {
//     return res.status(400).send('Sign out Error', error);
//   });
// };

// const getAllUser = async (req, res) => {
//   try {
//     const listUsers = await auth.listUsers()
//     const users = listUsers.users.map(mUser)
//   } catch(error) {
//     res.status(400).send('Fail to get User')
//   }
// };

// const mUser = (user) => {
//   user = auth.listUsers;
//   const customClaims = (user.customClaims || )
// }

module.exports = {
  userSignUp,
  // userSignIn,
  // userSignOut,
};
