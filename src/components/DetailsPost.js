import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import * as Material from 'react-icons/lib/md'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
//import * as Actions from '../actions'
import { loadComments, loadPost } from '../actions'
import { capitalize, guid } from '../utils/helpers'
import iconUser from '../imgs/icon-user.png'
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'
import Erro404 from './404'
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
    changeComment(id, body){
        this.setState(() => ({
            id: id,
            body: body
        }))
        this.openModalComment()
    }
    changePost(id, title, body){
        this.setState(() => ({
            id: id,
            title: title,
            body: body
        }))
        this.openModalPost()
    }
    changeComment(id, body){
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
    getAllComments() {
        const { id_post } = this.props.content.params
        const { loadComments } = this.props
        LeituraApi.getPostComments(id_post).then((result) => {
            console.log(result)
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
    deleteComment(id){
        LeituraApi.deleteComment(id).then((result) =>{
            this.componentDidMount()
        })
    }
    addComment(){
        const { post } = this.props
        LeituraApi.addComment(guid(), Date.now(), this.comment.value, this.author.value, post.id).then((result) => {
            this.getAllComments()
            this.clearFormComment()
        })
    }
    clearFormComment(){
        this.comment.value = ''
        this.author.value = ''
    }    
    render() {
        //const comments = this.props.post.comments
        //const post = this.props.post.post
        console.log(this.props)
        const { post, comments } = this.props
        const { postModalOpen, commentModalOpen } = this.state
        console.log('POST')
        console.log(post)
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

                <Modal 
                    className='modal-post'
                    overlayClassName='overlay'
                    onAfterOpen={this.afterOpenModal}
                    isOpen={postModalOpen}
                    onRequestClose={this.closeModalPost}
                    contentLabel="modal"
                >
                    <div className="container">
                    <form>
                        <p className="h4 text-center mb-4">Edit Post</p>
                        <div className="md-form">
                            <Material.MdTitle size={25} className="prefix grey-text" />
                            <input type="text" ref={(title) => this.title = title} id="materialFormRegisterNameEx" className="form-control" required/>
                            <label htmlFor="materialFormRegisterNameEx">Title Post</label>
                        </div>
                        <div className="md-form">
                            <Material.MdTextsms size={25} className="prefix grey-text" />
                            <label htmlFor="form7">Content</label>
                            <textarea type="text" ref={(body) => this.body = body} id="form7" className="md-textarea form-control" rows="3" required></textarea>
                        </div>
                        <div className="text-center mt-4">
                            <a onClick={() => this.editPost()} target="_self" className="btn btn-primary">Confirm</a>
                        </div>
                    </form>
                    </div>
                </Modal>
                <Modal 
                    className='modal-post'
                    overlayClassName='overlay'
                    onAfterOpen={this.afterOpenModalComment}
                    isOpen={commentModalOpen}
                    onRequestClose={this.closeModalComment}
                    contentLabel="modal"
                >
                <div className="container">
                    <form>
                        <p className="h4 text-center mb-4">Edit Comment</p>
                        <div className="md-form">
                            <Material.MdTextsms size={25} className="prefix grey-text" />
                            <label htmlFor="form7">Content</label>
                            <textarea type="text" ref={(body) => this.body = body} id="form7" className="md-textarea form-control" rows="3" required></textarea>
                        </div>
                        <div className="text-center mt-4">
                            <a onClick={() => this.editComment()} target="_self" className="btn btn-primary">Confirm</a>
                        </div>
                    </form>                    
                </div>
                </Modal>
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
