require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose")
const app = express();
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors')




app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(cors());




mongoose.connect("mongodb://127.0.0.1:27017/ManagementSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected Sucessfully");
})


const adminSchema = new mongoose.Schema({
    name: String,
    password: String,

})


const attendanceSchema = new mongoose.Schema({
    eid: String,
    status: String,
    date: Date,
});


const userSchema = new mongoose.Schema({
    eid: String,
    name: String,
    email: String,
    password: String,
    role: String,
    salary: String,
    joiningdate: String,
    status: String,
    gender: String,
    cnic: String,
});

const projectSchema = new mongoose.Schema({
    clientname: String,
    projectname: String,
    projecttype: String,
    eid: String,
    startdate: String,
    enddate: String,
    status: String,
})



const User = new mongoose.model("user", userSchema);
const Attendance = new mongoose.model("attendance", attendanceSchema)
const Project = new mongoose.model("project", projectSchema)
const Admin = new mongoose.model("admin", adminSchema)


// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // Pass to next layer of middleware
//     next();
// });

app.get('/', (req, res) => {
    res.redirect('/login')
});


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/dashboard', async (req, res) => {
    const data = await User.find({});
    res.render('dashboard', { users: data })

});

app.get('/assign-project/:id', (req, res) => {
    res.render('assign-project', { id: req.params.id });
});

app.get('/add-user', (req, res) => {
    res.render('add-user');
});

app.get('/project-progress/:id', async (req, res) => {

    const projects = await Project.find({ eid: req.params.id });
    console.log(projects);
    res.render('project-progress', { id: req.params.id, users: projects });
});

app.get('/attendance/:id', async (req, res) => {
    console.log(req.params.id);
    const date = moment().format();
    console.log(date)
    const attendanceData = await Attendance.find({ eid: req.params.id });

    console.log(attendanceData, 'attendacne data')
    res.render('attendance', { id: req.params.id, date: date, data: attendanceData });
});

app.get('/update-user/:id', async (req, res) => {

    const user = await User.findOne({ eid: req.params.id });
    console.log(user, 'prinitng from userupdate');
    res.render('update-user', { user: user });
});

app.get('/api/status/:id', async (req, res) => {
    const search = await Project.findOne({ _id: req.params.id });
    console.log(search, 'prinitng from search');
    res.render('projectupdate', { find: search });
});

// API's   
//UserRoutes React Frontend

// const authenticate = async(req,res,next )=>{
//     try{
//         const token = req.cookies.token;
//         const verifyToken = jwt.verify(token,"secret");
//         const rootuser = await User.findOne({eid:eid})

//     }catch(err){
//         res.status(401).send("Unauthorized No Token Provided");
//         console.log(err)
//     }
// }

// app.post('/user/login',async (req,res)=>{

//     console.log("find? " +req.body);
// })

app.get('/user/dashboard', async (req, res) => {

    const project = await Project.find({eid:'1212'});
    console.log(project);
    console.log(typeof(project));
    res.json([...project]);
});


app.get('/user/attedance', async(req,res)=>{
    const attendances = await Attendance.find({eid: '12121'});
    console.log(attendances);
    console.log(typeof(attendances));
    res.json([...attendances])
});



// app.get('/data', authenticateToken, async (req, res) => {
//     console.log(req.user.eid, 'from1')

//     const tokenUser = await User.findOne({ eid: req.user.eid });
//     console.log(tokenUser, 'from2');
//     res.send("hello")


// });

// app.post("/userlogin", (req, res) => {
//     const eid = req.body.eid;
//     const user = { eid: eid }
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//     res.json({ accessToken: accessToken });
//     console.log(user, 'from user');
// })


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split('')[1]
//     if (token == null) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         console.log(user, 'from authentication');
//         next();
//     });
// }

//Admin Routes Nodejs Frontend
// app.post("/login", async (req, res) => {
//     // console.log(req.body);
//     const { username, password, access } = req.body
//     console.log(username, password, access);
//     Admin.findOne({ name: username }, (err, user) => {
//         if (user) {
//             if (password === user.password) {
//                 res.redirect('/dashboard',)
//             } else {
//                 res.send({ message: "Password didn't match" })
//             }
//         } else {
//             res.send({ message: "User not registered" })
//         }
//     });

// });

app.post("/login", async (req, res) => {
    try {
            const { username, password } = req.body
            if (!username || !password) 
                return res.status(400).json({
                    errorMessage: "Please enter all requiredfield"
                });
    
            const existingUser = await Admin.findOne({ username });
            if (!existingUser) 
                return res.status(401).json({
                    errorMessage: " !existingUser Wrong userName or Passward"
                });
            
            if (!password) 
                return res.status(401).json({
                    errorMessage: "!password Wrong userName or Passward"
                });
            
                if (existingUser || password  ) {
                    // res.redirect('/dashboard',)
                    //     console.log(password);
    // console.log(existingUser);
                }
        
        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        res.cookie( "token", token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        console.error(err);
        err.status(500).send();
    }

});

app.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        console.error(err);
        res.json(false)
        console.log(error)
    }
})
app.post('/api/users', async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    console.log("find? " + req.body)
    // new user
    const user = new User({
        eid: req.body.empid,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        salary: req.body.salary,
        joiningdate: req.body.date,
        cnic: req.body.cnic,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
});

app.post('/api/asign-project', (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    console.log(req.body)
    const project = new Project({
        eid: req.body.empid,
        clientname: req.body.clientname,
        projectname: req.body.project,
        projecttype: req.body.type,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        status: req.body.status,
    });
    // save user in the database
    project
        .save(project)
        .then(data => {
            //res.send(data)
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
});


app.post('/api/attendance', (req, res) => {
    const attend = req.body;
    const attendance = new Attendance({
        eid: req.body.empid,
        status: Object.keys(attend)[2],
        date: Date(req.body.date)
    });
    attendance
        .save(attendance)
        .then(data => {
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "SOme error occured"
            });
        });
});

app.post('/api/history', async (req, res) => {

    const final = await Attendance.find({
        date: {
            $lt: Date(req.body.end)
        }
    })
    console.log(final, "prinitng date")
});

app.post('/api/update/:id', async (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const id = req.params.id;
    console.log(id)
    User.findOneAndUpdate({ _id: id }, {
        eid: req.body.empid,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        gender: req.body.gender,
        status: req.body.status,
        salary: req.body.salary,
        data: req.body.date,
        cnic: req.body.cnic,
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        });
    console.log(req.body, 'from update');
});

app.get('/api/delete/:id', async (req, res) => {
    console.log(req.params.id, 'from delete');
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    User.deleteOne({ eid: req.params.id })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.redirect('/dashboard');
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        });
});

app.post('/api/status/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body);
    Project.findOneAndUpdate({ _id: req.params.id }, {
        status: req.body.status
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.redirect('/dashboard');
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        });
});

app.listen(9002, () => {
    console.log("BE started at port 9002")
});