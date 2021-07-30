const Coinlayer = require('../services/coinlayer-api');

const getBtcRate = async (req, res, next) => {
  try {
    const result = await Coinlayer.fetchUahToBtcRate();

    return res.json({ ...result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBtcRate };
