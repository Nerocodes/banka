const permissions = {
  staffAndClientOwn(req, res, next) {
    if (req.userType === 'client') {
      if (req.params.email === req.email) {
        return next();
      }
      return res.json({
        status: 403,
        error: 'Unauthorized Access',
      });
    }
    return next();
  },

  staffAndAdmin(req, res, next) {
    if (req.userType === 'client') {
      return res.json({
        status: 403,
        error: 'Unauthorized Access',
      });
    }
    return next();
  },

  staffOnly(req, res, next) {
    if (req.userType === 'staff' && req.isAdmin === false) {
      return next();
    }
    return res.json({
      status: 403,
      error: 'Unauthorized Access',
    });
  },
};

export default permissions;
