var express = require("express");
var router = express.Router();
const axios = require("axios").default;
var MongoClient = require('mongodb').MongoClient;



/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("home.html", {
    root: "C:\\Users\\Ruchi Patel\\Downloads\\530finalproject\\myapp\\views\\",
  });
});

//** POST REQUEST */
router.post("/", function (req, res, next) {
  console.log("received post from ajax");
  console.log(req.body.city);
  var requestedcity = req.body.city;
  var citychoice = ["toronto", "manhattan", "rio de janeiro", "monte video", "paris", "berlin", "rome", "cairo", "seoul", "shanghai", "tokyo"];
  var check = citychoice.includes(requestedcity.toLowerCase());
  var requestedcityfinal;

  if (check == true) {
    requestedcityfinal = requestedcity;
  }
  else{

    console.log("Sorry, the city is not avaliable");
    res.status(401).send({success: false, error: {message: "city not found"}}); 

  }

  var x;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${requestedcityfinal}&units=metric&appid=0fe37647bf3c4095418a1c5392bb60cc`
    )
    .then((res2) => {
      console.log("got weather data");
      console.log(res2.data);
      x = res2;
      MongoClient.connect('mongodb+srv://ryerson:123456a@cluster0.sqfnr.mongodb.net/mydb?retryWrites=true&w=majority', function (err, client) {
        if (err) throw err
        var db=client.db('mydb');
        var weatherdata = {
          City: requestedcity,
          CurrentTemp: res2.data.main.temp,
          Longitude: res2.data.coord.lon,
          Latitude: res2.data.coord.lat,
          Overview: res2.data.weather[0].main,
          Description: res2.data.weather[0].description,
          Feellike: res2.data.main.feels_like,
          MinTemp: res2.data.main.temp_min,
          MaxTemp: res2.data.main.temp_max,
          Humidity: res2.data.main.humidity,
          Pressure: res2.data.main.pressure,
          WindSpeed: res2.data.wind.speed,
          WindGust: res2.data.wind.gust
        }
        db.collection('weatherdata').insertOne(weatherdata, (err, formres) => {
          if (err) {
              console.log(err);
          }
          
      })
    })
      res.status(200).send(res2.data);
      // console.log(typeof(JSON.stringify(x)));
      // x = JSON.stringify(res2.data);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.sendFile("test.html", {
  //   root: "C:\\Users\\meetp\\Documents\\Tutoring\\Ruchi\\FinalProject\\weatherapp\\views\\",
  // });
  
});



router.post("/login", function (req, res, next) {
  console.log("received post from ajax");
  console.log(req.body.email);
  console.log(req.body.password);

  MongoClient.connect('mongodb+srv://ryerson:123456a@cluster0.sqfnr.mongodb.net/mydb?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err
  var db=client.db('mydb');

  // db.collection('books').find().toArray(function (err, result) {
  //   if (err) throw err

  //   console.log(result)
  // })
  db.collection('userdata').findOne({ email: req.body.email}, (err, formres) => {
    if (err) {
        console.log(err);
    }
    if (formres && formres.password === req.body.password){
      console.log('User and password is correct')
      res.sendFile("test.html", {
        root: "C:\\Users\\Ruchi Patel\\Downloads\\530finalproject\\myapp\\views\\",
      });
    } else {
      console.log("Credentials wrong");
      res.status(401).send({success: false, error: {message: "incorrect credentials"}}); 
    }
})
})



  // var requestedcity = req.body.city;

});

module.exports = router;
