const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const fs = require("fs");
const { spawn } = require("child_process");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/comment', require('./routes/comment'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));
app.use('/output', express.static('output'));


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});


app.post("/filter", (req, res) => {
  // Extracting Image from Client
  const body = req.body;
  // Removing Header from base64 string [header,image] = base64 image
  const base64Image = req.body.image.split(";base64,").pop();
  // Saving Image to Disk
  fs.writeFileSync("uploads/1.jpg", base64Image, { encoding: "base64" });

  // for extracting data from the callback inside py.stdout.on() in line 15
  var data2send;

  //taemin2에서는 되는데 왜 여기서는 이걸 추가해야 파이썬 코드가 돌아갈까!?
	var spawn = require("child_process").spawn;

  // creating a python child process
  const py = spawn("python3", ["server/uc.py"]);

  // when python prints data onto the console
  py.stdout.on("data", function (data) {
    data2send = data.toString();
  });

  // // when the python child process ends
  py.on("close", (code) => {

    console.log(data2send)

    const obj = JSON.parse(data2send);
    // console.log(obj.link);

    // Adding Heading and converting image to base64
    const  image = `data:image/jpg;base64,${fs.readFileSync(obj.link, {
      encoding: "base64",
    })}`;

    // var image;

    // if(obj.max_key == "학생증") {
    //   image = `data:image/jpg;base64,${fs.readFileSync("output/card/dd/1.jpg", {
    //     encoding: "base64",
    //   })}`;
    // } else if(obj.max_key == "주민등록증") {
    //   image = `data:image/jpg;base64,${fs.readFileSync("output/card/주민등록증/1.jpg", {
    //     encoding: "base64",
    //   })}`;
    // }  else if(obj.max_key == "신용_체크카드") {
    //   image = `data:image/jpg;base64,${fs.readFileSync("output/card/신용카드/1.jpg", {
    //     encoding: "base64",
    //   })}`;
    // }  

    // sending image to client
    // res.json({ });
    res.json({ image, data2send });

  });

});

//python 에서  max_key 값을 받와 와서 여기서 그 경로를 열고, 프론트에서 열고 프론트에서 띄운다..?
//유진이의 결과값 맞추기 -> 카테고리에 따라서 사진 올리기..?
//특정 select에서 카테고리가 ~~일때 일치할때만 map 가져오기.