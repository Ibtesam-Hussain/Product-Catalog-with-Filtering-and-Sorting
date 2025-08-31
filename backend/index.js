import express from 'express';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set your WooCommerce API credentials here
const WOOCOMMERCE_URL = process.env.WC_API_URL || 'https://your-woocommerce-site.com/wp-json/wc/v3';
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || 'your_consumer_key';
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || 'your_consumer_secret';

console.log('WooCommerce URL:', WOOCOMMERCE_URL);
console.log('Consumer Key:', CONSUMER_KEY);
console.log('Consumer Secret:', CONSUMER_SECRET);

// OAuth 1.0a setup
const oauth = OAuth({
  consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

// Proxy endpoint for WooCommerce products
app.get('/api/products', async (req, res) => {
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100;
    while (hasMore) {
      const url = `${WOOCOMMERCE_URL}/products?per_page=${perPage}&page=${page}`;
      const request_data = {
        url,
        method: 'GET',
      };
      const headers = oauth.toHeader(oauth.authorize(request_data));
      const response = await axios.get(url, { headers });
      const products = response.data;
      allProducts = allProducts.concat(products);
      if (products.length < perPage) {
        hasMore = false;
      } else {
        page++;
      }
    }
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// You can add more proxy endpoints as needed

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`WooCommerce proxy backend running on port ${PORT}`);
});
