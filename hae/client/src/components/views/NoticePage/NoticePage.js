
import React, {useEffect, useState}from 'react'
import { Divider, List, Typography, Tag } from 'antd';
import axios from 'axios';


const data = [
    '공지사항',
    '이벤트 ',
    '품목 관련 공지사항',
    '이용해 주시는 여러분들께',
    ];

const data1 = [
    '※※기본 이용수칙※※',
    '7월 22일  서버 긴급점검',
    '허위 게시글 및 불법 광고글 모니터링 강화 안내'
    ];

function NoticePage(props){
    const noticeId = props.match.params.noticeId
    const noticeVariable = {
        noticeId : noticeId
    }

    const [Notice, setNotice] = useState([])

    useEffect(() => {
        axios.get('/api/notice/getNotice', noticeVariable)
            .then(response =>{
                if(response.data.success){
                    console.log(response.data.notice)
                    setNotice(response.data.notice)
                }else{
                    alert('Failed to get Data')
                }
            })
    },[])


    return (
        <div>
            <Divider orientation="left"><h1>공지사항</h1></Divider>
           
            <List
                size="large"
                header={<div> 
                    <List
                    size="large"
                    bordered
                    dataSource={data1}
                    renderItem={item => <List.Item><Tag color="red">중요 / 필독</Tag>{item}</List.Item>}
                />
                </div>}
                bordered
                dataSource={data}
                renderItem={item => <List.Item><Tag color="orange">공지</Tag>{item}</List.Item>}
            />
        </div>
    )
}


export default NoticePage