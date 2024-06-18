# Akinaprematur API Documentation

## Models

### User

```md
- username : string, required, unique
- email : string, required, unique, isEmail
- password : string, required
```

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `POST /game`

Routes below need authentication & authorization:

- `PUT /edit/:id`
- `DELETE /delete/:id`

## 1. POST /register

Request

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "message": "String",
  "user": {
      "id": integer,
      "username": "string",
      "email": "string",
      "password": "string",
      "updatedAt": "date",
      "createdAt": "date"
  }
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username cannot be empty"
}
OR
{
  "message": "Must be an email"
}
OR
{
  "message": "This email is already in use"
}
OR
{
  "message": "Password cannot be empty"
}
```

## 2. POST /login

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid login"
}
```

## 4. POST /game

Description:

- send input to the Akinaprematur to play the game.

### Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
{
  "userAnswer": "Yes",
}
OR
{
  "userAnswer": "No",
}

```

Response (200 - OK)

```json
{
  "Question": "What is on your mind? A Character? An Animal? An Object",
  "Guess": null
}
AFTER THAT
{
  "Question": "Is the character from a movie?",
  "Guess": ""
}
WHEN THE AKINAPREMATUR IS CONFIDENT ENOUGH TO MAKE A GUESS
{
  "Guess": "I think what your thinking of is (give your guess here). Am i correct?"
}
WHEN THE AKINAPREMATUR GUESS IS WRONG
{
  "Response": "I'll try to get it right next time. Wanna Play again?"
}
WHEN THE ANSWERED "YES" TO "WANNA PLAY AGAIN", AKINAPREMATUR WILL START THE GAME AGAIN
{
  "Question": "What is on your mind? A Character? An Animal? An Object",
  "Guess": null
}
WHEN THE ANSWERED "NO" TO "WANNA PLAY AGAIN"
{
  "Response": "Thanks for playing!"
}

```

## 6. PUT /edit/:id

Description:

- Editing user profile
- Authorization : Account's ownership

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Request

- body:
  
```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
```

Response (200 - OK)

```json
{
    "message": "string",
    "user": {
        "id": integer,
        "username": "string",
        "email": "string",
        "password": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

Response (403 - Forbidden)

```json
{
  "message": "You're not authorized"
}
```

## 7. DELETE /delete/:id

Description:

- Delete User Account
- Authorization : Account's ownership

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Gift has been deleted"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
