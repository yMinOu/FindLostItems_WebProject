import React, {useState, useRef, useEffect} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import Spinner from './Spinner.gif';
import { Alert } from 'antd';


const { Title } = Typography;
const { TextArea } = Input;

const Catogory = [
    { value: 0, label: "주민등록증" },
    { value: 1, label: "신용카드" },
    { value: 2, label: "운전면허증" },
    { value: 3, label: "학생증" },
]

//get : 조회/ post : 입력, 삽입
// const urlcam = "http://localhost:5000/api/video/filter";
const urlcam = "http://localhost:5000/filter";

//웹캠 사진찍고 글 쓰기 영역
function VideoUploadPage(props) {

    const user = useSelector(state => state.user);

    const [videoTitle, setvideoTitle] = useState("")
    const [Description, setDiscription] =useState("")
    const [CatogoryOptions, setCatogoryOptions] =useState("")
    const [FilePath, setFilePath] = useState("")

    //webcam 사진 관련 
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [camon, setcamon] = useState(false);

    const onTitleChange = (e) =>{
        setvideoTitle(e.currentTarget.value)
    }
    const onDescription = (e) =>{
        setDiscription(e.currentTarget.value)
    }
    const onCatogoryOptions = (e) =>{
        setCatogoryOptions(e.currentTarget.value)
    }

    const webcamRef = useRef();

    //사진 찍기 버튼 누를때 useEffect 생성하기 위한 기능
    const [id, setid] = useState(0);

    useEffect(() => {
        //첫 렌더링 막는 방법 : 버튼 클릭시 변화되는 id값을 조건문에 추가한다..
        if(!camon && id != 0){
        setLoading(true);
        console.log('no')
        console.log(`${id}`)
        const imageSrc = webcamRef.current.getScreenshot();

        axios
            .post(urlcam, { image: imageSrc})
            .then((data) => {

                console.log(data.data.data2send)
                // console.log(typeof(data.data.data2send))
                const obj = JSON.parse(data.data.data2send);
                console.log(obj.max_key);
                console.log(obj.link);
                

            setImage(data.data.image);
            setcamon(true);
            setLoading(false);
            setFilePath(obj.link);
            setCatogoryOptions(obj.max_key);
            }) 
            .catch((err) => console.log(err));
        }

        
    },[id]);
    // const onDrop = (files) =>{
    //     let formData = new FormData;
    //     const config ={
    //         header : {'content-type': 'multipart/form-data'}
    //     }
    //     formData.append("file", files[0])

    //     axios.post('/api/video/uploadfiles', formData, config)
    //         .then(response=>{
    //             if(response.data.success){
    //                 console.log(response.data)
    //                 let variable = {
    //                     url: response.data.path, 
    //                     fileName: response.data.filename
    //                 }
    //                 setDuration(response.data.filename)
    //                 setFilePath(response.data.url)
    //             }else{
    //                 alert('비디오 업로드를 실패했습니다.')
    //             }
    //         })
    // }

    const onSubmit = (e) =>{ 
        e.preventDefault();
        const variables ={
            writer: user.userData._id,
            title: videoTitle,
            description: Description,
            category: CatogoryOptions, 
            filePath : FilePath
        }
        axios.post('/api/video/uploadVideo', variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    message.success('성공적으로 보냈습니다.')
                    props.history.push('/')
                }else{
                    alert('비디오 업로드에 실패 했습니다.')
                }
            })
    }

    const pyImage = useRef();
    const camWidth = window.innerWidth > 600 ? null : window.innerWidth;

    const Loading = () => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <div>잠시만 기다려 주세요.</div> */}
            <img src={Spinner} alt="로딩중" width="5%" style={{
                zIndex: 10,
                position: "absolute",
                bottom: window.innerHeight / 2 - 210,
                background: null,
                // border: "12px solid #1a1a1a",
                // borderRadius: "50%",
                // borderTop: "12px solid #2a2a2a",
                width: "715px",
                height: "555px",
                
              }} />
            {/* <div
              className="Loading"
              style={{
                zIndex: 10,
                position: "absolute",
                bottom: window.innerHeight / 2 - 100,
                background: null,
                border: "12px solid #1a1a1a",
                borderRadius: "50%",
                borderTop: "12px solid #2a2a2a",
                width: "70px",
                height: "70px",
                
              }}
            ></div> */}
          </div>
        );
      };

  return (
    
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        {loading ? <Loading /> : null}
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > 글쓰기 </Title>
        </div>

        { camon ?(
            <>
            <Alert message={CatogoryOptions} type="success" showIcon />
            <img ref={pyImage} src={image} alt="ujin python " />
            
            <div style={{display:"flex", position: "absolute", padding:"85px 0 0 350px"}}>
            <button
                style={{
                border: "none",
                cursor: "pointer",
                position: "absolute",
                zIndex: 10,
                bottom: 50,
                padding: "0.125rem 1rem",
                background: "#c1c1c1",
                borderRadius: "0.25rem",
                }}
                
                onClick={() => {
                setcamon(false);
                setImage(null);
                console.log(11)
                }}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="30"
                viewBox="0 0 24 24"
                fill="#a1a1a1"
                >
                <path d="M13.5 2c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
                </svg>
            </button>
            </div>
            </>
        ) : (
            <>
            <Webcam
            style={{
                width: camWidth,
                position: "relative",
            }}
            audio={false}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/png"
            height={520}
            width={720}
            videoConstraints={{ facingMode: "user" }}

          />
             <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // stateTest()
                    setid(id+1)
                    console.log(33);
                }}
                >
                <div style={{display:"flex", position: "absolute", padding:"85px 0 0 350px"}}>
                <button
                    type="submit"
                    style={{
                        cursor: camon ? "not-allowed" : "pointer",
                        border: "none",
                        position: "absolute",
                        zIndex: 10,
                        bottom: 50,
                        padding: "0.125rem 1rem",
                        background: "#c1c1c1",
                        borderRadius: "0.25rem",
                    }}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#a1a1a1"
                    >
                        <path d="M5 4h-3v-1h3v1zm8 6c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-5v17h-24v-17h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm13 4c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z" />
                    </svg>
                </button>
                
                </div>
            </form>
        </>
        )}

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                {/*Drop zone */}
                {/* <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={1000000000000}>
                {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    )}
                </Dropzone>
                
                {FilePath !== "" &&
                <div width="320" height="24">
                    <img src={`http://localhost:5000/${FilePath}`} width="320" height="240" alt="haha" />
                </div>
                } */}

            </div>
            <br/>
            <br/>

            <label>제목</label>
            <Input
                onChange={onTitleChange}
                value={videoTitle}
            />
            <br/>
            <br/>

            <label>내용</label>
            <Input
                onChange={onDescription}
                value={Description}
            />
            <br/>

            {/* <select onChange={onCatogoryOptions}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
            </select> */}
            
            <br/>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>      
        </Form>    
    </div>
  )

}
export default VideoUploadPage