const express = require("express");
const router = express.Router();

var db = [];

// Add an user
router.post("/adduser",(req,res)=>{

    const temp=[];

    const name = req.body.name;
    const mobile= req.body.mobile;
    const email = req.body.email;

    const allorders = [];

    var number = 1000 + Math.floor(Math.random() * (200) + 1);

    if(name===undefined || email===undefined || mobile===undefined){

        return res.json({status : 400, message : "User parameters missing! Adding User Unsuccessful",db});
    }

    else{
        var all = {id:number,name:name,mobile:mobile,email:email,orders:allorders};

        db.push(all);
    
        return res.json({status : 200, message : "User added Successfully",db});

    }

})

// Get all users
router.get("/getallusers",(req,res)=>{

    var totalusers = db.length;

    var users =[];

    for(var i=0;i<totalusers;i++){
        users.push(db[i]);
    }

    if(users.length===0){
        return res.json({status : 400, message: " No Users are there in our DB"});
    }

    else{
        return res.json({status : 200, message: "Successful", users});
    }

})



module.exports = router;