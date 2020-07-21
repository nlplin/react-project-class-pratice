import React, { Component } from "react";
import { loginSuccessSync } from '@redux/actions/login'
import { connect } from "react-redux";

@connect()
class Oauth extends Component {
  componentDidMount() {
    const token = window.location.search.split('=')[1]
    this.props.dispatch(loginSuccessSync({token}))
    localStorage.setItem("user_token", token);
    this.props.history.replace("/");
  }
  render() {
    return (
      <div>
        aaa
      </div>
    ) 
  }
}
export default Oauth
