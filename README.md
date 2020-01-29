# Test Project

A test project for myself to learn react/docker and anything else.

## Docker 

** NOTE: ** Building on dev env you should use User Secrets in the API 

To containerize the API.

```powershell 

# locate the DockerFile
PS C:\{REPO}\Todo-TestProject> cd src/todo
# build the API image 
PS C:\{REPO}\Todo-TestProject\src\todo> docker docker build --no-cache -t {YOUR_REG_NAME}/todo-api .

```
For my purposes I used docker swarm for the next step but if you wish to use kubernetes feel free to submit a *.yml* for this and add to the readme.

### Docker Swarm

make sure you have docker swarm up and running before carrying on.

firstly change the todo-stack.yaml changing {YOUR_REG_NAME} *(leave the ${APPDATA} bit)*

```yaml
version: '3.7'    

services:
  todo-app:
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
    image: {YOUR_REG_NAME}/todo-api:latest
    ports:
      - "8000:80"  
    volumes:
      - ${APPDATA}/Microsoft/UserSecrets:/root/.microsoft/usersecrets:ro
```

Then

```powershell 

# if you are sill in the src/todo
PS C:\{REPO}\Todo-TestProject\src\todo> cd ../..
# deploy a stack
PS C:\{REPO}\Todo-TestProject> docker stack deploy -c todo-stack.yaml demo

```
To make sure it works run the follwoing 

```powershell

PS C:\{REPO}\Todo-TestProject> docker service ls

```
you should get something similar

```powershell

ID                  NAME                MODE                REPLICAS            IMAGE                      PORTS
egskf0dnilt9        demo_todo-app       replicated          1/1                 samb1990/todo-api:latest   *:8000->80/tcp

```

