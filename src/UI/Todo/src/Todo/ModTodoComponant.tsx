import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import ITodoItem from './Objects/Abstractions/ITodoItem'
import TodoItem from './Objects/TodoItem'
import TodoService from './Services/TodoService';
import ITodoList from './Objects/Abstractions/ITodoList';
import { observer } from 'mobx-react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'

interface IProps
{
    item : ITodoItem | null;
    list: ITodoList;
    show?: boolean;
    onShow?: () => void;
    onHide: () => void; 
}

interface IState{
    item : ITodoItem;
}

@observer
export default class ModTodoComponant extends Component<IProps, IState>
{

    constructor(props) {
        super(props);
            
        this.state = { 
            item : new TodoItem
        };
        
    }

    OnChange = (e) => {
        this.state.item[e.target.name] = e.target.value;
    }
    
    OnChangeDate = (e) =>
    {
        this.state.item.completeBy =  e;
    }

    componentWillMount = () =>{
    }


    Submit = () =>
    {
        if(this.state.item.id == "")
        {
             TodoService.Add(this.state.item).then((response) => { 
                if(response != "")  
                {
                    var newItem = new TodoItem
                    newItem.id = response; 
                    newItem.title = this.state.item.title; 
                    newItem.description = this.state.item.description;      
                    newItem.completeBy = this.state.item.completeBy; 
                    this.props.list.Add(newItem);
                }
                else
                    alert("Add Failed");
             });
        }
        else
        {
            let item = this.props.list.Items.find(x => x.id == this.state.item.id);
            if(this.props.item == null) 
            {
                alert("Could not find Item to edit.");  
            }
            else{

                if(TodoService.Edit(this.state.item).then((response) => { 
                    if(!response)
                        alert("failed to edit item.");
                    return response;
                }))
                { 
                    this.props.item.title = this.state.item.title; 
                    this.props.item.description = this.state.item.description;      
                    this.props.item.completeBy = this.state.item.completeBy; 
                }
            }            
                
        }
          
        this.props.onHide();
    }

    Show = () => 
    {
        if(this.props.item != null)
        {
            this.state.item.id = this.props.item.id
            this.state.item.title = this.props.item.title
            this.state.item.description = this.props.item.description
            this.state.item.completeBy =  this.props.item.completeBy
        }
    }

    public render()
    {     
        
        
        return(<Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" onShow={ this.Show } >
            <Modal.Header closeButton>
                <Modal.Title>Add New To-do</Modal.Title>
            </Modal.Header>        
            <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="InputTodoTitle">Todo Name</label>
                        <input type="text" className="form-control" id="InputTodoTitle" placeholder="Enter a Todo name.." 
                        onChange={ this.OnChange } name="title" value={this.state.item.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputTodoDescription">Todo Description</label>
                        <textarea rows={4} className="form-control" id="InputTodoDescription"
                        onChange={ this.OnChange } name="description" placeholder="Enter a Description.." value={this.state.item.description}  />
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={this.state.item.completeBy} emptyLabel="Complete by date.." onChange={ this.OnChangeDate }></DateTimePicker>
                    </MuiPickersUtilsProvider>
            </Modal.Body>
        
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                <Button variant="primary" onClick={this.Submit}>Save changes</Button>
            </Modal.Footer>
      </Modal>);
    }

}