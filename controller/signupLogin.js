const bcrypt = require('bcrypt');
const {User} = require('../models/centralized');

module.exports ={
    addUser :async(req,res)=>{
       const username = req.body.username;
       const email = req.body.useremail;
       const password = req.body.userPass;

       try{
        const hashedPassword = await bcrypt.hash(password, 10).catch(err => {
            console.error('Error hashing password:', err);
            throw new Error('Failed to hash password');
        });

        const [result, created] = await User.findOrCreate({ 
            where: { email: email },
            defaults:{username: username,password:hashedPassword,email:email }
       });

        if(!created){
            return  res.status(400).json({ message: 'User already exists with the same email' });;
        }
        console.log('data entered in users table',result);

        return res.status(201).json({ message: 'User created successfully', user: result });

       }catch(err){
         console.error('error while entering user data in table',err);
         return res.status(500).json({ message: 'Internal Server Error', error: err });
       }
    },

    loginUser : async(req,res)=>{

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            
            const matchPassword = await bcrypt.compare(password, user.password);

            if (!matchPassword) {
                return res.status(401).json({ message: "Invalid password" });
            }

           return res.status(200).json({ message: "Login successful" });

        } catch (error) {
            console.error(" Error logging in:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};