import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import { CKEditor } from 'ckeditor4-react';

const { Title } = Typography;
const { TextArea } = Input;

// const PrivateOptions = [ 
//     { value: 0, label: 'Private' },
//     { value: 1, label: 'Public' }
// ]

// const CatogoryOptions = [
//     { value: 0, label: "Film & Animation" },
//     { value: 1, label: "Autos & Vehicles" },
//     { value: 2, label: "Music" },
//     { value: 3, label: "Pets & Animals" },
//     { value: 4, label: "Sports" },
// ]

function SharingUploadPage(props) {

    
    const user = useSelector(state => state.user);

    const [videoTitle, setvideoTitle] = useState("")
    const [Description, setDiscription] =useState("")
    const [Price, setPrice] =useState("")
    // const [Private, setPrivate] =useState(0)
    // const [Catogory, setCatogory] = useState("Film & Animation")

    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
   

    const onTitleChange = (e) =>{
        setvideoTitle(e.currentTarget.value)
    }
    const onDescription = (e) =>{
        setDiscription(e.currentTarget.value)
    }
    const onPrice = (e) =>{
        setPrice(e.currentTarget.value)
    }

    // const onPrivateChange = (e) =>{
    //     setPrivate(e.currentTarget.value)
    // }
    // const onCategoryChange = (e) =>{
    //     setCatogory(e.currentTarget.value)
    // }

    const onDrop = (files) =>{
        let formData = new FormData;
        const config ={
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        // const response = await apiClient.post('brand/logo_image', formData);
        //setLogoLoading(false);

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

    const onSubmit = (e) =>{ 
        e.preventDefault();
        const variables ={
            writer: user.userData._id,
            title: videoTitle,
            description: Description,
            // privacy: Private, 
            // category: Catogory, 
            filePath : FilePath,
            duration : Duration
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

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > 글쓰기 </Title>
        </div>


        <Form onSubmit={onSubmit}>
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
                onChange={onTitleChange}
                value={videoTitle}
            />
            <br/>
            <br/>


            <label>나눔 내용</label>
            <CKEditor
                initData={<p>Hello from CKEditor 4!</p>}
                onInstanceReady={ () => {
                    // alert( 'Editor is ready!' );
                } }
                onChange={onDescription}
                value={Description}
            />
            <br/>
            <br/>


{/* 나눔에서는 필요없고 리폼에서는 필요함  */}
            <label>가격</label>
            <TextArea
                onChange={onPrice}
                value={Price}
            />
            <br/>
            <br/>

            {/* <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            <br/>
            <br/>
            
            <select onChange={onCategoryChange}>
                {CatogoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select> */}

            <br/>
            <br/>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>      
        </Form>    
    </div>
  )
}
export default SharingUploadPage