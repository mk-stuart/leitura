import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import * as Material from 'react-icons/lib/md'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
//import * as Actions from '../actions'
import { loadComments, loadPost } from '../actions'
import { capitalize, guid } from '../utils/helpers'
import { Redirect } from 'react-router-dom'
import Erro404 from './404'
import DetailsPostComment from './DetailsPostComment'
import FormModalPost from './formModalPost'

class DetailsPost extends Component {

    constructor(){
        super()
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.afterOpenModalComment = this.afterOpenModalComment.bind(this)
    }

    state = {
        id: '',
        body: '',
        title: '',
        postModalOpen: false,
        commentModalOpen: false,
        redirect: false
    }
    openModalPost = () => {
        this.setState(() => ({
          postModalOpen: true
        }))
    }
    closeModalPost = () =>{
        this.setState(() => ({
          postModalOpen: false
        }))
    }
    openModalComment = () => {
        this.setState(() => ({
            commentModalOpen: true
        }))
    }
    closeModalComment = () =>{
        this.setState(() => ({
            commentModalOpen: false
        }))
    }
    afterOpenModalComment(){
        this.body.value = this.state.body
    }    
    afterOpenModal() {
        this.title.value = this.state.title
        this.body.value = this.state.body
    }
    changePost(id, title, body){
        this.setState(() => ({
            id: id,
            title: title,
            body: body
        }))
        this.openModalPost()
    }
    changeComment = (id, body) =>{
        this.setState(() => ({
            id: id,
            body: body
        }))
        this.openModalComment()
    }
    editComment(){
        let timestamp = Date.now()
        let body = this.body.value
        let id = this.state.id
        LeituraApi.editComment(id, body, timestamp).then((result) => {
            this.getAllComments()
        })
        this.closeModalComment()
    }
    editPost(){
        let title = this.title.value
        let body = this.body.value
        let id = this.state.id
        LeituraApi.editPost(id, title, body).then((result) => {
            this.getPost()
        })
        this.setState(() => ({
            id: '',
            title: '',
            body: ''
        }))
        this.closeModalPost()
    }
    deletePost(id){
        LeituraApi.deletePost(id).then((result) => {
            this.setState(() => ({
                redirect: true
            }))
        })
    }   
    getAllComments = () => {
        const { id_post } = this.props.content.params
        const { loadComments } = this.props
        LeituraApi.getPostComments(id_post).then((result) => {
            loadComments(result)
        })
    }
    getPost = () => {
        const { id_post } = this.props.content.params
        const { loadPost } = this.props
        LeituraApi.getPost(id_post).then((result) => {
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
    voteComment = (id, vote) => {
        LeituraApi.voteComment(id, vote).then((result) =>{
            this.getAllComments()
        })
    } 
    votePost(id, vote){
        LeituraApi.votePost(id, vote).then((result) =>{
            this.getPost()
        })
    }
    deleteComment = (id) =>{
        LeituraApi.deleteComment(id).then((result) =>{
            this.getPost()
            this.getAllComments()
        })
    }
    addComment(){
        const { post } = this.props
        if (this.comment.validity.valid === true && this.author.validity.valid) {
            LeituraApi.addComment(guid(), Date.now(), this.comment.value, this.author.value, post.id).then((result) => {
                this.getPost()
                this.getAllComments()
                this.clearFormComment()
            })
        } else {
            return alert('Preencha o campo comentário ou autor')
        }
    }
    clearFormComment(){
        this.comment.value = ''
        this.author.value = ''
    }    
    render() {
        const { post, comments } = this.props
        console.log( post , comments )
        const { postModalOpen, commentModalOpen } = this.state
        if(this.state.redirect === true){
            return <Redirect to="/"/>
        }
        return (
            <div className="container margin-container-top">
                <div>
                    {Object.keys(post).length > 0 && !post.error && (
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
                                                <a className="p-2" onClick={() => this.changePost(post.id, post.title, post.body)} data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></a>
                                                <a className="p-2" onClick={() => this.deletePost(post.id)} data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></a>
                                            </div>
                                            <div className="float-right font-weight-bold">
                                                <p><span className="badge badge-primary badge-pill">{post.voteScore}</span> Vote Score</p>
                                            </div>                                            
                                    </div>
                                </div>
                                <footer>
                                    <nav className="navbar fixed-bottom footer">
                                            <div className="container">
                                                
                                                <div className="comments-input">
                                                    <input type="text" required name="comment" ref={(comment) => this.comment = comment} className="form-control" placeholder="write comments ..." />
                                                </div>
                                                <div className="">
                                                    <input type="text" required name="author" ref={(author) => this.author = author} className="form-control" placeholder="Author..." />
                                                </div>
                                                <div className="col-1 send-icon">
                                                    <a onClick={() => this.addComment()}><FontAwesome.FaPaperPlane size={18} /></a>
                                                </div>
                                                
                                            </div>
                                    </nav>
                                </footer>
                                <DetailsPostComment 
                                    comments={comments}
                                    deleteComment={this.deleteComment}
                                    voteComment={this.voteComment}
                                    changeComment={this.changeComment}
                               /> 
                        </div>
                    )}
                </div>
                <FormModalPost
                    isOpen={postModalOpen}
                    state={this.state}
                    afterOpenModal = {this.afterOpenModal}
                    closeModalPost = {this.closeModalPost}
                    editPost = {this.editPost}
                />
                {Object.keys(post).length === 0 && (
                    <div>
                        <Erro404 />
                    </div>
                )}
                {post.error && (
                    <div>
                        <Erro404 />
                    </div>                    
                )}               
            </div>
        )
    }
}
function mapStateToProps( {post, comments}, props) {

    return { post, comments }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPost: (data) => dispatch(loadPost(data)),
        loadComments: (data) => dispatch(loadComments(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost)
