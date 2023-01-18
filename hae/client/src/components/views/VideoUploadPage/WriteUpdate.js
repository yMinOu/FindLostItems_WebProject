import React, { useEffect, useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;



//리폼 영역
function WriteUpdate(props) {

    const user = useSelector(state => state.user);

    const videoId = props.match.params.videoId
    const videoVariable = {
        videoId: videoId
    }

    // const [videoTitle, setvideoTitle] = useState("")
    // const [Description, setDiscription] =useState("")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Video, setVideo] = useState({
        title : '',
        description: '',
    }) 

    // const changeValue = (e) => {
    //     setVideo({
    //       ...Video,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    const changeValue = (e) => {
        setVideo({
          ...Video,
          [e.target.name]: e.target.value,
        });
    };

    // const onTitleChange = (e) =>{
    //     setVideo(e.currentTarget.value)
    // }
    // const onDescription = (e) =>{
    //     setVideo(e.currentTarget.value)
    // }

    useEffect(()=>{
        axios.post('/api/video/getWrite', videoVariable)
            .then(response =>{
                if(response.data.success){
                    console.log(response.data.video)
                    setVideo(response.data.video)  //write은 video.js 에 있는 것.
                }else{
                    alert('사진 정보를 가져오는것을 실패했습니다.')
                }
            })
    }, [])

    const onDrop = (files) =>{
        let formData = new FormData;
        const config ={
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)

                    let variable = {
                        url: response.data.path, 
                        fileName: response.data.filename
                    }
                    setDuration(response.data.filename)
                    setFilePath(response.data.url)

                }else{
                    alert('비디오 업로드를 실패했습니다.')
                }
            })
    }



    const onUpdate = (e) =>{
        e.preventDefault();
        const variables ={
            writer: user.userData._id,
            title: Video.title,
            description: Video.description,
            filePath : FilePath,
            duration : Duration
        }
        axios.post(`/api/video/updateWrite?id=${videoId}`, variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    message.success('수정되었습니다.')
                    props.history.push('/')
                }else{
                    alert('수정에 실패 했습니다.')
                }
            })
    }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > 글쓰기 </Title>
        </div>

        <Form onSubmit={onUpdate}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/*Drop zone */}
                <Dropzone
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
                }
            </div>
            <br/>
            <br/>
            
            <label>Title</label>
            <Input
                // defaultValue={Video.title}

                name="title"
                onChange={changeValue}
                value={Video.title}
                // value={videoTitle}
            />
            <br/>
            <br/>

            <label>내용</label>
            <Input
                
                // defaultValue={Video.description} 이건 render안에 쓸수 없다
                // initData={Video.description}
                name="description"
                onChange={changeValue}
                value={Video.description}
                // value={Description}
            />
            <br/><br/>
            <br/>
            <br/>
            
            <Button type="primary" size="large" onClick={onUpdate}>
                수정하기
            </Button>      
        </Form>    
    </div>
  )
}
export default WriteUpdate