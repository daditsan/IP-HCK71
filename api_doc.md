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

- `PATCH /gifts/:id`
- `DELETE /gifts/:id`
- `PATCH /gifts/:id/claim`

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
  "id": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
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
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /vouchers

Description:

- Fetch all vouchers from database

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": 1,
    "title": "Thank You Gift Voucher",
    "tag": "general",
    "imageUrl": "https://cdn.dribbble.com/users/416805/screenshots/15604755/media/f279c6ce7d2ef61fe1b301ce6f1cd509.jpg?compress=1&resize=1600x1200"
  },
  {
    "id": 2,
    "title": "Christmas Gift Voucher",
    "tag": "christmas",
    "imageUrl": "https://cdn.dribbble.com/users/4540442/screenshots/9126525/media/0abbd18b7aa27a9835ae2f6ea4d61371.png?compress=1&resize=1600x1200"
  },
  {
    "id": 3,
    "title": "Christmas Gift Voucher 2",
    "tag": "christmas",
    "imageUrl": "https://cdn.dribbble.com/users/322873/screenshots/9152565/media/d2a7e512056ae61e1cb67d7b8d251ca5.jpg?compress=1&resize=1600x1200"
  },
  ...,
]
```

## 4. POST /gifts/:voucherId

Description:

- send voucher to other user. default status untuk gift adalah 'unclaimed' dan amount adalah 0

### Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "voucherId": "integer"
}
```

- body:

```json
{
  "message": "Happy Birthday My Friend",
  "amount" : 500000,
  "receiverId": 2
}
```

Response (201 - Created)

```json
{
  "id": 2,
  "message": "Happy Birthday My Friend",
  "senderId": 1,
  "amount": 500000,
  "voucherId": 1,
  "receiverId": 2,
  "status": "unclaimed"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Message is required"
}
OR
{
  "message": "receiverId is required"
}
```

Response (404 - Not Found)

```json
{
  "message": "Voucher not found"
}
```

## 5. GET /gifts

Description:

- Get current user gifts (recipient's ownership)

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": 2,
    "message": "Happy Birthday My Friend",
    "senderId": 1,
    "amount": 500000,
    "voucherId": 1,
    "receiverId": 2,
    "status": "unclaimed",
    "voucher": {
      "id": 1,
      "title": "Thank You Gift Voucher",
      "imageUrl": "https://cdn.dribbble.com/users/416805/screenshots/15604755/media/f279c6ce7d2ef61fe1b301ce6f1cd509.jpg?compress=1&resize=1600x1200"
    }
  }
]
```

## 6. PATCH /gifts/:id/claim

Description:

- Claim gift and update status to claimed 
- Authorization : recipient's ownership

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
  "message": "Gift has been claimed"
}
```

Response (404 - Not Found)

```json
{
  "message": "Gift not found"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You're not authorized"
}
```


## 7. DELETE /gifts/:id

Description:

- Delete Gift
- Authorization : recipient's ownership

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

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

Response (403 - Not Found)

```json
{
  "message": "You're not authorized"
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
