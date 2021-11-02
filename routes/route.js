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

        return res.json({status : 400, message : "User parameters missing! Adding User Unsuccessful"});
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


// Add an order of an user
router.post("/adduserorder",(req,res)=>{

    const userid = req.body.userid;

    const quantity = req.body.quantity;

    const items = req.body.items;


    var found= db.find(function(user, index) {
        if(user.id == userid)
        {
            return true;
        }        
    });

    if(found===undefined){
        return res.json({status : 400, message : "User id not Found! Try with a different User id"});
    }

    else{

        var ordernumber = 3000 + Math.floor(Math.random() * (1000) + 1);

        var foundorder= found.orders.find(function(order, index) {
            if(order.orderid == ordernumber)
            {
                return true;
            }        
        });

        if(foundorder===undefined){

            if(quantity===undefined || items===undefined ){

                return res.json({status : 400, message : "User's Order parameters missing! Adding User's Order Unsuccessful"});
            }

            else{

                var order = {orderid:ordernumber,quantity:quantity,items:items};

                found.orders.push(order);
        
                return res.json({status : 200, message : "User Order added Successfully",db});

            }

        }

        else{

            return res.json({status : 400, message : "Order Already Exists"});

        }
        
    }

})


// Get all orders of an user
router.get("/getuserorders",(req,res)=>{

    const userid = req.body.userid;


    var found= db.find(function(user, index) {
        if(user.id == userid)
        {
            return true;
        }        
    });

    if(found===undefined){
        return res.json({status : 400, message : "User id not Found! Try with a different User id"});
    }

    else{

            var alluserorders=[];

            alluserorders.push(found.orders);

            return res.json({status : 200, message : "User Orders Found",alluserorders});

        }
    
})


// Update a particular order of an user
router.put("/updateuserorder",(req,res)=>{

    const userid = req.body.userid;

    const orderid = req.body.orderid;

    const quantity = req.body.quantity;

    const items = req.body.items;


    var found= db.find(function(user, index) {
        if(user.id == userid)
        {
            return true;
        }        
    });

    if(found===undefined){
        return res.json({status : 400, message : "User id not Found! Try with a different User id"});
    }

    else{


        var foundorder= found.orders.find(function(order, index) {
            if(order.orderid == orderid)
            {
                return true;
            }        
        });

        if(foundorder===undefined){
            
    
            return res.json({status : 400, message : "User Order Doesn't exists"});
        }

        else{

            if(quantity===undefined || items===undefined){
                return res.json({status : 400, message : "Updating user's order not successful! Parametrs Missing"});
            }

            else{

                foundorder.quantity=quantity;
                foundorder.items=items;
    
                return res.json({status : 200, message : "User's Order Updated Successfully",db});

            }

        }
        
    }

})


// Delete a particular order of an user
router.delete("/deleteuserorder",(req,res)=>{

    const userid = req.body.userid;

    const orderid = req.body.orderid;


    var found= db.find(function(user, index) {
        if(user.id == userid)
        {
            return true;
        }        
    });

    if(found===undefined){
        return res.json({status : 400, message : "User id not Found! Try with a different User id"});
    }

    else{


        var foundorder= found.orders.findIndex(function(order, index) {
            if(order.orderid == orderid)
            {
                return true;
            }        
        });

        if(foundorder===undefined){
            
    
            return res.json({status : 400, message : "User Order Doesn't exists"});
        }

        else{

            found.orders.splice(foundorder, 1);

            return res.json({status : 200, message : "User's Order Deleted Successfully",db});

        }
        
    }

})


module.exports = router;