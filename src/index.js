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
          <h6>Scroll direction is: {this.state.scrollDirection}</h6>
        </div>
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}
const myapp = render(<App />, document.getElementById("root"));

function sketch(p) {
  let background = "#333";
  let lastScrollTop = 0;
  let boxSize = 30;
  let width = window.innerWidth;
  let height = window.innerHeight;
  // let posX = width / 2 - boxSize / 2;
  // let posY = height / 2 - boxSize / 2;
  p.setup = () => {
    p.createCanvas(width - 10, height - 10, 10, 10);
  };

  const drawRect = () => {
    p.rect(p.mouseX - boxSize / 2, p.mouseY - boxSize / 2, boxSize, boxSize);
  };

  p.draw = () => {
    p.background(background);
    drawRect();
  };

  // Start it up
  p.mousePressed = () => {};
  // Stop
  p.mouseReleased = () => {};

  //Scroll
  p.mouseWheel = ev => {
    ev.preventDefault();
    const test = lastScrollTop;
    lastScrollTop = lastScrollTop + ev.delta;
    //console.log("Ev", lastScrollTop);
    if (lastScrollTop >= -30) {
      //console.log("I am over");
      lastScrollTop = -30;
      boxSize = 30 * 2;
    } else {
      boxSize = lastScrollTop * 2;
    }

    if (lastScrollTop > test) {
      myapp.updateDirection("down:" + lastScrollTop);
    } else {
      myapp.updateDirection("up: " + lastScrollTop);
    }

    background = "#ccc";
  };
}
