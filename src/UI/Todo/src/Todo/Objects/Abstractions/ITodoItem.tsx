export default interface ITodoItem
{
    id : string;
    title : string;
    description: string;
    created:string;    
    completeBy:string | null;
    isComplete : boolean;
}