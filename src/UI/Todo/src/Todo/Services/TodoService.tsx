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

    static async Add(todoItem : ITodoItem)
    {      
        let body = JSON.stringify(todoItem);

        console.log(body);

        const myRequest = new Request(this.endpoint, {
          method: 'Post',
          mode: 'cors',
          headers: this.headers,
          body: body
        });
                  

        await fetch(myRequest);  
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
}