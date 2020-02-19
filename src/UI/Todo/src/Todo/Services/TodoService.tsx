import { config } from '../../config'
import ITodoList from '../Objects/Abstractions/ITodoList';
import TodoList from '../Objects/TodoList';
import ITodoItem from '../Objects/Abstractions/ITodoItem';

export default class TodoService {

    static headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
      })

    static endpoint : string = config.endpoints.todo
    static async Get(showComplete:boolean):Promise<ITodoList> {
        var list;
          
          const myRequest = new Request(`${this.endpoint}?IncludeCompleted=${showComplete}`, {
            method: 'GET',
            mode: 'cors',
            headers: this.headers,
          });
                    

          var fetching = fetch(myRequest)
          .then(response => {
            return response.json()
          })
          .then(data => 
            {
                list = new TodoList(data)
                return list === undefined ? new TodoList([]) : list;
            });                 

            var items = (await fetching); 
            console.log(items);
            return items;
    }

    static async Add(todoItem : ITodoItem): Promise<string>
    {      
        let body = JSON.stringify(todoItem);

        const myRequest = new Request(this.endpoint, {
          method: 'Post',
          mode: 'cors',
          headers: this.headers,
          body: body
        });
                  

        var val = await fetch(myRequest).then((response) => { 
          return response.text()
        }).catch(() => { return "" });  

        return val;
    }

    
    static async Delete(id: string) : Promise<boolean>
    {      
        const myRequest = new Request(`${this.endpoint}/delete?id=${id}`, {
          method: 'Post',
          mode: 'cors',
          headers: this.headers
        });
                  

        return await fetch(myRequest).then(() => { return true }).catch(() => { return false });  
    }
    
    static async Edit(todoItem : ITodoItem) : Promise<boolean>
    {      
        let body = JSON.stringify(todoItem);

        const myRequest = new Request(`${this.endpoint}/edit`, {
          method: 'Post',
          mode: 'cors',
          headers: this.headers,
          body: body
        });
                  

        return await fetch(myRequest).then(() => { return true }).catch(() => { return false });  
    }

    static async MarkComplete(id: string)
    {      

        const myRequest = new Request(`${this.endpoint}/MarkComplete?id=${id}`, {
          method: 'Post',
          mode: 'cors',
          headers: this.headers
        });
                  

        await fetch(myRequest);  
    }

    static async ReOpen(id: string)
    {      

        const myRequest = new Request(`${this.endpoint}/ReOpen?id=${id}`, {
          method: 'Post',
          mode: 'cors',
          headers: this.headers
        });
                  

        await fetch(myRequest);  
    }
}