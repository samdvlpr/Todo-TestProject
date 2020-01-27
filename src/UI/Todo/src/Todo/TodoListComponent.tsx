import React, { Component } from 'react'
import TodoItemComponent from './TodoItemComponent'
import ITodoList from './Objects/Abstractions/ITodoList';
import TodoList from './Objects/TodoList';
import { observable, computed } from 'mobx';
import ITodoItem from './Objects/Abstractions/ITodoItem';


interface IProps{   
}

interface IState 
{
    list : ITodoList
}

class State implements IState
{
    constructor(todolist : ITodoList)
    {
        this.list = todolist
    }

    @observable
    list : ITodoList
    
}

export default class TodoListComponent extends Component<IProps, IState> {
    

    constructor(props)
    {
        super(props);
        this.state= new State(new TodoList([]));        
    }

    OnCompleted = (item:ITodoItem) =>
    {
        /*TODO: update list if not showing completed*/
    }

    public render()
    {
        if(this.state.list?.IsEmpty)
        {
            return (<div className="text-center p-3">** No Items loaded **</div>);
        }
        return (this.state.list.GetItems.map(listitem => {
            return (<div className="list-group" key={ listitem.id } >
                <TodoItemComponent key={ listitem.id } item={ listitem } OnCompleted={this.OnCompleted} />
            </div>)
            }));
    }
};

