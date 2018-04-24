import React, { Component } from 'react';
import logo from '../imgs/title-final.png';
import '../index.css';
import PostList from './PostList'
import DetailsPost from './DetailsPost'
import { getAllCategories } from '../utils/api'
import { loadCategories } from '../actions'
//import NavbarCategories from './navbarCategories'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import { Route, Link, BrowserRouter } from 'react-router-dom'

class App extends Component {
  getCategories(){
    const { loadCategories } = this.props
    getAllCategories().then((result) =>{
      loadCategories(result.categories)
    })
  }
  componentDidMount(){
    this.getCategories()
  }
  render() {
    const categories = this.props.categories
    return (
      <div className="Content">
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <img src={logo}/>
              { categories.length > 0 && (
                  <ul className="navbar-nav">
                      <Link to="/" className="nav-link"> Home </Link>
                      { categories.map( category => (
                          <Link key={category.name} className="nav-link" to={category.path}>{capitalize(category.name)}</Link>                  
                      ))}
                  </ul>
              )}
          </nav>
          <Route path="/" exact render ={() => (
            <div>
              <PostList />
            </div>
          )} />
          <Route path="/:category" exact render ={({match}) => (
            <div>
              <PostList />
            </div>
          )} />
          <Route path="/:category/:id_post" exact render ={({match}) => (
            <div>
              <DetailsPost content={match} />
            </div>
          )} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})
function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(loadCategories(data)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
