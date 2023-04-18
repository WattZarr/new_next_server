const User = require('../models/User');
const mongoose = require('mongoose');

const createUser = async (req,res) => {
    const {name,email,role,password} = req.body;

    const user = await User.create({name,email,role,password});
    res.json(user);
}


//login
const login = async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email : email});
    if(!user){
        res.json({msg : "NOK"})
    }
    else{
        if(user.password == password){
            res.json({msg : "OK"});
        }
        else{
            res.json({msg : "NOK"})
        }
    }

}

// get all users
const getAllUsers = async(req,res) => {
    const users = await User.find({});

    res.status(200).json(users);
}

//const delete user
const deleteUser = async(req,res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({msg : "There is no such a user"})
    }
    
    const user = await User.findOneAndDelete({_id : id});
    
    res.status(200).json({msg : "User is Deleted!"});
}

//get single user
const getUser = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({msg : "There is no such a user"})
    }

    const user = await User.findById({_id : id});

    res.status(200).json(user);
}

//edit user
const editUser = async(req,res) => {
    const {id} = req.params;
    const {name,email,password,role} = req.body;

    const user = await User.findOneAndUpdate({_id : id} , {name,email,password,role})

    res.status(200).json(user)
}


module.exports = {createUser, login, getAllUsers, deleteUser, getUser, editUser}