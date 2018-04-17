import * as FontAwesome from 'react-icons/lib/fa'
import React from 'react'

export default function postList ({ post }) {
    console.log(post)
    return (
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
    )
}