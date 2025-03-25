const {Expense} = require('../models/centralized');

module.exports = {
    postExpense: async(req,res)=>{
        console.log(req.body)
      const {amount,category,description} = req.body;

      if (!amount || !category || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

      
      try{
        const [result] = await Expense.create({amount : amount , category :category , description:description});

        return res.status(200).json({message:'expense added successfully',result});

      }catch(err){
        console.error('something went wrong when adding expense');
        return res.status(400).json({message:'error while adding expense',err});

      }
    },

    getExpense : async(req,res)=>{
      
    }
}