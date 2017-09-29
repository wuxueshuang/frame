import React from 'react';
import TodoHeader from './component/todo-header.js';
import TodoItem from './component/todo-item.js';
import TodoFooter from './component/todo-footer.js';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      list:this.props.list,
      idNum:3//记录id
    }
  }
  toggleAll(ev){//把所有的selected变为全选状态
    console.dir(ev.target)
    let checked = ev.target.checked;
    this.state.list.forEach((item)=>{
        item.selected = checked// 把所有的单选状态改为全选按钮的状态
    })
    this.setState({//重新设置数据状态
      list: this.state.list
    })
    //console.log(this.state.list)
  }
  toggleItemApp(id){//监听item点击单选按钮的函数
    let arr1 = this.state.list;
    let changeItem = arr1.filter((item)=>{
        return item.id===id//过滤出点击的id对应的数据。需要注意的是filter方法返回的是一个数组，
    })
    changeItem[0].selected = !changeItem[0].selected//使用时用下标取值，点击时将自己的状态取反
    this.setState({
      list:arr1
    })
  }
  changeTitleApp(id,text){//监听编辑框更改内容的函数
    console.log(id,text+"  app")
    let arr=this.state.list.filter((item)=>{
      return item.id===id
    })
    console.log(arr)
    arr[0].title=text
    this.setState({
      list:this.state.list
    })
  }
  addItemApp(val){//监听添加Item的函数
    this.state.idNum++
    let arr = this.state.list
    arr.push({
      id:this.state.n,
      title:val,
      selected:false
    })
    this.setState({
      list:arr
    })
  }
  removeItemApp(id){//监听item点击删除按钮的函数
      console.log(id+"App")
      let arr = this.state.list
      arr.forEach((item,index)=>{
        if(item.id===id){
            arr.splice(index,1)
        }
      })
      this.setState({
        list:arr
      })
  }
  getSelectedNum(){
    let m = 0
    this.state.list.forEach((item)=>{
      if(item.selected===true){
        m++
      }
    })
    return m
  }
  getUnselectedNum(){//统计有多少消息未选中
    //console.log(this.state.list.length)
    //console.log(this.getSelectedNum())
    return this.state.list.length-this.getSelectedNum()
  }
  render(){
    let list = this.state.list;
    let content,footer;
    //判断一下中间内容部分和底部是否显示
    if(list.length){
      //在有数据的情况下，判断是有所有的数据都是选中的
      /*let n = 0;
      list.forEach((item)=>{
        if(item.selected){
          n++;
        }
      })*/
      let n = list.reduce((m,item2)=>{
        return item2.selected ?++m :m
      },0)
      content= <section className="main" >
                <input 
                  className="toggle-all"
                  type="checkbox"
                  checked={n===list.length}
                  onChange={this.toggleAll.bind(this)}
                />
                <ul className="todo-list">
                    {
                      list.map((item,index)=>{
                        return <TodoItem 
                          key={index}
                          {...item}
                          toggleItemApp={this.toggleItemApp.bind(this)}
                          changeTitleApp={this.changeTitleApp.bind(this)}
                          removeItemApp={this.removeItemApp.bind(this)}
                        ></TodoItem>
                      })
                    }
                </ul>
            </section>
      footer = <TodoFooter getUnselectedNum={this.getUnselectedNum.bind(this)} ></TodoFooter>
    }
    return (
      <section className="todoapp">
        <div>
          <TodoHeader addItemApp={this.addItemApp.bind(this)}></TodoHeader>
          {content}
          {footer}
        </div>
      </section>
    )
  }

}
export default App;