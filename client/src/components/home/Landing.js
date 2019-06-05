import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    fetch("/api/login/callback").then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <a onSubmit={this.onSubmit} href="/api/login">
          Log In
        </a>
      </div>
    );
  }
}
