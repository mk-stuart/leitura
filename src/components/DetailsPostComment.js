import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { capitalize } from '../utils/helpers'
import iconUser from '../imgs/icon-user.png'

class DetailPostComment extends Component {

    componentDidMount(){

    }
    datePost(post){
        let datePost = new Date(post)
        datePost = `${datePost.getDate()}/${datePost.getMonth()+1}/${datePost.getFullYear()}`
        return datePost
    }
    changeComment = commentId =>{
        this.props.changeComment(commentId)
    }
    deleteComment = commentId => {
        this.props.deleteComment(commentId)
    }
    voteComment = (commentId, vote) => {
        this.props.voteComment(commentId, vote)
    }
    render (){
        const { comments } = this.props
        return (
            <div className="margin-bottom-card">
                <div className="col-lg-12">
                    {comments.length > 0 && (
                        <div>
                            {comments.map(comment => (
                                <div key={comment.id} className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-1 text-center">
                                                <img src={iconUser} className="main-cmt-img mx-auto d-block" alt='user'/>
                                                <span className="author-comment">{capitalize(comment.author)}</span>
                                            </div>
                                            <div className="col-lg-11">
                                                
                                                <p className="card-text text-dark">{(comment.body)}</p>
                                                <p className="card-text">Sent: {this.datePost(comment.timestamp)}</p>
    
                                                <div className="d-flex flex-row float-left">
                                                    <a className="p-2" onClick={() => this.voteComment(comment.id, "upVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25} /></a>
                                                    <a className="p-2" onClick={() => this.voteComment(comment.id, "downVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25} /></a>
                                                    <a className="p-2" onClick={() => this.changeComment(comment.id, comment.body)} data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></a>
                                                    <a className="p-2" onClick={() => this.deleteComment(comment.id)} data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></a>
                                                </div>
                                                <div className="float-right font-weight-bold">
                                                    <p><span className="badge badge-primary badge-pill">{comment.voteScore}</span> Vote Score</p>
                                                </div>                                                   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default DetailPostComment