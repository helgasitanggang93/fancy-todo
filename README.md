# fancy-todo

## Signup

- END POINT = /todos/signup

- METHODS = POST

- INPUT = body{name, email, password}

- OUTPUT(SUCCESS) = 201{msg: register success}

- OUTPUT(ERROR) = 400{error}

## Login 

- END POINT = /todos/login

- METHODS = POST

- INPUT = body{email, password}

- OUTPUT(SUCCESS) = 201{msg:you have successly logged in, token}

- OUTPUT(ERROR) = 400{error}

## Create todo
- END POINT = /todos

- METHODS = POST

- INPUT = body{title, status, due_date}

- OUTPUT(SUCCESS) = 201{_id,title,description,status,due_date,user_Id}

- OUTPUT(ERROR) = 400{error}

## Show data todo
- END POINT = /todos

- METHODS = GET

- INPUT = -

- OUTPUT(SUCCESS) = 200{_id,title,description,status,due_date,user_Id}

- OUTPUT(ERROR) = 404{error}

## Complete todo

- END POINT = /todos/:id

- METHODS = PATCH

- INPUT = params{id:todoID}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Delete todo

- END POINT = /todos/:id

- METHODS = DELETE

- INPUT = params{id:todoID}

- OUTPUT(SUCCESS) = 201{message}

- OUTPUT(ERROR) = 400{error}

## Google sign in

- END POINT = /todos/:id

- METHODS = DELETE

- INPUT = body{email,password}

- OUTPUT(SUCCESS) = 200 { message, token, details }

- OUTPUT(ERROR) = 400{error}




