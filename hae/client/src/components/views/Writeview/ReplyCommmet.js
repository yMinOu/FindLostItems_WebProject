import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyCommmet(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComments, setOpenReplyComments] = useState(false)

  useEffect(()=>{
    let commentNumber =0;
    props.commentLists.map((comment)=>{
      if(comment.responseTo === props.parentCommentId){
        commentNumber++
      }
    })

    setChildCommentNumber(commentNumber)
  }, [props.commentLists, props.parentCommentId])
        
  const renderReplyComment = (parentCommentId)=>{
    return props.commentLists.map((comment, index)=>(
      <React.Fragment>
        {
          comment.responseTo === parentCommentId && 
          <div style={{width:'80%', marginLeft: '40px'}}>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
            <ReplyCommmet refreshFunction={props.refreshFunction} commentLists={props.commentLists} postId={props.videoId} parentCommentId={comment._id} />
          </div>
        }
      </React.Fragment>
    ))
  }

  const onHandleChange = ()=>{
    setOpenReplyComments(!OpenReplyComments)
  }
  return (
    <div>

    {ChildCommentNumber >0 &&
      <p style={{fontSize:'14px', margin:0, color : 'gary'}} onClick={onHandleChange}>
      View {ChildCommentNumber} more comments(s)
      </p>
    }
    {OpenReplyComments &&
      renderReplyComment(props.parentCommentId)
    }
    </div>
  )
}

export default ReplyCommmet