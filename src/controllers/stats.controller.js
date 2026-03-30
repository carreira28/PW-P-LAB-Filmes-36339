const statsService = require("../services/stats.service");

const getStats = async (req, res, next) => {
  try {
    const stats = await statsService.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
