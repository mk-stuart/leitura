import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import * as Material from 'react-icons/lib/md'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
import { loadPosts } from '../actions'
import { capitalize, guid } from '../utils/helpers'
import Modal from 'react-modal'

class PostList extends Component {
    state = {
        newPostModalOpen: false
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
    addPost(){      
        LeituraApi.addPost(guid(), Date.now(), this.title.value, this.body.value, this.author.value, this.select.value).then((result) =>{
            this.componentDidMount()
            this.closeModalPost()
        })
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
        let category = this.props.content
        if ( category === null){
            this.getAllPosts()
        } else {
            category = this.props.content.params.category
            this.getAllPostsCategory(category)
        }
    }

    votePost(id, vote){
        LeituraApi.votePost(id, vote).then((result) =>{
            this.getAllPosts()
        })
    }
    render() {
        const { newPostModalOpen } = this.state
        const {posts} = this.props
        const { categories } = this.props.posts
        console.log(categories)
        return (
            <div className="container">
                <p> Conteúdo dos Posts</p>
                {posts.posts.length > 0 && (
                    <div>
                        {posts.posts.map(result => (
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
                                        <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></div>
                                        <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
  
                    <div className="md-form">
                        <Material.MdPerson size={25} className="prefix grey-text" />
                        <input type="text" ref={(author) => this.author = author} id="materialFormRegisterConfirmEx" className="form-control" required/>
                        <label htmlFor="materialFormRegisterConfirmEx">Author</label>
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
function mapStateToProps(posts, categories) {
   /* if (categories.content && posts.posts.length > 0){
        posts.posts = posts.posts.filter(e => e.category === categories.content.params.category)
        //debugger
        //console.log("postgroup")
        //console.log(postGroup)
    }
    /*if (category.content && posts.posts.length > 0){
        posts.posts = posts.posts.filter(e => e.category === category.content.params.category)
        //debugger
        //console.log("postgroup")
        //console.log(postGroup)
    }
    
    /*const _category = category.content.map(data => {
        return {value:data.name, text: capitalize(data.path)}
    })*/
    //console.log(props)
    //console.log(category.content)
    //console.log(posts)
    return { posts, categories }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: (data) => dispatch(loadPosts(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
