import React, { Component } from 'react';
import './canvas2.css';
import './sz.js'
class Canvas2 extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div className="star comet"></div>
    );
  }
  componentDidMount(){
    const wH = window.innerHeight;
const wW = window.innerWidth;

const generateStars = n => {
  for (let i = 0; i < n; i++) {
    const div = document.createElement("div");
    div.className =
      i % 20 == 0
        ? "star star--big"
        : i % 9 == 0 ? "star star--medium" : "star";
    // random everywhere!
    div.setAttribute(
      "style",
      `top:${Math.round(Math.random() * wH)}px;left:${Math.round(
        Math.random() * wW
      )}px;animation-duration:${Math.round(Math.random() * 3000) +
        3000}ms;animation-delay:${Math.round(Math.random() * 3000)}ms;`
    );
    document.body.appendChild(div);
  }
};

generateStars(150);
  
}
}
export default Canvas2;

