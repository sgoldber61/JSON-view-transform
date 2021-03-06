import React, { Component } from 'react';
import IsObject from '../components/IsArray';
import Primitive from '../components/Primitive';

class IsArray extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: this.props.collapsed
    }
  }

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
    console.log(this.state.collapsed)
  }

  render() {
    const { name } = this.props
    const icon = this.state.collapsed ? '+' : '-';

    let display;
    if (!this.state.collapsed) {
      const obj = this.props.data
      const arr = Object.keys(obj)
      console.log(obj)
      const mapped = arr.map((e,i) => {
        if (obj[e] instanceof Array) {
          return <IsArray key={i} name={e} data={obj[e]} collapsed={true} indent={this.props.indent + 50}/>
        } else if (obj[e] !== null && typeof obj[e] === 'object') {
          return <IsObject key={i} name={e} data={obj[e]} collapsed={true} indent={this.props.indent + 50} />;
        } else {
          return <Primitive key={i} name={e} data={obj[e]} indent={this.props.indent + 50} />;
        }
      })
      display = mapped;
    } else {
      display = null
    }
    return (
      <div style={{ textIndent: `${this.props.indent}px` }}>
        <img src="https://www.computerhope.com/jargon/b/bracket.gif" style={{width: '25px', height:'25px', marginRight: '5px'}}></img>
        <button onClick={this.handleClick}> {icon} </button>
        {name}
        {display}
      </div>
    )
  }
}

export default IsArray;