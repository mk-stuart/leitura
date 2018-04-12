import React, { Component } from 'react';
import logo from '../imgs/title-final.png';
import '../index.css';
import * as FontAwesome from 'react-icons/lib/fa'

class App extends Component {
  render() {
    return (
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/  
      <div className="Content">
        <nav className="navbar navbar-light bg-dark">
          <img src={logo}/>
        </nav>
        <div className="container">
          <span className="d-block text-right"><FontAwesome.FaSortAmountAsc size={20}/></span>
            <ul className="list-unstyled">
              <li className="media">
                <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h4>Title Post</h4>
                        <h6>Author Name</h6>
                      </div>
                      <div className="col">
                        <h5>10 comments</h5>
                        <h4>Points: 20</h4>
                      </div>
                      <div className="col">
                        <FontAwesome.FaThumbsOUp />
                        <FontAwesome.FaThumbsODown />
                      </div>
                    </div>
                </div>
              </li>
              <li className="media">
                <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h4>Title Post</h4>
                        <h6>Author Name</h6>
                      </div>
                      <div className="col">
                        <h5>10 comments</h5>
                        <h4>Points: 20</h4>
                      </div>
                      <div className="col">
                        <FontAwesome.FaThumbsOUp />
                        <FontAwesome.FaThumbsODown />
                      </div>
                    </div>
                </div>
              </li>
              <li className="media">
                <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h4>Title Post</h4>
                        <h6>Author Name</h6>
                      </div>
                      <div className="col">
                        <h5>10 comments</h5>
                        <h4>Points: 20</h4>
                      </div>
                      <div className="col">
                        <FontAwesome.FaThumbsOUp />
                        <FontAwesome.FaThumbsODown />
                      </div>
                    </div>
                </div>
              </li>                   
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
