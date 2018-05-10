import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
//import * as Actions from '../actions'
import { loadPosts } from '../actions'
import { capitalize } from '../utils/helpers'
import { Route, Link, BrowserRouter } from 'react-router-dom'

class PostList extends Component {

    getAllPosts() {
        const { loadPosts } = this.props
        LeituraApi.getAllPosts().then((result) => {
            loadPosts(result)
        })
    }
    getAllPostsCategory(category){
        const { loadPosts } = this.props
        LeituraApi.getAllPostsCategory(category).then((result) => {
            console.log(result)
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
        const {posts, categories} = this.props
        /*console.log(posts)
        console.log(categories)
        console.log(this.props)*/
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
            </div>
        )
    }
}
function mapStateToProps(posts, categories, props) {
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
    //console.log(props)
    return { posts, categories }
}
/*const mapStateToProps = state => ({
    posts : state.posts
})*/

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: (data) => dispatch(loadPosts(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
