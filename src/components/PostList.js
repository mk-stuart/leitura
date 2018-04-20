import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import * as LeituraApi from '../utils/api'
import * as Actions from '../actions'
class PostList extends Component {

    getAllPosts(){
        const { loadPosts } = this.props
        LeituraApi.getAllPosts().then((result) => {
            Actions.loadPosts(result)
            console.log(result)
        })
    }
    componentDidMount(){
        this.getAllPosts()
    }
    render(){
        const posts = this.props
        return (
            <div className="container">
                <p> Conteúdo dos Posts</p>
                <div className="card">
                    <div className="card-header">
                         Categoria que Pertence
                        <div className="float-right">
                            <p>10 Comentários</p>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Título do Post</h5>
                        <p className="card-text">Author: Pessoa X</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                        <div className="col">
                            <FontAwesome.FaThumbsOUp />
                        </div>
                        <div className="col">
                            <FontAwesome.FaThumbsODown />
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}
function mapStateToProps ({posts}, props) {
    return { posts }
}

function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(Actions.loadPosts(data)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
