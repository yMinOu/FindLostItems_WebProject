import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyCommmet from './ReplyCommmet'

function Comment(props) {
    
    const videoId = props.postId
    const user = useSelector(state => state.user);
    //user= redux에 있는 user안에 userData를 가져온것이다.  

    const [commentValue, setcomment] = useState("")

    const handleChange = (event) =>{
        setcomment(event.currentTarget.value)
    }

    const onSubmit = (event)=>{
        event.preventDefault();  //오타실수로 계속 새로고침됨..preventDefalut : 근데 오류 안남 ㅋㅋ

        const variables ={
            content : commentValue,
            writer : user.userData._id,
            //이번에는 writer를 redux를 이용해서 가져오기 
            postId: videoId
        }
        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setcomment("")
                    props.refreshFunction(response.data.result)
                
                } else {
                    alert('Failed to save Comment')
                     // message.warning('커멘트를 저장하지 못했습니다.')
                }
        })
    }

  return (
    <div style={{padding: '0 0 0 90px'}}>
        <br />
        <p> 댓글 Replies</p>
        <hr />
        {/* Comment Lists */}
        {props.commentLists && props.commentLists.map((comment, index)=>(
            (!comment.responseTo &&
                <React.Fragment> {/* <div> 역할 */}
                    
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                <ReplyCommmet refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists}  postId={videoId}/>
                </React.Fragment>
            )            
        ))}

        {/* Root Comment Form*/}
        <form style={{display : 'flex'}} onSubmit={onSubmit} >
            <textarea
                style={{width : '100%', borderRadius : '5px'}}
                onChange={handleChange}
                value={commentValue}
                placeholder="코멘트를 작성해주세요"
            />
            <br />
            <button style ={{width:'20%', height:'52px', color:'white', background:'#1890ff', border : '0'}} onClick={onSubmit}> 등록 </button>
        </form>
    </div>
  )
}

export default Comment