import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostNew extends Component {
    render () {
        return (
            <div className="container">
                Conteúdo do novo Post
                <form>
                <p className="h4 text-center mb-4">Sign up</p>

                <div className="md-form">
                    <i className="fa fa-user prefix grey-text"></i>
                    <input type="text" id="materialFormRegisterNameEx" className="form-control"/>
                    <label htmlFor="materialFormRegisterNameEx">Your name</label>
                </div>

                <div className="md-form">
                    <i className="fa fa-envelope prefix grey-text"></i>
                    <input type="email" id="materialFormRegisterEmailEx" className="form-control"/>
                    <label htmlFor="materialFormRegisterEmailEx">Your email</label>
                </div>


                <div className="md-form">
                    <i className="fa fa-exclamation-triangle prefix grey-text"></i>
                    <input type="email" id="materialFormRegisterConfirmEx" className="form-control"/>
                    <label htmlFor="materialFormRegisterConfirmEx">Confirm your email</label>
                </div>


                <div className="md-form">
                    <i className="fa fa-lock prefix grey-text"></i>
                    <input type="password" id="materialFormRegisterPasswordEx" className="form-control"/>
                    <label htmlFor="materialFormRegisterPasswordEx">Your password</label>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-primary" type="submit">Register</button>
                </div>
                </form>

                      
            </div>
        )
    }
}

function mapStateToProps() {

    return {}
}

function mapDispatchToProps() {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostNew)