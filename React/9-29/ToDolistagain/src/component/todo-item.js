import React from 'react';
class TodoItem extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isEdit:false,
      editValue:this.props.title
    }
  }
  removeItem(){//点击删除按钮触发的函数
      //console.log(this.props.id)
      this.props.removeItemApp(this.props.id)
  }
  toggleItem(){
    //通知父级我点击了
    //console.log(this.props.id+" :Item")
    this.props.toggleItemApp(this.props.id)
  }
  editTodo(){//双击显示信息栏时将isEdit的状态设置为true；
    this.beforeEditVal = this.props.title
    this.setState({
      isEdit : true
    },()=>{
       //编辑框获取光标,React中必须要操作dom元素才能获取光标，通过ref来获取元素通过
      // console.log(this.input)// 控制台打印出来的是input这个标签元素
       this.input.focus()// 在input行间中写上ref将这个input挂在实例上，这里用tis。input来获取
       this.input.setSelectionRange(this.input.value.length,this.input.value.length)
      })
  }
  editText(ev){//编辑框执行的函数
    this.setState({
      editValue : ev.target.value
    })
    console.log(this.state.editValue)
    this.props.changeTitleApp(this.props.id,ev.target.value)//通知父级更改数据中的内容
  }
  editBlurFn(){//失去焦点
    this.setState({
      isEdit : false
    })
    console.log("失去焦点")
  }
  keyDown(ev){//键盘事件
    if(ev.keyCode===13){
      this.editBlurFn()
    }
    if(ev.keyCode===27){
      this.setState({
        isEdit : false
      })
      this.props.changeTitleApp(this.props.id,this.beforeEditVal)//通知父级更改数据中的内容
      this.beforeEditVal =""
     /*这里有一个坑，在按下取消键的时候先键盘的取消事件然后触发了失去焦点事件，所以要改变通知父级改数据的时机，
      这里我选择了把在失去焦点的时候通知父级这个代码挪到编辑内容的函数里，这样如果只是失去焦点就不会触发取消
      编辑事件，如果有取消编辑事件也会放到编辑触发的函数之后在执行，这样就不会有冲突了；*/
     // console.log("取消")
    }
  }
  render(){
    let completed = this.props.selected ?'completed':""//completed这个class名控制文字是否有删除线，通过传过来的数据中的selected决定
    let editing = this.state.isEdit?"editing":""// 根据是否双击添加editingclass名，来实现展示框和编辑框之间的切换
    return (
      <li className={completed+" "+editing}>
        <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={this.props.selected} 
              onChange={this.toggleItem.bind(this)}
            />
            <label
              onDoubleClick = {this.editTodo.bind(this)}//双击触发的函数
            >{this.props.title}</label>
            <button 
              className="destroy"
              onClick={this.removeItem.bind(this)} 
            ></button>
        </div>
        <input 
          ref={(input)=>{this.input=input}}
          className="edit" 
          value={this.props.title}
          onChange={this.editText.bind(this)}
          onBlur={this.editBlurFn.bind(this)}
          onKeyDown={this.keyDown.bind(this)}
        />
    </li>
    )
  }

}
export default TodoItem;