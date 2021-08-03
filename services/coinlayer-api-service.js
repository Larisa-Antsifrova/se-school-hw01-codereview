require('dotenv').config();
const axios = require('axios');

const { COINLAYER_API_KEY } = process.env;
const coinlayer = axios.create({
  baseURL: 'http://api.coinlayer.com', // only HTTP is available in free tier, HTTPS - in premium one
});

class RatesService {
  async fetchUahToBtcRate() {
    try {
      const {
        data: { timestamp, target, rates },
      } = await coinlayer.get('/live', {
        params: {
          access_key: COINLAYER_API_KEY,
          target: 'UAH',
          symbols: 'BTC',
        },
      });

      return { timestamp, target, rates };
    } catch (error) {
      console.log('Error in fetchUahToBtcRate: ', error.message);
    }
  }
}

module.exports = new RatesService();
