import React, { Component } from 'react';
import  TodoListComponent  from "./Todo/TodoListComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Navbar'
import AddTodoComponant from './Todo/AddTodoComponant'
import TodoService from './Todo/Services/TodoService';
import TodoItem from './Todo/Objects/TodoItem';
import TodoList from './Todo/Objects/TodoList';
import { observable } from 'mobx';
import './App.scss'
import { observer } from 'mobx-react';

interface IProps {

}

class State
{
  @observable
  list: TodoList = new TodoList([]);
  @observable
  includeComplete : boolean = false;
}

@observer
class App extends Component<IProps, State> {
  TodoListComponent : TodoListComponent | null = null;

  constructor(props : IProps) {
    super(props);
    this.state = {
      list : new TodoList([]),
      includeComplete : false
    };
  }
  
  async componentWillMount() {
    await this.LoadList(this.state.includeComplete)
  }

  async LoadList(includeCompleted : boolean)
  {
    var loadedlist = await TodoService.Get(includeCompleted);
    this.setState({list : loadedlist});
  }

  ATDCRef!: AddTodoComponant | null;
  
  render()
  {
      const state = this.state;
      let button;
      if(this.state.includeComplete)
      {
        button =  <button onClick={this.ToggleIncludeComplete} className="btn btn-primary mr-1" >Hide Completed</button>;
      }
      else{
        button =  <button onClick={this.ToggleIncludeComplete} className="btn btn-primary mr-1">Show Completed</button>;
      }

    return (
      <div className="App">
        <AddTodoComponant  ref={ATDC => { this.ATDCRef = ATDC; }}  OnAdd={ this.OnAdd } test={true} />
        <Navbar/>
        <div className="d-flex justify-content-center p-3 bg-dark sticky-top">
            {button}
            <button className="btn btn-success ml-1" onClick={ this.AddTodoClick }>Add New To-do</button>            
        </div>
        <TodoListComponent list={this.state.list}  ShowCompleted={this.state.includeComplete}/>
        <div className="d-flex justify-content-center p-3 bg-dark fixed-bottom">

        </div>
      </div>
    );
  }
  
  OnAdd = (todoItem: TodoItem) =>
  {
    this.state.list.Items.push(todoItem);
  }

  AddTodoClick = () => 
  {
    this.ATDCRef?.openModal();
  }

  ToggleIncludeComplete = () =>
  {
    this.setState({includeComplete : !this.state.includeComplete });
    this.LoadList(!this.state.includeComplete)
  }

}

export default App;
