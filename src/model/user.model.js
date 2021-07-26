var mongoose=require('mongoose'); 
//     const User = new mongoose.Schema({ 
//       name: {
//         type: Sequelize.STRING,
//         field: 'name',
//         allowNull: true
//       },
//       email: {
//         type: Sequelize.STRING,
//         field: 'email',
//         allowNull: true,
//         unique: true
//       },
//       dob: {
//         type: Sequelize.STRING,
//         field: 'dob',
//         allowNull: true
//       },
//       gender: {
//         type: Sequelize.STRING,
//         field: 'gender',
//         allowNull: true
//       },
//       phone: {
//         type: Sequelize.Number,
//         field: 'phone',
//         allowNull: true
//       },
//       password: {
//         type: Sequelize.STRING,
//         field: 'password',
//         allowNull: true
//       },
      
//     }, { timestamps: false })
  
//     return User
//   }




var Users = new mongoose.Schema({ 
    name  : { type : String , unique : true, required : true, dropDups: true }, 
    email     : { type : String , unique : true, required : true, dropDups: true },
    dob       : { type : String , required : true, dropDups: true},
    gender    : { type : String , required : true, dropDups: true },
    phone   : {type: Number, required: true,},
    password  : { type : String ,  required : true },
    
}); 
  
const User = mongoose.model('User', Users);
module.exports = User