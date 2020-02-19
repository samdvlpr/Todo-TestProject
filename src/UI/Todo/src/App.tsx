import React, { Component } from 'react';
import  TodoListComponent  from "./Todo/TodoListComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Navbar'
import ModTodoComponant from './Todo/ModTodoComponant'
import TodoService from './Todo/Services/TodoService';
import TodoList from './Todo/Objects/TodoList';
import { observable } from 'mobx';
import './App.scss'
import { observer } from 'mobx-react';
import ITodoList from './Todo/Objects/Abstractions/ITodoList';
import ITodoItem from './Todo/Objects/Abstractions/ITodoItem';
import TodoItem from './Todo/Objects/TodoItem';

interface IProps {
}

class State
{
  @observable
  list: ITodoList = new TodoList([]);
  @observable
  includeComplete : boolean = false;
  showAddModal : boolean = false;
  editItem : ITodoItem | null = null
}

@observer
class App extends Component<IProps, State> {
  TodoListComponent : TodoListComponent | null = null;

  constructor(props : IProps) {
    super(props);
    this.state = {
      list : new TodoList([]),
      includeComplete : false,
      showAddModal : false,
      editItem : null
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
  
  render()
  {    
    let button =  <button onClick={this.ToggleIncludeComplete} className="btn btn-primary mr-1" >{(this.state.includeComplete ? "Hide Completed" : "Show Completed")}</button>;
      
    return (
      <div className="App">
        <ModTodoComponant show={this.state.showAddModal} 
          onHide={ this.OnHide }
          list={ this.state.list } item={ this.state.editItem ?? new TodoItem }  />
        <Navbar/>
        <div className="d-flex justify-content-center p-3 bg-dark sticky-top">
            {button}
            <button className="btn btn-success ml-1" onClick={ this.OnAddClick }>Add New To-do</button>            
        </div>
        <div className="list-container">
          <TodoListComponent list={ this.state.list }  showCompleted={this.state.includeComplete} 
            onEditClick={ this.OnEditClick }/>
        </div>
        <div className="d-flex justify-content-center p-3 bg-dark fixed-bottom">

        </div>
      </div>
    );
  }

  OnHide = () => { this.setState({showAddModal: false}) }
  
  OnEditClick = (item:ITodoItem) => { this.setState({ editItem : item, showAddModal: true }) }

  OnAddClick = () => { this.setState({showAddModal: true, editItem : new TodoItem }) } 

  ToggleIncludeComplete = () =>
  {
    this.setState({includeComplete : !this.state.includeComplete });
    this.LoadList(!this.state.includeComplete)
  }

}

export default App;
