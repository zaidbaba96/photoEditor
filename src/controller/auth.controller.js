const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { Validator } = require('node-input-validator')
exports.register = async (req, res) => {
  const inputValidate = new Validator(req.body, {
    email: 'required|email',
    password: 'required',
    name: 'required|string',
    dob : 'required',
    gender: 'required|string',
    phone: 'required',

  })
  const matched = await inputValidate.check()

  if (!matched) {
    return res.status(422).json({ cause: inputValidate.errors })
  }
  const userExist = await User.findOne({ where: { email: req.body.email } })
  if(!userExist){
    const user = await new User({
      name : req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      gender : req.body.gender,
      phone : req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
      
    })
    user
  .save(user)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
  }
  else{
    res.status(500).send({
      message:
        err.message || "User Already Register"
    });
  }   
};


exports.login = async (req, res) => {
  try{
      const { email , password } = req.body;
      if(!email || !password){
          return res.status(400).json({error :"Plz filled the Data"})
      }   

      const userExits = await User.findOne({email : email})
      if(userExits){
          
          const isMatch = await bcrypt.compare(password , userExits.password)
          
          if(! isMatch){
              res.status(420).json("Invalid  Credential")
          }
          else{
            const jwtToken = jwt.sign({ id: userExits._id, email: userExits.email }, process.env.JWT_TOKEN)
            res.status(200).json({message: "user login Successfully",data: {user :{_id:userExits._id ,name :userExits.name , email :userExits.email},token: jwtToken } })
          }

      }
      else{
          res.status(420).json("Invalid  Credential")
      }
  
}catch (err){
  console.log(err)
}
}