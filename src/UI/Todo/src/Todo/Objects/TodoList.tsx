import { observable, computed } from "mobx";
import ITodoItem from './Abstractions/ITodoItem'
import ITodoList from './Abstractions/ITodoList'

export default class TodoList implements ITodoList
{
    @observable
    Items: ITodoItem[] = []

    constructor(todoItems : ITodoItem[])
    {
        this.Items.push(...todoItems)
    }

    Add(todoItem : ITodoItem):void
    {
        this.Items.push(todoItem);
    }

    @computed get GetItems():ITodoItem[]
    {
        return this.Items;
    }

    /*todo: make computed*/
    @computed get Count():number
    {
        return this.Items.length;
    }

    /*todo: make computed*/
    @computed get IsEmpty(): boolean
    {
        return (this.Count === 0);
    }
}
