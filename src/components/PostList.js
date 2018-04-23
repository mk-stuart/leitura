import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
//import * as Actions from '../actions'
import { loadPosts } from '../actions'
import { capitalize } from '../utils/helpers'
class PostList extends Component {

    getAllPosts(){
        const { loadPosts } = this.props
        LeituraApi.getAllPosts().then((result) => {
            loadPosts(result)
        })
    }
    componentDidMount(){
        this.getAllPosts()
    }
    
    render(){
        const postGroup = this.props.postGroup
        return (
            <div className="container">
                <p> Conteúdo dos Posts</p>
                {console.log(postGroup.posts)}
                { postGroup.posts.length > 0 && (
                    <div>
                        {postGroup.posts.map(result =>(
                            <div key={result.id} className="card">
                                <div className="card-header font-weight-bold">
                                    <h4 className="float-left">{capitalize(result.category)}</h4>
                                    <div className="float-right">
                                        <p><span className="badge badge-primary badge-pill">{result.commentCount}</span> Comentários</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{capitalize(result.title)}</h5>
                                    <p className="card-text">Author: {capitalize(result.author)}</p>
                                    <a href={`${result.category}/${result.id}`} className="btn btn-primary">Open Post <FontAwesome.FaHandPeaceO size={25} /> </a>
                                    <div className="d-flex flex-row">
                                        <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25}/></div>
                                        <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25}/></div>
                                        <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25}/></div>
                                        <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25}/></div>
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
function mapStateToProps (postGroup, props) {
    return {postGroup}
}
/*const mapStateToProps = state => ({
    posts : state.posts
})*/

function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
