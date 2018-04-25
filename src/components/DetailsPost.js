import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
//import * as Actions from '../actions'
import { loadComments, loadPost } from '../actions'
import { capitalize } from '../utils/helpers'
import iconUser from '../imgs/icon-user.png'
class DetailsPost extends Component {

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
        console.log(this.props.content.params)
        const { loadPost } = this.props
        LeituraApi.getPost(id_post).then((result) => {
            //console.log(result)
            loadPost(result)
        })
    }
    componentDidMount() {
        this.getPost()
        this.getAllComments()
    }

    render() {
        const comment = this.props.comment
        const post = this.props.post.post
        {console.log(post)}
        return (
            <div className="container-fluid">
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
                                        <h5 className="card-title">{capitalize(post.title)}</h5>
                                        <p className="card-text">Author: {capitalize(post.author)}</p>

                                        <div className="d-flex flex-row">
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25} /></div>
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25} /></div>
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></div>
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    )}
                </div>
                <div>
                    <div className="col-lg-10">
                        <div key={`result.id`} className="card">
                            <div className="card-header font-weight-bold">
                                <h4 className="float-left">{capitalize(`categoria`)}</h4>
                                <div className="float-right">
                                    <p><span className="badge badge-primary badge-pill">{`10`}</span> Comentários</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-1">
                                        <img src={iconUser} className="main-cmt-img"/>
                                    </div>
                                    <div className="col-lg-11">
                                        <h5 className="card-title">{capitalize(`titulo`)}</h5>
                                        <p className="card-text">Author: {capitalize(`Autor`)}</p>

                                        <div className="d-flex flex-row">
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Vote Up"><FontAwesome.FaThumbsOUp size={25} /></div>
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Vote Down :("><FontAwesome.FaThumbsODown size={25} /></div>
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Edit"><FontAwesome.FaEdit size={25} /></div>
                                            <div className="p-2" data-toggle="tooltip" data-placement="bottom" title="Delete"><FontAwesome.FaTrashO size={25} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <nav className="navbar fixed-bottom footer">
                        <div className="row text-center">
                            <div className="col-lg-7 col-7">
                                <input type="text" className="form-control" placeholder="write comments ..." />
                            </div>
                            <div className="col-lg-3 col-3">
                                <input type="text" className="form-control" placeholder="Author..." />
                            </div>
                            <div className="col-lg-1 col-1 send-icon">
                                <a href="http://nicesnippets.com/" target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </nav>
                </footer>
            </div>
        )
    }
}
function mapStateToProps(post, comment, props) {

    return { post, comment }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPost: (data) => dispatch(loadPost(data)),
        loadComments: (data) => dispatch(loadComments(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost)
