import React, { Component } from 'react';
import logo from '../imgs/title-final.png';
import '../index.css';
import PostList from './PostList'
import DetailsPost from './DetailsPost'
import PostNew from './PostNew'
import { getAllCategories , addPost } from '../utils/api'
import { loadCategories } from '../actions'
//import NavbarCategories from './navbarCategories'
import { connect } from 'react-redux'
import { capitalize , guid } from '../utils/helpers'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Modal from 'react-modal'
import * as Material from 'react-icons/lib/md'
import * as FontAwesome from 'react-icons/lib/fa'

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
  addPost(){
    console.log(this.title.value, this.body.value, this.author.value, this.select.value)
    addPost(guid(), Date.now(), this.title.value, this.body.value, this.author.value, this.select.value).then((result) =>{
      this.closeModalPost()
      this.getCategories()
      console.log(result)
      //this.clearFormPost()
    })
  }

  clearFormPost(){
    this.title.value = ''
    this.body.value = ''
    this.select.value = ''
    this.author.value = ''
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
                      <input type="text" ref={(title) => this.title = title} id="materialFormRegisterNameEx" className="form-control"/>
                      <label htmlFor="materialFormRegisterNameEx">Title Post</label>
                  </div>

                  <div className="md-form">
                      <Material.MdTextsms size={25} className="prefix grey-text" />
                      <label htmlFor="form7">Content</label>
                      <textarea type="text" ref={(body) => this.body = body} id="form7" className="md-textarea form-control" rows="3"></textarea>
                      
                  </div>

                  <div className="md-form">
                      <Material.MdPerson size={25} className="prefix grey-text" />
                      <input type="email" ref={(author) => this.author = author} id="materialFormRegisterConfirmEx" className="form-control"/>
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
                      <button onClick={() => this.addPost()} className="btn btn-primary" type="submit">Register</button>
                  </div>
                </form>
              </div>


          </Modal>
          <Route path="/" exact render ={() => (
            <div>
              <PostList content={null} />
              <a onClick={this.openModalPost} className="float">
                <FontAwesome.FaPlus className="my-float" size={25} />
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
