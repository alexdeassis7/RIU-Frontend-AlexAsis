# RiuHeroesFrontendAlex

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve -o
```
## Run Test units 
ng test

## RUN in Docker containner:

### step 1 :
docker build -t riu-frontend .

### step 2:
docker run -d -p 8080:80 --name riu-frontend-container riu-frontend

access site http://localhost:8080/ or http://localhost:8080/add