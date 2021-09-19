const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    userName: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      index: { unique: true, sparse: true },
      trim: true,
      lowercase: true,
      minlength: 6,
      maxlength: 255,
    },
    phone: {
      type: String,
      index: { unique: true, sparse: true },
      trim: true,
      minlength: 6,
      maxlength: 16,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],

    confirmationCode: {
      code: {
        type: String,
        required: true,
        unique: true,
      },
      expiration: {
        type: Date,
        required: true,
      },
      type: {
        type: String,
        enum: ['verify', 'reset', 'check', 'expired'],
      },
    },

    pushToken: {
      type: String,
    },
    status: {
      type: String,
      enum: ['rejected', 'pending', 'active'],
      default: 'pending',
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// fire a function before doc saved to db
// schema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model('User', schema);
module.exports = User;
