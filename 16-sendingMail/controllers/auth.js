const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendGridTransport(
  {
    auth : {
      api_key : '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' 
    }
  }
))

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email= req.body.email;
  const password= req.body.password;
  const conformPassword= req.body.confirmPassword;
  User.findOne({email:email})
  .then(userDoc =>{
    if(userDoc){
      return res.redirect('/signup');
    }
    return bcrypt.hash(password,12)
    .then(hashPassword=>{
      const user = new User({
        email:email,
        password:hashPassword,
        cart :{
          items:[]
        }
      })
      return user.save();
    })
  }).then(result=>{
    res.redirect('/Login');
    return transport.sendMail({
      to: email,
      from : 'node.shop@nodeshop.com',
      subject : 'Singup succeeded',
      html:'<h1>successfully created new account</h1>'
    }).catch(err=>{
      console.log(err);
    })
  })

  .catch(err=>{
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
