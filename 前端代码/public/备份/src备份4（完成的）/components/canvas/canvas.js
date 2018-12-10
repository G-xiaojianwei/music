import React, { Component } from 'react';
import './canvas.css';
class Canvas extends Component {
  constructor(){
    super();
    this.state={
      list:[]
    }
  }
  render() {
    return (
      <div className="container">
       {
            this.state.list.map((item,index)=>{
              return <div className="circle-container" key={index}>
                      <div className="circle"></div>
                    </div>
            })

       }
      </div>
    );
  }
  componentDidMount(){
    var re=[];
    for(var i=0;i<100;i++){
      re.push(i);
    }
    this.setState({
      list:re
    })
  }
  
}
export default Canvas;

