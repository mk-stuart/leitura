import React, { Component } from 'react'
import Modal from 'react-modal'

class formModalComment extends Component {
    render () {
        return (
            <Modal 
                className='modal-post'
                overlayClassName='overlay'
                onAfterOpen={this.afterOpenModalComment}
                isOpen={commentModalOpen}
                onRequestClose={this.closeModalComment}
                contentLabel="modal"
            >
            <div className="container">
                <form>
                    <p className="h4 text-center mb-4">Edit Comment</p>
                    <div className="form-group">
                        <Material.MdTextsms size={25} className="prefix grey-text" />
                        <label htmlFor="form7">Content</label>
                        <textarea type="text" ref={(body) => this.body = body} id="form7" className="md-textarea form-control" rows="3" required></textarea>
                    </div>
                    <div className="text-center mt-4">
                        <a role="button" onClick={() => this.editComment()} target="_self" className="btn btn-primary">Confirm</a>
                    </div>
                </form>                    
            </div>
            </Modal>
        )
    }
}
