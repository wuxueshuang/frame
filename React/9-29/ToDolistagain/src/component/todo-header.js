import React from 'react';
class TodoHeader extends React.Component {
  addITem(ev){//按下确定键触发的函数
    if(ev.keyCode===13){
      if(ev.target.value.trim()===""){
        return
      }
      console.log(ev.target)
      let newValue = ev.target.value
      ev.target.value=""
      this.props.addItemApp(newValue)
    }
  }
  render(){
    return (
      <header className="header" >
          <h1>todos</h1>
          <input 
            className="new-todo" 
            placeholder="请输入内容" 
            onKeyDown={this.addITem.bind(this)}
          />          
      </header>
    )
  }

}
export default TodoHeader;