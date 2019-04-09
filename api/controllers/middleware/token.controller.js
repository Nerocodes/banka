import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'supersecret';

const verifyToken = {
  verify(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.json({
        status: 403,
        error: 'No token provided.',
      }).status(403);
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          status: 500,
          error: 'Failed to authenticate token.',
        }).status(500);
      }
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      return next();
    });
    return res.json({
      status: 500,
      error: 'Failed to authenticate token.',
    }).status(500);
  },
};


export default verifyToken;
