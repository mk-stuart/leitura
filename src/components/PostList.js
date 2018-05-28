import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import * as Material from 'react-icons/lib/md'
import * as Octicons from 'react-icons/lib/go'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
import { loadPosts, orderPost } from '../actions'
import { capitalize, guid } from '../utils/helpers'
import Modal from 'react-modal'

class PostList extends Component {
    constructor(){
        super()
        this.afterOpenModal = this.afterOpenModal.bind(this)
    }
    state = {
        id: '',
        title: '',
        body: '',
        newPostModalOpen: false,
        editPostModalOpen: false
    }
    openModalEditPost = () => {
        this.setState(() => ({
            editPostModalOpen: true
        }))
    }
    closeModalEditPost = () => {
        this.setState(() => ({
            editPostModalOpen: false
        }))
    }
    afterOpenModal() {
        this.title.value = this.state.title
        this.body.value = this.state.body
    }            
    openModalPost = () => {
        this.setState(() => ({
          newPostModalOpen: true
        }))
    }
    closeModalPost = () =>{
        this.setState(() => ({
          newPostModalOpen: false
        }))
    }
    changePost(id, title, body){
        this.setState(() => ({
            id: id,
            title: title,
            body: body
        }))
        this.openModalEditPost()
    }
    deletePost(id){
        LeituraApi.deletePost(id).then((result) => {
            this.componentDidMount()
        })
    }
    editPost(){
        let title = this.title.value
        let body = this.body.value
        let id = this.state.id
        LeituraApi.editPost(id, title, body).then((result) => {
            this.componentDidMount()
        })
        this.setState(() => ({
            id: '',
            title: '',
            body: ''
        }))
        this.closeModalEditPost()
    }
    addPost(){
        if(this.title.validity.valid === true && this.body.validity.valid === true && this.author.validity.valid === true){
            LeituraApi.addPost(guid(), Date.now(), this.title.value, this.body.value, this.author.value, this.select.value).then((result) =>{
                this.componentDidMount()
                this.closeModalPost()
            })
        } else {
            return alert('Preencha o campo título, conteúdo ou autor ')
        }
    }
    getAllPosts() {
        const { loadPosts } = this.props
        LeituraApi.getAllPosts().then((result) => {
            loadPosts(result)
        })
    }
    getAllPostsCategory(category){
        const { loadPosts } = this.props
        LeituraApi.getAllPostsCategory(category).then((result) => {
            loadPosts(result)
        })
    }
    componentDidMount() {
        this.getAllPosts()
    }

    votePost(id, vote){
        LeituraApi.votePost(id, vote).then((result) =>{
            this.getAllPosts()
        })
    }
    order(orderNow){
        const { orderPost } = this.props
        orderPost({order: orderNow})
    }
    render() {

        const { newPostModalOpen, editPostModalOpen } = this.state
        const { posts, categories } = this.props
        
        return (
            <div className="container margin-container-top">
                <a onClick={() => this.order(`orderAsc`)} className="float-orderAsc">
                    <Octicons.GoListOrdered className="my-float" size={25} />
                </a>
                <a onClick={() => this.order(`orderDesc`)} className="float-orderDesc">
                    <Octicons.GoListUnordered className="my-float" size={25} />
                </a>                
                {posts.length > 0 && (
                    <div>
                        {posts.map(result => (
                            <div key={result.id} className="card">
                                <div className="card-header font-weight-bold">
                                    <h4 className="float-left">{capitalize(result.category)}</h4>
                                    <div className="float-right d-flex flex-row">
                                        <div className="padding-right-small"><span className="badge badge-primary badge-pill">{result.voteScore} </span> Vote Score </div>
                                        <div><span className="badge badge-primary badge-pill">{result.commentCount} </span> Comentários </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{capitalize(result.title)}</h5>
                                    <p className="card-text">Author: {capitalize(result.author)}</p>
                                    <a href={`${result.category}/${result.id}`} className="btn btn-primary">Open Post <FontAwesome.FaHandPeaceO size={25} /> </a>
                                    <div className="d-flex flex-row">
                                        <a className="p-2" onClick={() => this.votePost(result.id, "upVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25} /></a>
                                        <a className="p-2" onClick={() => this.votePost(result.id, "downVote")} data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25} /></a>
                                        <a className="p-2" onClick={() => this.changePost(result.id, result.title, result.body)} data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></a>
                                        <a className="p-2" onClick={() => this.deletePost(result.id)} data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Modal 
                className='modal-post'
                overlayClassName='overlay'
                onAfterOpen={this.afterOpenModal}
                isOpen={editPostModalOpen}
                onRequestClose={this.closeModalEditPost}
                contentLabel="modal"
                >
                    <div className="container">
                    <form>
                        <p className="h4 text-center mb-4">Edit Post</p>
                        <div className="md-form">
                            <Material.MdTitle size={25} className="prefix grey-text" />
                            <label htmlFor="materialFormRegisterNameEx">Title Post</label>
                            <input type="text" ref={(title) => this.title = title} id="materialFormRegisterNameEx" className="form-control" required/>
                            
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
                <a onClick={this.openModalPost} className="float">
                    <FontAwesome.FaPlus className="my-float" size={25} />
                </a>
                <Modal 
                    className='modal-post'
                    overlayClassName='overlay'
                    isOpen={newPostModalOpen}
                    onRequestClose={this.closeModalPost}
                    contentLabel="modal"
                >
                <div className="container">
                  <form>
                    <p className="h4 text-center mb-4">Novo Post</p>
  
                    <div className="form-group">
                        <Material.MdTitle size={25} className="prefix grey-text" />
                        <label htmlFor="materialFormRegisterNameEx">Title Post</label>
                        <input type="text" ref={(title) => this.title = title} id="materialFormRegisterNameEx" className="form-control" required/>
                        
                    </div>
  
                    <div className="form-group">
                        <Material.MdTextsms size={25} className="prefix grey-text" />
                        <label htmlFor="form7">Content</label>
                        <textarea type="text" ref={(body) => this.body = body} id="form7" className="md-textarea form-control" rows="3" required></textarea>
                        
                    </div>
  
                    <div className="form-group">
                        <Material.MdPerson size={25} className="prefix grey-text" />
                        <label htmlFor="materialFormRegisterConfirmEx">Author</label>
                        <input type="text" ref={(author) => this.author = author} id="materialFormRegisterConfirmEx" className="form-control" required/>
                        
                    </div>
                    <div className="form-control">
                    <label htmlFor="select">Select list:</label>
                      <select className="form-control" id="select" ref={(select) => this.select = select}>
                          { categories.map( category => (
                              <option key={category.name}>{category.name}</option>
                          ))}
                      </select>
                    </div>
                    <div className="text-center mt-4">
                        <a onClick={() => this.addPost()} target="_self" className="btn btn-primary">Register</a>
                    </div>
                  </form>
                </div>
            </Modal>
            </div>
        )
    }
}
/* desc */
Array.prototype.sortByDesc = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] < b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
    });
}
/* asc */
Array.prototype.sortByAsc = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}
const orderPostDesc = (posts, orderType) =>{
    if (orderType.order === 'orderDesc'){
        posts = posts.sortByDesc('voteScore')
    } 
    if (orderType.order === 'orderAsc'){
        posts = posts.sortByAsc('voteScore')
    }
    return posts
}
function mapStateToProps( {posts, categories, order}, props) {
    posts = orderPostDesc(posts, order)
    if(props.content){
        posts = posts.filter(e => e.category === props.content.params.category)
    }
    return { posts, categories }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: (data) => dispatch(loadPosts(data)),
        orderPost: (data) => dispatch(orderPost(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
