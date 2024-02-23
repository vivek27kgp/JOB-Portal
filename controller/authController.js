import userModel from '../models/userModel.js';

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validate
  //   if (!name) {
  //     next('Name is required');
  //   }
  //   if (!email) {
  //     next('Email is required');
  //   }
  //   if (!password) {
  //     next('Password is required');
  //   }

  const existingUser = await userModel.findOne({ email }).select('+password');
  if (existingUser) {
    next('Email Already Registered!');
  } else {
    const user = await userModel.create({ name, email, password });
    user.password = undefined;

    // token
    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: 'User Created Successfully',
      user,
      token,
    });
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    next('Please Provide All Fields');
  }

  // find user by email
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    next('Invalid Username or Password');
  }

  // compare password
  const isMatch = await user.comparePass(password);
  if (!isMatch) {
    next('Invalid Username or Password');
  }

  user.password = undefined;

  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: 'Login Successfully!',
    user,
    token,
  });
};
