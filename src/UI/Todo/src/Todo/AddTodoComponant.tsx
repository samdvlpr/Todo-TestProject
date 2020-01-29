import React, { Component } from 'react'
import $ from 'jquery'
import ITodoItem from '../Todo/Objects/Abstractions/ITodoItem'
import TodoItem from '../Todo/Objects/TodoItem'
import TodoService from './Services/TodoService';

interface IProps
{
    OnAdd(todoItem:ITodoItem);
    test : boolean;
}

interface IState{
    TodoItem : ITodoItem;
}


export default class AddTodoComponant extends Component<IProps, IState>
{

    constructor(props) {
        super(props);
        
        this.state = { 
            TodoItem : new TodoItem
        };

    }

    openModal()
    {
        alert(this.props.test)
        $('#AddTodoModel').modal('show');
        $(this.refs.InputTitle).val();
        $(this.refs.InputDescription).val("");
    }

    ClearModal = () =>
    {
        this.setState({TodoItem : new TodoItem()});
        $(this.refs.InputTitle).val("");
        $(this.refs.InputDescription).val("");
    }

    SubmitTodo = () =>
    {        
        TodoService.Add(this.state.TodoItem);
        this.ClearModal();
        $('#AddTodoModel').modal('hide');
        this.props.OnAdd(this.state.TodoItem);
    }

    render()
    {
        return (<div className="modal" id="AddTodoModel" 
            role="dialog" aria-labelledby="AddTodoModelTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">Add New To-do</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="InputTodoTitle">Todo Name</label>
                        <input type="text" className="form-control" id="InputTodoTitle" placeholder="Enter a Todo name.." 
                        onChange={e => this.state.TodoItem.title = e.target.value } ref="InputTitle" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputTodoDescription">Todo Description</label>
                        <textarea rows={4} className="form-control" id="InputTodoDescription"
                        onChange={e => this.state.TodoItem.description = e.target.value } ref="InputDescription" placeholder="Enter a Description.."  />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={ this.ClearModal } data-dismiss="modal">Close</button>
                    <button type="button" onClick={ this.SubmitTodo } className="btn btn-primary" >Add</button>
                </div>
                </div>
            </div>
         </div>);        
    }

}