const express = require("express");
const   app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());


//Load Mongoose
const mongoosedb=require("mongoose");
require("./Book");
const Book= mongoosedb.model("Book");

mongoosedb.connect("mongodb://bookuser:Welcome1@ds121311.mlab.com:21311/bookservice",()=>{
    console.log("Database connected")
});


app.get('/',(req,res)=>
{
    res.send("This is our book service V2")
})

//Create func
app.post("/book",(req,res)=>{
    var newBook={
        title:  req.body.title,
        author: req.body.author,
        numberpages:    req.body.numberpages,
        publisher:req.body.publisher
    }
    //create a new book
    var book= new Book(newBook);
    book.save().then(()=>{
        console.log("new book saved")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new book with success")

});


//list func
app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
      //  console.log(books);
        res.json(books);
    }).catch((err)=>{
        if(err)
        {
            throw err;
        }
    })
})

app.get("/book/:id",(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book)
        }else
            res.sendStatus(404);

    }).catch((err)=>{
        if(err)
            throw err;
    })
})

//func delete
app.delete("/book/:id",(req,  res)=>{
    Book.findOneAndRemove(req.params.id).then(()=>{
    res.send("Book removed successfully");
    }).catch((err)=>{
        if(err)
            throw err;
    })
})


app.listen(4545,() =>
{
    console.log("up and runnig... this is books service");

})