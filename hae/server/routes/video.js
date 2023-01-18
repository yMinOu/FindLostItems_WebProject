const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

//let var const 차이점은?
//var 변수 중복되어도 에러 안뜸/ let은 변수 재할당 가능, consts 는 재할달 재선언 불가능.

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'output/')
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `2.jpg`)
        // cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(2)
        if (ext !== '.jpg') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")
//multer : 파일 업로드 용

router.post("/uploadfiles", (req, res) => {
    //사진을 서버에 저장한다.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        // return res.json({ success: true})
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })

        //filePath: res.req.file.path,
    })
});

//Writeview.js 에서 사용... 근데, exec와 success: 에서는 video인가.. 아님 가져온것을 쓰는 건가..
router.post("/getWrite", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success : true,video })
            
        })
});

router.post("/uploadVideo", (req, res) => {

    const video = new Video(req.body)
    //body는  VideoUploadPage.js 에서 onSubmit에 있는 variables들을 말한다. 

    video.save((err, video) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({success: true })
    })
});

router.post("/updateWrite", (req, res) => {

    Video.updateOne(
        {_id: { $in: req.query.id } },
        //{ "_id" : req.body._id }
        {
            $set : {title: req.body.title, 
                description : req.body.description} }, 

        ).exec((err ) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success : true })
            
        })
});

router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
});

router.delete("/productsDelete",  (req, res) =>{
    Video.deleteOne({ _id: { $in: req.query.id } }).exec();
})


module.exports = router;