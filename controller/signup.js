const {User} = require('../models/centralized');

module.exports ={
    addUser :async(req,res)=>{
       const username = req.body.username;
       const email = req.body.useremail;
       const password = req.body.userPass;

       try{
        const [result, created] = await User.findOrCreate({ 
            where: { email: email },
            defaults:{username: username,password:password,email:email }
       });
        if(!created){
            return  res.status(400).json({ message: 'User already exists with the same email' });;
        }
        console.log('data entered in users table',result)
        return res.status(201).json({ message: 'User created successfully', user: result });

       }catch(err){
         console.error('error while entering user data in table',err);
         return res.status(500).json({ message: 'Internal Server Error', error: err });
       }
    },
};