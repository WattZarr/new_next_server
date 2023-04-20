const Course = require('../models/Course');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const path = require('path');

//get all course
const getAllCourse = async(req,res) =>{
    const course = await Course.find({});
    res.status(200).json(course);
}


//get single course
const getCourse = async(req,res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({msg : "There is no such a Course"})
    }

    const course = await Course.findById({_id:id})

    res.status(200).json(course);


}

//delete Course
const deleteCourse = async(req,res) => {
    const {id} = req.params;

    const courseData = await Course.findById({_id:id});
    const imageData = courseData.image;
    const directoryPath = path.join(__dirname, "../upload/");

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     res.status(404).json({msg : "There is no such a course"})
    // }

    // const course = await Course.findOneAndDelete({_id : id});
    // fs.unlink(directoryPath+imageData, (err) => {
    //     if (err) {
    //         console.log(err);
    //       }
    //       console.log("Success");
    // });

    console.log(directoryPath,imageData);

    //res.status(200).json({msg : "Course is Deleted!"});
    res.json({directoryPath})
}

//edit course
const editCourse = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({msg : "There is no such a course"})
    }

    res.json(id);
}

module.exports = {getAllCourse, getCourse, deleteCourse, editCourse}