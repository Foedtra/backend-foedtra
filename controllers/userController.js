// const {
//   auth,
// } = require('../configs/config');

// This is just testing Because we use only use Google Account for login/signup

// const createUser = async (req, res) => {
//   try {
//     const {
//       displayName,
//       email,
//       password,
//       role,
//     } = req.body;
//     const {uid} = await auth.createUser({
//       displayName,
//       email,
//       password,
//     });
//     await auth.setCustomUserClaims(uid, {role});

//     return res.status(200).send({uid});
//   } catch (error) {
//     return res.status(400).send('SignUp Error', error);
//   };
// };

// const listAllUsers = (nextPageToken) => {
//   // List batch of users, 1000 at a time.
//   auth
//       .listUsers(1000, nextPageToken)
//       .then((listUsersResult) => {
//         listUsersResult.users.forEach((userRecord) => {
//           console.log('user', userRecord.toJSON());
//         });
//         if (listUsersResult.pageToken) {
//         // List next batch of users.
//           listAllUsers(listUsersResult.pageToken);
//         }
//       })
//       .catch((error) => {
//         console.log('Error listing users:', error);
//       });
// };
// // Start listing users from the beginning, 1000 at a time.

// module.exports = {
//   createUser,
//   listAllUsers,
//   // userSignIn,
//   // userSignOut,
// };
