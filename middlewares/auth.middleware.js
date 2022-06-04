const {
  auth,
} = require('../configs/config');

// admin.auth().verifyIdToken(idToken);

module.exports = validateAuthToken = async (req, res, next) => {
  console.log('Checking request if authorized with Firebase ID Token');
  // if no Token was passed
  if ((!req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies._session) ) {
    console.error('No Token pass as a Bearer token in header');
    res.status(403).send('Unauthorized');
    return;
  }

  let authToken;
  // if Token was passed
  if (req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')) {
    console.log('Authorization header was Found');
    authToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Cookie Session was Found');
    // store token from cookie
    authToken = req.cookies._session;
  } else {
    // No cookie was found
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(authToken);
    console.log('Token has been decoded', decodedToken);
    req.user = decodedToken;
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email};
    return next();
  } catch (error) {
    console.error(error);
    res.status(403).send('Unauthorized');
    return;
  }
};

// const isAuthorized = ( req, res, optionsRole) => {
//   optionsRole = {hasRole: ['admin' | 'manager' | 'user'], isAllow: Boolean};
//   const {uid, email, role} = res.locals;
//   const {id} = req.params;

//   if (optionsRole.isAllow && id && uid === id) {
//     return next();
//   }
//   if (!role) {
//     return res.status(403).send('user doesnt have role');
//   }
//   if (optionsRole.optionsRole.includes(role)) {
//     return next();
//   }
//   return;
// };

// module.exports = {
//   validateAuthToken,
//   isAuthorized,
// };
