const express = require("express");
const   app = express();
const bodyParser = require("body-parser");
const mongoosedb=require("mongoose");
const axios = require("axios");
app.use(bodyParser.json());

mongoosedb.connect("mongodb://orderuser:Welcome1@ds033259.mlab.com:33259/orderservice", (err)=> {
     if (err) throw err;
        else
        console.log('Order Database connected');  
 });


 require("./Order");
 const Order= mongoosedb.model("Order");

//Create func
//Save
app.post("/order",(req,res)=>{
    var newOrder={
        customerid: mongoosedb.Types.ObjectId(req.body.customerid),
        bookid:  mongoosedb.Types.ObjectId(req.body.bookid),
        initialdate:    req.body.initialdate,
        deliverydate:    req.body.deliverydate
    }
    console.log(newOrder);
    //create a new customer
    var order= new Order(newOrder);
    order.save().then(()=>{
        console.log("Order saved")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new order added successfully")

});

//list func
app.get("/orders",(req,res)=>{

    Order.find().then((orders)=>{
      //  console.log(books);
        res.json(orders);
    }).catch((err)=>{
        if(err)
        {
            throw err;
        }
    })
})


app.get("/order/:id",(req,res)=>{
    
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:5050/customer/"+ order.customerid).then((response)=>{
              //  console.log(response);
              var orderObject = {customername:response.data.name,booktitle:''}
              axios.get("http://localhost:4545/book/" + order.bookid).then((response)=>{
                  orderObject.booktitle=response.data.title;
                  res.json(orderObject);
              })
            });


        }else
            res.send("Wrong order id");

    }).catch((err)=>{
        if(err)
            throw err;
    })
})




app.listen(7777,() =>
{
    console.log("up and runnig... this is Order service");

})