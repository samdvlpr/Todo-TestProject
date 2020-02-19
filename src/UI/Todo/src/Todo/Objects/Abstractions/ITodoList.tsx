import ITodoItem from './ITodoItem'

export default interface ITodoList {
    Items : ITodoItem[]
    Count : number;
    IsEmpty : boolean;   
    GetItems : ITodoItem[];
    Add : (todoItem : ITodoItem) => void;
}