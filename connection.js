const express = require('express'), path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs/promises');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'mentor-mentee'
})

app.get('/', (req, res) => {
    res.send("HI");
})

app.post('/createuser', (req, res) => {
    const user_first_name = req.body.user_first_name;
    const user_last_name = req.body.user_last_name;
    const user_city = req.body.user_city;
    const user_state = req.body.user_state;
    const user_country = req.body.user_country;
    const user_gender = req.body.user_gender;
    const user_image = req.body.usrimg;
    const user_date_of_birth = req.body.user_date_of_birth;
    const user_email = req.body.user_email;
    const user_user_name = req.body.user_name_for_site;
    const user_password = req.body.user_password;

    db.query(
        "INSERT INTO users(user_first_name, user_last_name, user_city, user_state, user_country, user_gender, user_date_of_birth, user_email, user_site_name, user_password) VALUES (?,?,?,?,?,?,?,?,?,?)",
        
        [
            user_first_name, 
            user_last_name, 
            user_city, 
            user_state, 
            user_country, 
            user_gender,
            user_date_of_birth, 
            user_email, 
            user_user_name, 
            user_password
        ],
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                res.send("Values Inserted");
            }
        }
    )
});

app.post('/userimage', (req, res) => {
    

    console.log(req.body.id);
    console.log(req.files.uploadedImage);
    const id = req.body.id;
    var file = req.files.uploadedImage;
    var iName = req.body.imageName;
    file.mv('public/images/' + file.name, err => {
        if(err) {
            console.log(err);
        }
    });
    db.query(
        "INSERT INTO users_images(user_id, user_image) VALUES (?, ?)",
        [
            id, 
            iName
        ],
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                console.log(result);
                res.send(result);
            }
        }
    )
});

app.put('/updateuserimage', (req, res) => {
    
    const id = req.body.id;
    var file = req.files.uploadedImage;
    var iName = req.body.imageName;
    var path = '/images/'+req.body.prevImage;
    console.log(req.body.prevImage);
    fs.unlink(path);
    file.mv('public/images/' + file.name, err => {
        if(err) {
            console.log(err);
        }
    });
    db.query(
        "UPDATE users_images SET user_image = '"+iName+"' WHERE user_id = '"+id+"'",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                console.log(result);
                res.send(result);
            }
        }
    )
});

app.put('/updateusername', (req, res) => {
    
    const id = req.body.id;
    var name = req.body.updatedUserName;
    db.query(
        "UPDATE users SET user_site_name = '"+name+"' WHERE user_id = '"+id+"'",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                console.log(result);
                res.send(result);
            }
        }
    )
});

app.put('/updateuserstate', (req, res) => {
    
    const id = req.body.id;
    var state = req.body.updatedUserState;
    db.query(
        "UPDATE users SET user_state = '"+state+"' WHERE user_id = '"+id+"'",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                console.log(result);
                res.send(result);
            }
        }
    )
});

app.put('/updateusercity', (req, res) => {
    
    const id = req.body.id;
    var city = req.body.updatedUserCity;
    db.query(
        "UPDATE users SET user_city = '"+city+"' WHERE user_id = '"+id+"'",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/getuserimage/:id', (req, res) => {
    
    const id = req.params.id;
    console.log(id);
    db.query(
        "SELECT user_image FROM users_images WHERE user_id ='"+id+"'",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                console.log(result);
                res.send(result);
            }
        }
    )
});


app.get('/allusers', (req, res) => {
    

    db.query(
        "SELECT * FROM users",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/alluserrelated', (req, res) => {
    

    db.query(
        "SELECT * FROM userrelated",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/allusersocial', (req, res) => {
    

    db.query(
        "SELECT * FROM user_socials",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.get('/alluserdetails', (req, res) => {
    

    db.query(
        "SELECT * FROM userdetails",
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                // console.log(result);
                res.send(result);
            }
        }
    )
});

app.post('/userrelated', (req, res) => {
    const User = req.body.User;
    const Arts = req.body.Arts;
    const Business = req.body.Business;
    const Economics = req.body.Economics;
    const Education = req.body.Education;
    const Engineering_Technology = req.body.Engineering_Technology;
    const Finance = req.body.Finance;
    const Law = req.body.Law;
    const PublicServices = req.body.PublicServices;
    const LiberalArts = req.body.LiberalArts;
    const Entrepreneur = req.body.Entrepreneur;
    const Medicine = req.body.Medicine;
    const PublicPolicy = req.body.PublicPolicy;
    const SalesMarketing = req.body.SalesMarketing;
    const Science = req.body.Science;
    const Sports = req.body.Sports;
    const Other = req.body.Other;

    db.query(
        "INSERT INTO userrelated(user_id, arts, business, economics, education, enginnering_technology, finance, law, public_services, liberal_arts, entrepreneur, medicine, public_policy, sales_marketing, science, sports, other) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            User, 
            Arts, 
            Business, 
            Economics, 
            Education, 
            Engineering_Technology,  
            Finance,
            Law, 
            PublicServices, 
            LiberalArts, 
            Entrepreneur,
            Medicine,
            PublicPolicy,
            SalesMarketing,
            Science,
            Sports,
            Other
        ],
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                res.send("Values Inserted");
                console.log("Inserted");
            }
        }
    )
});

app.patch('/userdetails', (req, res) => {
    const User = req.body.User;
    const Skills = req.body.Skills;

    db.query(
        "INSERT INTO userdetails(user_id, skills) VALUES (?,?)",
        
        [
            User,
            Skills
        ],
        (error, result) => {
            if(error) {
                console.log(error);
            }else {
                res.send("Values Inserted");
            }
        }
    )
});

app.listen(3001, () => {
    console.log("Backend server has been started");
});