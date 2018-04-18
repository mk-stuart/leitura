import * as FontAwesome from 'react-icons/lib/fa'
import React from 'react'

export default function postList ({ post }) {
    console.log(post)
    if (typeof post === 'undefined' || post === null){
        return <p> No Posts to show! .</p>
    }
    return (
        <div className="container">
        <span className="d-block text-right"><FontAwesome.FaSortAmountAsc size={20}/></span>
          <ul className="list-unstyled">
            {post.map((item) => (
              <li className="media">
                <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h4>{item.title}</h4>
                        <h6>Author: {item.author}</h6>
                      </div>
                      <div className="col">
                        <h5>{item.commentCount} comments</h5>
                        <h4>Points: {item.voteScore}</h4>
                      </div>
                      <div className="col">
                        <FontAwesome.FaThumbsOUp />
                        <FontAwesome.FaThumbsODown />
                      </div>
                    </div>
                </div>
              </li>
            ))}                   
          </ul>
      </div>
    )
}