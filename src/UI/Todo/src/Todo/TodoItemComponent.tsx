import React, { Component } from "react"
import TodoItem  from './Objects/TodoItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import TodoService from "./Services/TodoService";

interface IProp{
    item : TodoItem
    OnCompleted(item:TodoItem)
}

export default class TodoItemComponent extends Component<IProp> {

    public render()
    {
        const Item = this.props.item;

        let button;

        if(!Item.isComplete)
        {
            button = <button type="button" className="btn btn-success"
            onClick={this.MarkAsComplete}>Mark as compltete</button>
        }
        else
        {
            button = <button type="button" className="btn btn-primary"
            onClick={this.ReOpen}>Reopen</button>
        }

        return (
            <div className="list-group-item">                
                <div className="d-flex w-100 justify-content-between">
                    <div className="col-sm-2 d-flex align-items-center justify-content-center">
                        {button}
                    </div>
                    <div className="col-sm-8">
                        <h5 className="mb-1">{ Item.title }</h5>
                        <small><strong>complete by: </strong>unknown date</small>
                        <p className="mb-1">{ Item.description }</p>    
                    </div>
                    <div className="col-sm-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className="m-1 pointer" icon={faEdit} onClick={this.onEditClick}/>    
                        <FontAwesomeIcon className="m-1 pointer" icon={faTrash} onClick={this.onDeleteClick}/>                    
                    </div>
                </div>
            </div>
        );
    }
    
    MarkAsComplete = () =>
    {        
        if(window.confirm("Are you wish complete this todo?"))
        {
            TodoService.MarkComplete(this.props.item.id);
            this.props.OnCompleted(this.props.item);
        }
    }
    
    ReOpen = () =>
    {        
        if(window.confirm("Are you wish to revert this todo from complete?"))
        {
            alert(`reopen id:${this.props.item.id}`);
        }
    }

    onDeleteClick  = () =>
    {
        window.confirm("Are you sure you wish to delete this todo?")
        {
            alert(`Delete id:${this.props.item.id}`);
        }
    }

    onEditClick = () =>
    {
        alert(`Send item with id:${this.props.item.id} for delete`);
    }

    onToggleCompleted = () => { 
        const todo = this.props.item;
        todo.isComplete = !todo.isComplete;
    }
}
