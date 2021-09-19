const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const permissionRoutes = require('./routes/permission');
const serviceRoutes = require('./routes/service');
const planRoutes = require('./routes/plan');
const buildingRoutes = require('./routes/building');
const cityRoutes = require('./routes/city');
const carRoutes = require('./routes/car');
const orderRoutes = require('./routes/order');
const scheduledWashRoutes = require('./routes/scheduledWash');
const fileRoutes = require('./routes/file');
const notificationRoutes = require('./routes/notification');
const paymentRoutes = require('./routes/payment');
const introRoutes = require('./routes/intro');
const statisticRoutes = require('./routes/statistic');
const mongoose = require('mongoose');
require('dotenv').config();

let MONGO_URI;
if (process.env.NODE_ENV === 'production') {
  MONGO_URI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
} else {
  MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.c12jf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&ssl=true`;
}

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose
  .connect(
    'mongodb+srv://admin:wJmWmnkbA1To7Tpl@cluster0.c12jf.mongodb.net/car-wash-prod?retryWrites=true&w=majority&ssl=true',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());

app.use('/uploads', express.static('uploads'));

require('./autoSchedule');
require('./listenExpiration');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/scheduled-wash', scheduledWashRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/intro', introRoutes);
app.use('/api/statistics', statisticRoutes);

//Set static folder
// if (process.env.NODE_ENV === 'production') {
app.use(express.static(__dirname + '/client/build'));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
// }

// ----------- ERRORS -----------//
app.use(function (req, res, next) {
  return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  return res.status(500).send({ error: err });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
