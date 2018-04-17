import React, { Component } from 'react';
import logo from '../imgs/title-final.png';
import '../index.css';
import PostList from './PostList'
import * as LeituraAPI from '../utils/api'

class App extends Component {
  state = {
    posts: [],
    comments: []
  }
  getAllPosts(){
    LeituraAPI.getAllPosts().then((posts) =>{
      this.setState({posts})
      console.log(posts)
    })
  }
  componentDidMount(){
    this.getAllPosts()
  }
  render() {
    return (
      <div className="Content">
        <nav className="navbar navbar-light bg-dark">
          <img src={logo}/>
        </nav>
        <PostList post={this.state.post}/>
      </div>
    );
  }
}

export default App;
