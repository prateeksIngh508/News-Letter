//jshint eversion:6
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const fNAME=req.body.fNAME;
  const lNAME=req.body.lNAME;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fNAME,
          LNAME:lNAME
        }
      }
    ]

  };
  const jsonData=JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/a04b114900";
  const options={
    method:"POST",
    auth: "prateek:b63d0895820438d68141d7a8d84261f8-us10"

  };
  const request=https.request(url,options,function(response){
      if(response.statusCode===200)
      {
        res.sendFile(__dirname+"/success.html");
      }
      else
      {
        res.sendFile(__dirname+"/failure.html");
      }
      response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
   request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT ||3000,function(){
  console.log("Server is running on port 3000");
});
//API=b63d0895820438d68141d7a8d84261f8-us10
//list=a04b114900
