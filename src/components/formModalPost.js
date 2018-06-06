import React, { Component } from 'react'
import * as Material from 'react-icons/lib/md'
import Modal from 'react-modal'

class formModalPost extends Component {
    render (){
        console.log(this.props)
        const { postModalOpen } = this.props
        return (
            <Modal 
                className='modal-post'
                overlayClassName='overlay'
                onAfterOpen={this.props.afterOpenModal}
                isOpen={postModalOpen}
                onRequestClose={this.props.closeModalPost}
                contentLabel="modal"
            >
                <div className="container">
                    <form>
                        <p className="h4 text-center mb-4">Edit Post</p>
                        <div className="form-group">
                            <Material.MdTitle size={25} className="prefix grey-text" />
                            <label htmlFor="materialFormRegisterNameEx">Title Post</label>
                            <input type="text" ref={(title) => this.props.state.title = title} id="materialFormRegisterNameEx" className="form-control" required/>
                            
                        </div>
                        <div className="form-group">
                            <Material.MdTextsms size={25} className="prefix grey-text" />
                            <label htmlFor="form7">Content</label>
                            <textarea type="text" ref={(body) => this.props.state.body = body} id="form7" className="md-textarea form-control" rows="3" required></textarea>
                        </div>
                        <div className="text-center mt-4">
                            <a onClick={() => this.props.editPost} target="_self" className="btn btn-primary">Confirm</a>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default formModalPost