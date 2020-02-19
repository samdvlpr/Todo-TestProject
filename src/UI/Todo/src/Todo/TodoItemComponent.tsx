import React, { Component } from "react"
import TodoItem  from './Objects/TodoItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import TodoService from "./Services/TodoService";
import { observer } from "mobx-react";
import ITodoItem from "./Objects/Abstractions/ITodoItem";
import Moment from 'react-moment';
import MomentUtils from "@date-io/moment";

interface IProp{
    item : ITodoItem
    OnCompleted(item:ITodoItem)
    OnReOpen(item:ITodoItem)
    OnEditClick(item:ITodoItem)
    OnDeleteClick(id:ITodoItem)
}

@observer
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
        var moment= new MomentUtils()

        const today = moment.parse(new Date().toString(), "");
        const completeBy = moment.parse(Item.completeBy?? "", "");

        const isBefore = moment.isBefore(today, completeBy);
        const isSoon = moment.isAfter(today.add(24, 'h'), completeBy)
        
        const date = Item.completeBy == null ? <span className="no-date" >Uknown Date</span> : 
        <Moment element="span" className={isBefore ? (isSoon ? "soon-date" : "future-date") :  "past-date"} fromNow>{Item.completeBy}</Moment>;
        
        return (
            <div className={ `list-group-item ${ Item.isComplete ? "complete-item" : "" }`}>                
                <div className="d-flex w-100 justify-content-between">
                    <div className="col-sm-2 d-flex align-items-center justify-content-center">
                        {button}
                    </div>
                    <div className="col-sm-8">
                        <h5 className="mb-1">{ Item.title }</h5>
                        { !Item.isComplete ?  <span><strong>Due: </strong>{ date }</span>                                                                                   
                         : 
                         <span><strong className="complete-date">Complete</strong></span>  }
                        <p className="mb-1">{ Item.description }</p>    
                    </div>
                    <div className="col-sm-2 d-flex align-items-center justify-content-center">
                        { !Item.isComplete ? <FontAwesomeIcon className="m-1 pointer" icon={faEdit} onClick={this.OnEditClick}/>  : "" }  
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
            TodoService.ReOpen(this.props.item.id);
            this.props.OnReOpen(this.props.item);
        }
    }

    OnEditClick = () =>
    {
        this.props.OnEditClick(this.props.item)
    }

    onDeleteClick  = () =>
    {
        window.confirm("Are you sure you wish to delete this todo?")
        {
            TodoService.Delete(this.props.item.id).then((response) => {
                if(!response)
                {
                    alert("Delete Failed");
                    return;
                }
                this.props.OnDeleteClick(this.props.item);
            })
        }
    }

    onToggleCompleted = () => { 
        const todo = this.props.item;
        todo.isComplete = !todo.isComplete;
    }
}
