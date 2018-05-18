import React, { Component } from 'react';
import logo from '../imgs/title-final.png';
import '../index.css';
import PostList from './PostList'
import DetailsPost from './DetailsPost'
import PostNew from './PostNew'
import { getAllCategories } from '../utils/api'
import { loadCategories } from '../actions'
//import NavbarCategories from './navbarCategories'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Modal from 'react-modal'
import * as Material from 'react-icons/lib/md'

class App extends Component {
  state = {
    newPostModalOpen: false
  }
  getCategories(){
    const { loadCategories } = this.props
    getAllCategories().then((result) =>{
      loadCategories(result.categories)
    })
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
  componentDidMount(){
    this.getCategories()
  }
  render() {
    const { newPostModalOpen } = this.state
    console.log(newPostModalOpen)
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
                          <Link key={category.name} className="nav-link" to={`/${category.name}`}>{capitalize(category.name)}</Link>                  
                      ))}
                  </ul>
              )}
          </nav>
          <Modal 
              className='modal-post'
              //className='modal fade'
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
                      <input type="text" id="materialFormRegisterNameEx" className="form-control"/>
                      <label htmlFor="materialFormRegisterNameEx">Title Post</label>
                  </div>

                  <div className="md-form">
                      <Material.MdTextsms size={25} className="prefix grey-text" />
                      <textarea type="text" id="form7" class="md-textarea form-control" rows="3"></textarea>
                      <label for="form7">Content</label>
                  </div>

                  <div className="md-form">
                      <Material.MdPerson size={25} className="prefix grey-text" />
                      <input type="email" id="materialFormRegisterConfirmEx" className="form-control"/>
                      <label htmlFor="materialFormRegisterConfirmEx">Author</label>
                  </div>
                  <div className="text-center mt-4">
                      <button className="btn btn-primary" type="submit">Register</button>
                  </div>
                </form>
              </div>


          </Modal>
          <Route path="/" exact render ={() => (
            <div>
              <PostList content={null} />
              <a onClick={this.openModalPost} className="float bg-dark">
                <i className="fa fa-plus my-float"></i>
              </a>
            </div>
          )} />
          <Route path="/:category" exact render ={({match}) => (
            <div>
              <PostList content={match} />
            </div>
          )} />
          <Route path="/:category/:id_post" exact render ={({match}) => (
            <div>
              <DetailsPost content={match} />
            </div>
          )} />
          <Route path="/new" exact render ={() => (
            <div>
              <PostNew />
            </div>
          )} />          
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

Modal.setAppElement('#root');

/*const mapStateToProps = state => ({
  categories: state.categories
})*/
function mapStateToProps ( categories ){
  return categories
}
function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(loadCategories(data)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
