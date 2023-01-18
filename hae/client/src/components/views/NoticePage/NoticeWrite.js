import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon, Cascader, Divider } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";

const options = [
    {
      value: '0',
      label: '공지'
    },
    {
      value: '1',
      label: '긴급 / 필독'
    },
  ];
  

const onChange = (value) => {
    console.log(value);
};

const { Title } = Typography;
const { TextArea } = Input;

function NoticeWrite(props) {
    const user = useSelector(state => state.user);

    const [NoticeTitle, setNoticeTitle] = useState("")
    const [Description, setDescription] =useState("")
    const [Emergency, setEmergency] = useState("")
   

    const onTitleChange = (e) =>{
        setNoticeTitle(e.currentTarget.value)
    }
    const onDescription = (e) =>{
        setDescription(e.currentTarget.value)
    }
    const onEmergency = (e) =>{
        setEmergency(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        const variables ={
            title: NoticeTitle,
            writer: user.userData._id,
            emergency: Emergency,
            description: Description,
            // privacy: Private,
            // category: Catogory,
        }
        axios.post('/api/notice/uploadNotice', variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    message.success('성공적으로 보냈습니다.')

                    props.history.push('/')

                }else{
                    alert('공지 등록에 실패 했습니다.')
                }
            })
    }
  return (
    <div>
        <Divider orientation="left"><h1>공지사항</h1></Divider>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > 글쓰기 </Title>
            </div>


            <Form onSubmit={onSubmit}>
                <br/>
                <br/>
                
                <label>제목</label><br />
                <Cascader
                 options={options} 
                 onChange={onChange} placeholder="Please select" style={{width:'18%'}}/>
                <Input
                    onChange={onTitleChange}
                    value={NoticeTitle}
                    style={{width:'81%', marginLeft:'7px'}}
                />
               
                <br/>
                <br/>
                <label>내용</label>
                <TextArea
                    onChange={onDescription}
                    value={Description}
                    rows={6}
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
                    등록
                </Button>
                



            </Form>
        
        </div>
    </div>
  )
}

export default NoticeWrite