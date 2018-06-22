import React, { Component } from 'react'
import * as Material from 'react-icons/lib/md'
import Modal from 'react-modal'

class formModalPost extends Component {
    constructor(){
        super()
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.editPostModal = this.afterOpenModal.bind(this)
    }
    state = {
        id: '',
        title: '',
        body: ''
    }
    editPostModal = _ => {
        let id = this.state.id
        let title = this.title
        let body = this.body
        console.log(body, id, title)
        this.props.editPost({ id , title, body })
        this.props.closeModalPost()
    }
    afterOpenModal() {
        this.title.value = this.state.title
        this.body.value = this.state.body
    }
    componentDidMount(){
    }
    componentWillReceiveProps(futureProps){
        const content = futureProps.state
        this.setState({
            id: content.id,
            title: content.title,
            body: content.body
        })
    }
    render (){
        const { id } = this.state
        const { isOpen } = this.props
        return (
            <Modal 
                className='modal-post'
                overlayClassName='overlay'
                onAfterOpen={this.afterOpenModal}
                isOpen={isOpen}
                onRequestClose={this.props.closeModalPost}
                contentLabel="modal"
            >
                <div className="container">
                    <form>
                        <p className="h4 text-center mb-4">Edit Post</p>
                        <div className="form-group">
                            <Material.MdTitle size={25} className="prefix grey-text" />
                            <label htmlFor="titlePost">Title Post</label>
                            <input type="text" ref={(title) => this.title = title} id="titlePost" className="form-control" required/>
                            
                        </div>
                        <div className="form-group">
                            <Material.MdTextsms size={25} className="prefix grey-text" />
                            <label htmlFor="bodyPost">Content</label>
                            <textarea type="text" ref={(body) => this.body = body} id="bodyPost" className="form-control" rows="3" required></textarea>
                        </div>
                        <div className="text-center mt-4">
                            {/*<a onClick={() => this.props.editPost({id: id, title: this.title, body: this.body})} className="btn btn-primary">Confirm</a>*/}
                            <a onClick={() => this.editPostModal()} className="btn btn-primary">Confirm</a>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default formModalPost