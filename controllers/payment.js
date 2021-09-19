const { default: axios } = require("axios");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const request = require("request");
const bcrypt = require("bcryptjs");

require("dotenv").config();

exports.authorised = async (req, res) => {
  console.log({ req, res });
  try {
    const order = await Order.findById(req.params.id);
    console.log({ params: req.params });

    if (!order)
      res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      oops something went wrong with your payment
    </h1>
  </div>
  `);

    if (order.status === "active")
      return res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
Your order already authorised!</h1>
  </div>
  `);

    if (order.status !== "pending")
      return res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
Your order maybe canceled or declined</h1>
  </div>
  `);
    const validVerifyCode = await bcrypt.compare(req.params.code, order.code);
    if (!validVerifyCode)
      return res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
Invalid code. please request a new one.    </h1>
  </div>
  `);

    const token = jwt.sign({ _id: order.createdBy }, process.env.JWT_SECRET, {
      expiresIn: "64d",
    });
    order.status = "active";
    order.code = "111111";
    await order.save();
    if (order.type === "oneTime") {
      let currentDay = new Date().getDay();

      order.cars.map(car =>
        axios
          .post(
            `${req.protocol + "://" + req.get("host")}/api/scheduled-wash`,
            {
              cars: order.cars
                .filter(car =>
                  car.userServices.some(
                    userService =>
                      userService.days.includes(currentDay) &&
                      userService.count > 0
                  )
                )
                .map(car => {
                  return {
                    carId: car.carId,
                    services: car.userServices
                      .filter(userService => userService.count > 0)
                      .filter(userService =>
                        userService.days.includes(currentDay)
                      )
                      .map(userService => {
                        return {
                          service: userService.service,
                          count: 1,
                        };
                      }),
                  };
                }),
              date: new Date().setHours(new Date().getHours() + 9),
              order: order._id,
              day: currentDay,
              type: "oneTime",
              createdBy: order.createdBy,
            },
            {
              headers: {
                "x-access-token": token,
              },
            }
          )
          .then(result => {
            // console.log({ result });
          })
          .catch(err => {
            console.log({ err });
          })
      );
    }

    res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #3fe85c;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      your payment has been authorised!
    </h1>
  </div>

  `);
  } catch (error) {
    console.log({ error });

    res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      oops something went wrong with your payment
    </h1>
  </div>
  `);
  }
};

exports.declined = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      oops something went wrong with your payment
    </h1>
  </div>
      `);

    order.status = "declined";
    await order.save();
    res.send(`
<div
  style="
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  "
>
  <p
    style="
      font-size: 25px;
      color: rgb(83 83 83);
      margin-bottom: 15px;
      font-weight: 700;
      font-family: monospace, sans-serif;
    "
  >
    Welcome to Lavado
  </p>
  <h1
    style="
      font-size: 36px;
      color: #e83f3f;
      font-weight: bold;
      font-family: monospace, sans-serif;
    "
  >
    your payment has been declined!
  </h1>
</div>

      `);
  } catch (error) {
    console.log({ error });

    res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      oops something went wrong with your payment
    </h1>
  </div>
      `);
  }
};

exports.cancelled = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      oops something went wrong with your payment
    </h1>
  </div>
      `);

    order.status = "cancelled";
    await order.save();
    res.send(`
<div
  style="
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  "
>
  <p
    style="
      font-size: 25px;
      color: rgb(83 83 83);
      margin-bottom: 15px;
      font-weight: 700;
      font-family: monospace, sans-serif;
    "
  >
    Welcome to Lavado
  </p>
  <h1
    style="
      font-size: 36px;
      color: #e83f3f;
      font-weight: bold;
      font-family: monospace, sans-serif;
    "
  >
    your payment has been cancelled!
  </h1>
</div>

      `);
  } catch (error) {
    console.log({ error });

    res.send(`
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <p
      style="
        font-size: 25px;
        color: rgb(83 83 83);
        margin-bottom: 15px;
        font-weight: 700;
        font-family: monospace, sans-serif;
      "
    >
      Welcome to Lavado
    </p>
    <h1
      style="
        font-size: 36px;
        color: #e83f3f;
        font-weight: bold;
        font-family: monospace, sans-serif;
      "
    >
      oops something went wrong with your payment
    </h1>
  </div>
      `);
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = "cancelled";
    order.code = "111111";
    console.log({ order });
    const resp = await axios.post(
      "https://secure.telr.com/gateway/order.json",
      {
        method: "check",
        store: process.env.TELR_STORE_ID,
        authkey: process.env.TELR_STORE_AUTHKEY,
        order: {
          ref: order.ref,
        },
      }
    );
    console.log({ resp: resp.data.order.status });
    if (
      resp.data.order.status.code === -1 ||
      typeof resp.data.order.transaction.ref === "undefined"
    ) {
      return;
    }
    let tarnRef = resp.data.order.transaction.ref;

    request.post(
      {
        url: "https://secure.telr.com/gateway/remote.xml",
        port: 9000,
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
<remote>
    <store>${process.env.TELR_STORE_ID}</store>
    <key>${process.env.TELR_STORE_REMOTEKEY}</key>
    <tran>vPzHD
        <type>sale</type>
        <class>cont</class>
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
          JSON.stringify(body).includes("Authorised")
        ) {
          console.log({ statusCode: response.statusCode, body, order });

          console.log({ order });
        }
        console.log({ order2: order, body: JSON.stringify(body) });
      }
    );
    await order.save();
    res.status(200).send({
      data: order,
      message: "Orders successfully cancelled",
      status: "success",
    });
  } catch (error) {
    console.log({ error });
    res.status(error.status || 500).send({
      message: "Something went wrong. please try again later",
      status: "error",
    });
  }
};
