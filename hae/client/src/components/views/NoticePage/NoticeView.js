// import React, { useEffect, useState } from 'react'
// import {Row , Col, List, Avatar, Card, Typography, Button, PageHeader, Breadcrumb, Layout } from 'antd'
// import axios from 'axios';
// import Comment from './Sections/Comment'
// const { Title } = Typography;
// const { Meta } = Card;
// const { Content} = Layout;

// function NoticeView(props) { 

//   const noticeId = props.match.params.noticeId
//   const noticeVariable = {
//       noticeId: noticeId
//   }
//   const [Notice, setNotice] = useState([]) 

//   useEffect(()=>{
//       axios.post('/api/notice/getWrite', noticeVariable)
//           .then(response =>{
//               if(response.data.success){
//                   console.log(response.data.notice)
//                   setNotice(response.data.notice)  //write은 notice.js 에 있는 것.
//               }else{
//                   alert('사진 정보를 가져오는것을 실패했습니다.')
//               }
//           })
 
//   }, [])

//   return (
//       <Row>
//           <Col lg={13} xs={24}>  {/* 이 클래스의 witdh 가 너무 넓다..*/}
//               <div className="postPage" style={{  padding: '48px 0 48px 60px ' }}>  {/* 3rem 4em*/}

//               <PageHeader
//                   className="site-page-header"
//                   onBack={() => null}
//                   title="이전"
//                   subTitle="이전 화면으로 이동"
//               />

//               <div style={ {padding: '20px 0 10px 100px'} }>
//                   <List.Item
//                       actions
//                   >
//                       <List.Item.Meta
//                           avatar={<Avatar src={Notice.writer && Notice.writer.image } />}
//                       />
//                       {Notice.writer && Notice.writer.nickname}
//                   </List.Item>
//               </div>
//               </div>
//           </Col>
//           <Col lg={8} xs={24}>
//               <div style={{padding: '130px 0px 0px 0px'}}>
//               <Layout
//                   style={{
//                   padding: '0 24px 40px'
//                   }}
//               >
//                   <Breadcrumb
//                   style={{
//                       margin: '32px 0 ',
//                   }}>
//                   <List.Item.Meta
//                           title={<a href="https://ant.design">{Notice.title}</a>} />
//                   </Breadcrumb>
//                   <Content
//                   style={{
//                       padding: 24,
//                       margin: 0,
//                       minHeight: 326,
//                       backgroundColor:'white'
//                   }}>
//                   <List.Item.Meta
//                           description={Notice.description}
//                       />
//                   </Content>
//               </Layout>
//               </div>
//               <div style={{padding: '30px 0px 0px 0px'}}>
//                   <Button type="primary" style={{margin: '0px 20px 0 0'}}>수정</Button>
//                   <Button type="primary" danger>삭제</Button>
//               </div>       
//           </Col>
//           <Comment />
//       </Row>
//   )}


// export default NoticeView




// import React from 'react'
// import { Divider, Tag, Breadcrumb, Layout } from 'antd';

// const { Content } = Layout;

// function NoticeView() {
//   return (
//     <div>
//       <Divider orientation="left"><h1>공지사항</h1></Divider>
//       <div class="wrapper" style={{textAlign:'center'}}>
//         <div class='NoticeTitle' style={{width:'90%',borderTop:'1px solid black',borderBottom:'1px solid black', textAlign:'center', marginTop:'5px', display:'block', margin:'auto'}}>
//         <h2><Tag color="orange" style={{fontSize:'18px', padding:'8px', marginTop:'10px'}}>공지</Tag>공지사항 테스트중 입니다.</h2>
//         </div>
//         <Layout style={{ padding: '0 24px 24px' }}>
//         <Content
//           className="site-layout-background"
//           style={{
//             padding: 24,
//             margin: 0,
//           }}
//         >
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//           공지사항 세부내용입니다.
//         </Content>
//       </Layout>

//       </div>
//     </div>
//   )
// }

// export default NoticeView

import React, { useEffect, useState} from 'react'
import { Divider,Breadcrumb, Layout, Menu, Tag } from 'antd';
import './css/NoticeView.css'
import axios from 'axios';
import Comment from './Sections/Comment'
const { Header, Content, Footer } = Layout;


function NoticeView(props) {

    const noticeId = props.match.params.noticeId
    const variable ={noticeId: noticeId}

    const [NoticeDetail, setNoticeDetail] = useState([])
    const [Comments, setComments] = useState([])

useEffect(() => {

    axios.post('/api/notice/getNoticeDetail', variable)
        .then(response =>{
            if(response.data.success){
                setNoticeDetail(response.data.noticeDetail)
            }else{
                alert('공지사항 정보를 가져오지 못했습니다')
            }
        })


    axios.post('/api/comment/getComments', variable)
      .then(response => {
        if(response.data.success){
          setComments(response.data.comments)

          console.log(response.data.comments)
        }else {
          alert('코멘트 정보를 가져오지 못했습니다')
        }
      })

}, [])

  return (
    <div>
        <Layout className="layout">
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>해달마켓</Breadcrumb.Item>
        <Breadcrumb.Item>공지사항</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content" style={{backgroundColor:'white'}}>
        <h3 style={{textAlign:'center'}}><Tag color="orange" style={{width:'60px',}}>공지</Tag><span>{NoticeDetail.title}</span></h3>
        <Divider orientation="left"></Divider>
        {NoticeDetail.description}
      </div>
    </Content>
    

    <Footer>
      <div style={{backgroundColor:'white', borderRadius:'2px'}}>
        <Comment commentLists={Comments} postId={noticeId}/>
      </div>
    </Footer>
    
  </Layout>
    </div>
  )
}

export default NoticeView