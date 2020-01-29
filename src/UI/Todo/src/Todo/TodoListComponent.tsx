import React, { Component } from 'react'
import TodoItemComponent from './TodoItemComponent'
import ITodoList from './Objects/Abstractions/ITodoList';
import ITodoItem from './Objects/Abstractions/ITodoItem';
import { observer } from 'mobx-react';


interface IProps{  
    list : ITodoList 
    ShowCompleted:boolean
}


@observer
export default class TodoListComponent extends Component<IProps> {    

    constructor(props)
    {
        super(props);   
    }

    OnCompleted = (item:ITodoItem) =>
    {
        if(!this.props.ShowCompleted)
        {
            const index: number = this.props.list.Items.indexOf(item);
            if (index !== -1) {
                this.props.list.Items.splice(index, 1);
            }  
        }
        else
        {
            item.isComplete = true
        }
        /*TODO: update list if not showing completed*/
    }

    OnReOpen = (item:ITodoItem) =>
    {
        item.isComplete = false
    }

    public render()
    {
        if(this.props.list?.IsEmpty)
        {
            return (<div className="text-center p-3">** No Items loaded **</div>);
        }
        return (this.props.list.GetItems.map(listitem => {
            return (<div className="list-group" key={ listitem.id } >
                <TodoItemComponent key={ listitem.id } item={ listitem } OnCompleted={this.OnCompleted} OnReOpen={this.OnReOpen} />
            </div>)
            }));
    }
};

