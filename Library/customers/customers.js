const express = require("express");
const   app = express();
const bodyParser = require("body-parser");
//Load Mongoose
const mongoosedb=require("mongoose");

app.use(bodyParser.json());


require("./customer");
const Customer= mongoosedb.model("Customer");

mongoosedb.connect("mongodb://customeruser:Welcome1@ds131763.mlab.com:31763/customerservice", (err)=> {
     if (err) throw err;
        else
        console.log('cust Database connected');  
 });


app.get('/',(req,res)=>
{
    res.send("This is our customer service V1")
})

//Create func
//Save
app.post("/customer",(req,res)=>{
    var newCustomer={
        name:  req.body.name,
        age:  req.body.age,
        address:    req.body.address
    }
    console.log(newCustomer);
    //create a new customer
    var customer= new Customer(newCustomer);
    customer.save().then(()=>{
        console.log("Customer saved")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new customer added successfully")

});


//list func
app.get("/customers",(req,res)=>{
    Customer.find().then((customers)=>{
      //  console.log(books);
        res.json(customers);
    }).catch((err)=>{
        if(err)
        {
            throw err;
        }
    })
})

app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer);
        }else
            res.send("Wrong customer id");

    }).catch((err)=>{
        if(err)
            throw err;
    })
})

//func delete



app.listen(5050,() =>
{
    console.log("up and runnig... this is Customer service");

})