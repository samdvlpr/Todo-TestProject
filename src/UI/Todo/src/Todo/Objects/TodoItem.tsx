import { observable } from "mobx";
import ITodoItem from './Abstractions/ITodoItem'

export default class TodoItem implements ITodoItem{
    @observable
    id: string = "";    
    @observable
    title: string = "";
    @observable
    description: string = "";
    created:string = "";    
    @observable
    completeBy:string | null = null;
    @observable
    isComplete: boolean = false;
}