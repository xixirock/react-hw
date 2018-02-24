import React, { Component } from "react";
import "./NavMessage.css";
// NavMessage renders an li tag containing an message for the user
class NavMessage extends Component {
  state = {
    message: "",
    animating: false
  };
  componentWillReceiveProps({ score, topScore }) {
    let newState = { animating: true };
    if (score === 0 && topScore === 0) {
      newState.message = "";
    } else if (score === 0 && topScore > 0) {
      newState.message = "incorrect";
    } else {
      newState.message = "correct";
    }
    this.setState(newState, () =>
      setTimeout(() => this.setState({ animating: false }), 500)
    );
  }
  renderMessage = () => {
    if(this.state.message === "correct"){
        return "You guessed correctly!"
    }else if(this.state.message === "incorrect"){
        return "You made a mistake! Start Over!!"
    }else{
        return "Click an image to begin the game!"
    }
  };
  render() {
    return (
      <li className={this.state.animating ? this.state.message : ""}>
        {this.renderMessage()}
      </li>
    );
  }
}
export default NavMessage;