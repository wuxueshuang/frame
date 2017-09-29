import React from 'react';
class TodoFooter extends React.Component {
  
  render(){
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.getUnselectedNum()}</strong>
          <span>条未选中</span>
        </span>
      </footer>
    )
  }

}
export default TodoFooter;