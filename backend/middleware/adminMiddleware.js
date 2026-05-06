const adminOnly = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Admin only' });
  }
};

module.exports = { adminOnly };