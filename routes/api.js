const express = require('express');
const { getAllCourse, getCourse, deleteCourse, editCourse } = require('../controllers/courseController');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course');
const Register = require('../models/Register');
const path = require('path')
const fs = require('fs');
const { createUser, login, getAllUsers, deleteUser, getUser, editUser } = require('../controllers/userController');
const { log } = require('console');

//register api
// register course
const registerStorage = multer.diskStorage({
    destination:'register/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});

const registerUpload = multer({storage:registerStorage});
router.post('/register' , registerUpload.single('transaction') , async(req,res) => {
    const data = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        education : req.body.education,
        course : req.body.course,
        transaction : req.file.filename
    }

    const register = Register.create(data);

    res.status(200);
})

//get all data about register course
router.get('/register-info' , async(req,res) => {
    const data = await Register.find({});

    res.status(200).json(data);
})

//delete register
router.delete('/delete-register/:id' , async(req,res) => {
    const {id} = req.params;
    
    const register = await Register.findOneAndDelete({_id : id});

    res.status(200).json({msg : "Registration is Deleted Successfully"})
})

//user apis

//login 
router.post('/login', login);

//get uesrs
router.get('/users', getAllUsers);

//create user
router.post('/create-user', createUser)

//delete users
router.delete('/:id' , deleteUser)

//get single user
router.get('/get-user/:id' , getUser)

//edit user
router.patch('/edit-user/:id' , editUser)


//course apis
//get all courses
router.get('/', getAllCourse);

//get a single course
router.get('/:id',getCourse)

//delete course
router.delete('/:id', deleteCourse)


//create course
const storage = multer.diskStorage({
    destination:'upload/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});

const upload = multer({storage:storage});

router.post('/create-course', upload.single('image'), async (req, res) => {
        const data = {
            title : req.body.title,
            duration : req.body.duration,
            level : req.body.level,
            price : req.body.price,
            image : req.file.filename
        };

        const course = Course.create(data);

        res.status(200);
  });

//edit course
router.patch('/:id', upload.single('image'),async (req,res) => {
    const {id} = req.params;
    let data ={};
    const directoryPath = path.join(__dirname, "../upload/");
    const courseData = await Course.findById({_id:id});
    const imageData = courseData.image;

    if(req.file){
        data = {
            title : req.body.title,
            duration : req.body.duration,
            level : req.body.level,
            price : req.body.price,
            image : req.file.filename
        };

        fs.unlink(directoryPath+imageData, (err) => {
            if (err) {
                console.log(err);
              }
              console.log("Success");
        });
    

    }
    else{
        data = {
            title : req.body.title,
            duration : req.body.duration,
            level : req.body.level,
            price : req.body.price,
            image : req.body.image
                };
    }

    const course = await Course.findByIdAndUpdate({_id:id} , {
        ...data
    });

    res.json(course)
});



module.exports = router;