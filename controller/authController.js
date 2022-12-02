// you must learn about bcrypt
// you must learn about otp-generator
// you must learn about nodemailer


const { sendMail } = require('../service/mail');
const User = require('../model/User');
const { generateOTP } = require('../service/otp');
const { encrypt, compare } = require("../service/crypto")

module.exports.signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }
  // create new user
  const newUser = await createUser(name, email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};


const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};


const createUser = async (name, email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};







module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};


const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  // findByIdAndDelete
  // findByIdAndRemove
  //findByIdAndUpdate
  //replaceOne
  //remove
  //mapReduce
  //updateMany
  //insertMany
  //findOne
  //findById
  //deleteMany
  //deleteOne
  //

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};



module.exports.cosmoDBStorage = async (req, res) => {
  console.log('cosmoDB')
};


module.exports.blobStorage = async (req, res) => {
  console.log('blobStorage')
};