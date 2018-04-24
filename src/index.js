import React from "react";
import { render } from "react-dom";
import P5Wrapper from "react-p5-wrapper";
import p5 from "p5";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const header = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  width: "100%",
  fontFamily: "Arial",
  fontSize: 34,
  lineHeight: 0.2,
  userSelect: "none",
  color: "#666"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollDirection: "up"
    };
  }

  updateDirection(direction) {
    this.setState({
      scrollDirection: direction
    });
  }
  render() {
    return (
      <div style={styles}>
        <div style={header}>
          <h1>Start scrolling</h1>
          <h6>
            Scroll direction is: {this.state.scrollDirection}{" "}
            <button onClick={() => this.updateDirection("down")}>Update</button>
          </h6>
        </div>
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));

function sketch(p) {
  let background = "#333";
  let lastScrollTop = 0;
  let boxSize = 30;
  let width = window.innerWidth;
  let height = window.innerHeight;
  p.setup = () => {
    p.createCanvas(width, height);
  };

  p.draw = () => {
    p.background(background);
    p.rect(width / 2 - boxSize / 2, height / 2 - boxSize / 2, boxSize, boxSize);
  };

  // Start it up
  p.mousePressed = () => {};
  // Stop
  p.mouseReleased = () => {};

  //Scroll
  p.mouseWheel = ev => {
    ev.preventDefault();
    lastScrollTop = lastScrollTop + ev.delta;
    //console.log("Ev", lastScrollTop);
    if (lastScrollTop > -30) {
      //console.log("I am over");
      lastScrollTop = -31;
      boxSize = 30;
    } else {
      boxSize = lastScrollTop;
    }

    background = "#ccc";
  };
}
