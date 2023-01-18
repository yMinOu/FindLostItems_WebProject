import React, { useEffect, useState } from 'react'
import {Row , Col, List, Avatar, Card, Typography, Button, PageHeader, Breadcrumb, Layout } from 'antd'
import axios from 'axios';
const { Title } = Typography;
const { Meta } = Card;
const { Content} = Layout;
function Writeview(props) {
    
    const videoId = props.match.params.videoId
    const videoVariable = {
        videoId: videoId
    }
    const [Video, setVideo] = useState([]) 

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

    return (
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
                </div>
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
                </Layout>
                </div>
                <div style={{padding: '30px 0px 0px 0px'}}>
                    <Button type="primary" style={{margin: '0px 20px 0 0'}} onClick={onSubmit}>수정</Button>
                    <Button type="primary" danger>삭제</Button>
                </div>       
            </Col>
        </Row>
    )}

export default Writeview