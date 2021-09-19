const cron = require('node-cron');
const Order = require('./models/Order');

const axios = require('axios');
const request = require('request');

const delayLoop = (fn, delay) => {
  return (x, i) => {
    setTimeout(() => {
      fn(x);
    }, i * delay);
  };
};

module.exports = cron.schedule('00 00 2 * * *', async () => {
  console.log('==============================');
  console.log('running a listenExpiration every 10 second');
  console.log('==============================');

  const orders = await Order.find({
    type: { $in: ['plan'] },
    status: { $in: ['active'] },
    expirationDate: { $lt: new Date() },
  });
  orders.forEach(
    delayLoop(async order => {
      try {
        const resp = await axios.post(
          'https://secure.telr.com/gateway/order.json',
          {
            method: 'check',
            store: process.env.TELR_STORE_ID,
            authkey: process.env.TELR_STORE_AUTHKEY,
            order: {
              ref: order.ref,
            },
          }
        );
        if (
          resp.data.order.status.code === -1 ||
          typeof resp.data.order.transaction.ref === 'undefined'
        ) {
          return;
        }
        let tarnRef = resp.data.order.transaction.ref;

        request.post(
          {
            url: 'https://secure.telr.com/gateway/remote.xml',
            port: 9000,
            method: 'POST',
            headers: {
              'Content-Type': 'application/xml',
            },
            body: `<?xml version="1.0" encoding="UTF-8"?>
<remote>
    <store>${process.env.TELR_STORE_ID}</store>
    <key>${process.env.TELR_STORE_REMOTEKEY}</key>
    <tran>vPzHD
        <type>cancel</type>
        <class>sale</class>
        <cartid>${order._id}</cartid>
        <description>plan</description>
        <test>1</test>
        <currency>AED</currency>
        <amount>${order.price}</amount>
        <ref>${tarnRef}</ref>
    </tran>
</remote>`,
          },
          async function (error, response, body) {
            if (error !== null) {
              console.log({ error });
              return;
            }
            if (response.statusCode !== 200) {
              return;
            }

            if (
              response.statusCode === 200 &&
              JSON.stringify(body).includes('Authorised')
            ) {
              console.log({ statusCode: response.statusCode, body, order });

              await order.save();
              console.log({ order });
            }
          }
        );
      } catch (error) {
        console.log({ error });
      }
    }, 10000)
  );
});
