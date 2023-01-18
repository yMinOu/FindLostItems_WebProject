import React, { useEffect, useState } from 'react'
import {Row , Col, List, Avatar, Card, Typography, Button, PageHeader, Breadcrumb, Layout, message } from 'antd'
import axios from 'axios';
import { useSelector } from "react-redux";
import Comment from './Comment';

const { Title } = Typography;
const { Meta } = Card;
const { Content} = Layout;

function Writeview(props) {
    const user = useSelector(state => state.user)
    
    const videoId = props.match.params.videoId
    const videoVariable = {
        videoId: videoId
    }
    const [Video, setVideo] = useState([]) 
    const [User, setUser] = useState([]) 
    const [Comments, setComments] = useState([])

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

        axios.post('/api/comment/getComments', videoVariable)
        .then(response=>{
            if(response.data.success){
                console.log('response.data.comments',response.data.comments)
                setComments(response.data.comments)
            }else{
                alert('코멘트 정보를 가져오는 것을 실패하였습니다.')
            }

        })

        axios.post('/api/users/getWriteuser')
        .then(response =>{
            if(response.data.success){
                console.log(response.data.user)
                setUser(response.data.user)  
            }else{
                alert('아이디를 가져오는것을 실패했습니다.')
            }
        })
    }, [])

    // console.log(Video.writer)
    //         console.log('ddd')
    // console.log(user.userData)

    // console.log(user.userData._id) 이건 안됨..

    const handleDelete = () => {

        //모든 사람이 삭제가 가능하다. 글쓴 사람만 삭제하게 할려면..?
        if ( user.userData._id == Video.writer._id   ){        //Video.writer == ?

            axios.delete(`/api/video/productsDelete?id=${videoId}`)
            message.success('성공적으로 보냈습니다.')

            // .then(alert("삭제 완료"));
            props.history.push("/");
        } else{
            message.warning('삭제 불가능, 로그인해주세요')
        }
    }

    const handleUpdate = () => {
        if ( user.userData._id == Video.writer._id   ){      
            // axios.update(`/api/video/Update?id=${videoId}`) 
            props.history.push( `/write/update/${videoId}`);
        } else{
            message.warning("수정 불가능, 로그인해주세요")
        }
    }

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    return (
        <div>

        <Row>
            <Col lg={13} xs={24}>  {/* 이 클래스의 witdh 가 너무 넓다..*/}
                <div className="postPage" style={{  padding: '48px 0 48px 60px ' }}>  {/* 3rem 4em*/}

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="이전"
                    subTitle="이전 화면으로 이동"
                />
                <div style={ {padding: '20px 0 10px 100px'} }>
                    <img width="450" height="450" alt="filePath" src={`http://localhost:5000/${Video.filePath}`} />
                
                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={Video.writer && Video.writer.image } />}
                        />
                    </List.Item>
                    <span>{Video.writer && Video.writer.nickname}</span>
                </div>

                {/* Comments */}
                <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
                </div>
            </Col>
            <Col lg={8} xs={24}>
                <div style={{padding: '130px 0px 0px 0px'}}>
                <Layout
                    style={{
                    padding: '0 24px 40px'
                    }}
                >
                    <Breadcrumb
                    style={{
                        margin: '32px 0 ',
                    }}>
                    <List.Item.Meta
                            title={<a href="https://ant.design">{Video.title}</a>} />
                    </Breadcrumb>
                    <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 326,
                        backgroundColor:'white'
                    }}>
                    <List.Item.Meta
                            description={Video.description}
                        />
                    </Content>
                    {/* <Content
                    style={{
                   
                        margin: 0,
                        padding: '0 24px 40px',
                        backgroundColor:'white'
                    }}>
                    <List.Item.Meta
                            title = "가격 : 10000원"                        />
                    </Content> */}
                </Layout>
                </div>
                <div style={{padding: '30px 0px 0px 0px'}}>
                    <Button type="primary" style={{margin: '0px 20px 0 0'}}  onClick={handleUpdate}>수정</Button>
                    <Button type="primary" danger onClick={handleDelete}>삭제</Button>
                    {/* <Button type="primary" style={{margin: '0px 0px 0 145px'}} >채팅하기</Button> */}



                </div>    
                
                
            </Col>
        </Row>

      
        </div>
        
    )
    
    // if (Video.writer) {
    //     return (
    //         <Row>
    //             <Col lg={18} xs={24}>
    //                 <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
    //                 <div style={ {padding: '20px 0 10px 100px'} }>
    //                     <img width="450" height="450" alt="filePath" src={`http://localhost:5000/${Video.filePath}`} />
    //                 </div>
    //                     <List.Item
    //                         actions
    //                     >
    //                         <List.Item.Meta
    //                             avatar={<Avatar src={Video.writer && Video.writer.image} />}
    //                             title={<a href="https://ant.design">{Video.title}</a>}
    //                             description={Video.description}
    //                         />
    //                         <div></div>
    //                     </List.Item>
    //                 </div>
    //             </Col>
    //             <Col lg={6} xs={24}>
    //             SideVideo
    //             <Button type="primary">Primary Button</Button>
    //             </Col>
    //         </Row>
    //     )
    // } else {
    //     return (
    //         <div>Loading...</div>
    //     )
    // }
}

export default Writeview