const showHomeMessage = (req, res, next) => {
  return res.json({
    message:
      'Welcome! Please visit /user/create endpoint to register or /user/login to login. Once logged in you can visit /btcRate to learn what current bitcoin rate is.',
  });
};

module.exports = { showHomeMessage };
