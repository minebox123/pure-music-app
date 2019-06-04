import React, { Component } from "react";

export default class Home extends Component {
  onClick = () => {
    fetch(
      `https://accounts.spotify.com/authorize?client_id=364f3c110b6b4117adeae83fc568d938&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-private%20user-read-email&state=34fFs29kd09`
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Log In</button>
      </div>
    );
  }
}
