import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

export default function DriversLicense(props) {

    const [Videos, setVideos] = useState([])
    const [category, setcategory] = useState("")

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)


                    
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])
    
    const renderCards = Videos.map((video, index) => {
        // console.log(`${video.category}`)

       if(`${video.category}` == "운전면허증" ){
                return <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/wirteview/${video._id}`} >
                    <img width="200" height="160" alt="filePath" src={`http://localhost:5000/${video.filePath}`} />
                    </a>
                </div><br />
                <Meta                
                    title={video.title}
                />
                <span>{video.writer.nickname} </span><br />
                <span style={{ marginLeft: '3rem' }}> {video.views} 조회수</span>
                - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
                </Col>  
       }

    })
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
    <Title level={2} > 운전면허증 </Title>
    <hr />

    <Row gutter={16}>
        {renderCards}
    </Row>

</div>
  )
}
