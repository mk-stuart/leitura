import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
//import * as Actions from '../actions'
import { loadComments, loadPost } from '../actions'
import { capitalize, guid } from '../utils/helpers'
import iconUser from '../imgs/icon-user.png'
class DetailsPost extends Component {

    state = {
        id: '',
        comment: '',
        author: ''
    }

    getAllComments() {
        const { id_post } = this.props.content.params
        const { loadComments } = this.props
        LeituraApi.getPostComments(id_post).then((result) => {
            //console.log(result)
            loadComments(result)
        })
    }
    getPost() {
        const { id_post } = this.props.content.params
        const { loadPost } = this.props
        LeituraApi.getPost(id_post).then((result) => {
            console.log(result)
            loadPost(result)
        })
    }
    componentDidMount() {
        this.getPost()
        this.getAllComments()
    }
    datePost(post){
        let datePost = new Date(post)
        datePost = `${datePost.getDate()}/${datePost.getMonth()+1}/${datePost.getFullYear()}`
        return datePost
    }
    voteComment(id, vote){
        LeituraApi.voteComment(id, vote).then((result) =>{
            this.getAllComments()
        })
    }
    votePost(id, vote){
        LeituraApi.votePost(id, vote).then((result) =>{
            this.getPost()
        })
    }
    addComment(){
        const { post } = this.props.post
        LeituraApi.addComment(guid(), Date.now(), this.comment.value, this.author.value, post.id).then((result) => {
            this.getAllComments()
            this.clearFormComment()
        })
    }
    onChangeStateComment = (e) => {
        console.log(e)
        //this.setState({ comment: value })
    }
    onChangeStateAuthor = (e, {value}) => {
        this.setState({ author: value })
    }
    clearFormComment(){
        this.comment.value = ''
        this.author.value = ''
    }
    render() {
        const comments = this.props.post.comments
        const post = this.props.post.post
        const { comment, author } = this.state
        return (
            <div className="container">
                <p> Conteúdo dos Comentários</p>
                <div>
                    {Object.keys(post).length > 0 && (
                        <div>
                            
                                <div key={post.id} className="card">
                                    <div className="card-header font-weight-bold">
                                        <h4 className="float-left">{capitalize(post.category)}</h4>
                                        <div className="float-right">
                                            <p><span className="badge badge-primary badge-pill">{post.commentCount}</span> Comentários</p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Title: {capitalize(post.title)}</h5>
                                        <p className="card-subtitle">Author: {capitalize(post.author)}</p>
                                        <p className="card-text text-dark">{(post.body)}</p>
                                        <p className="card-text">Sent: {this.datePost(post.timestamp)}</p>
                                    </div>
                                    <div className="card-footer">
                                            <div className="d-flex flex-row float-left">
                                                <a className="p-2" onClick={() => this.votePost(post.id, "upVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25} /></a>
                                                <a className="p-2" onClick={() => this.votePost(post.id, "downVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25} /></a>
                                                <a className="p-2" data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></a>
                                                <a className="p-2" data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></a>
                                            </div>
                                            <div className="float-right font-weight-bold">
                                                <p><span className="badge badge-primary badge-pill">{post.voteScore}</span> Vote Score</p>
                                            </div>                                            
                                    </div>
                                </div>
                            
                        </div>
                    )}
                </div>
                <div className="margin-bottom-card">
                    <div className="col-lg-12">
                        {comments.length > 0 && (
                            <div>
                                {comments.map(comment => (
                                    <div key={comment.id} className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-1 text-center">
                                                    <img src={iconUser} className="main-cmt-img mx-auto d-block"/>
                                                    <span className="author-comment">{capitalize(comment.author)}</span>
                                                </div>
                                                <div className="col-lg-11">
                                                    
                                                    <p className="card-text text-dark">{(comment.body)}</p>
                                                    <p className="card-text">Sent: {this.datePost(comment.timestamp)}</p>
        
                                                    <div className="d-flex flex-row float-left">
                                                        <a className="p-2" onClick={() => this.voteComment(comment.id, "upVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25} /></a>
                                                        <a className="p-2" onClick={() => this.voteComment(comment.id, "downVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25} /></a>
                                                        <a className="p-2" data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></a>
                                                        <a className="p-2" data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></a>
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
                <footer>
                    <nav className="navbar fixed-bottom footer">
                        <div className="row text-center">
                            <div className="col-lg-7 col-7">
                                <input type="text" name="comment" ref={(comment) => this.comment = comment} className="form-control" placeholder="write comments ..." />
                            </div>
                            <div className="col-lg-3 col-3">
                                <input type="text" name="author" ref={(author) => this.author = author} className="form-control" placeholder="Author..." />
                            </div>
                            <div className="col-lg-1 col-1 send-icon">
                                <a onClick={() => this.addComment()} target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </nav>
                </footer>
            </div>
        )
    }
}
function mapStateToProps(post, comment) {

    return { post, comment }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPost: (data) => dispatch(loadPost(data)),
        loadComments: (data) => dispatch(loadComments(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost)
