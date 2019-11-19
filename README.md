# Medizen Server

Metadata store and api for Medizen.

Front end application: https://front-end-henna-mu.now.sh/

### [Product Vision Document](https://www.notion.so/meds/Product-Vision-3bad180a0bc24c09b27d1b9c4f30c4ba)

## Api Documentation

base URL: `https://medizen-api.herokuapp.com/api`

`!restricted` means the route requires a jwt token passed in the headers to access. Successful registration or login will provide you with a jwt token to use.

### Endpoints

#### `[POST] /auth/register`

##### Request Body

In order to create a user, send a post request to `https://medizen-api.herokuapp.com/api/auth/register` with a req body that looks like:

```
{
  email: "valid@email.com", // required, typeof string
  password: "minimumOfEightCharacters"// required, typeof string
}
```

##### Response Object

On successful creation of a user, the api with return an object that looks like this:

```
{
  user: {
    id: 19,
    email: "testers@lambda.com",
    firstname: null,
    lastname: null,
    role: null
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlcnNAbGFtYmRhLmNvbSIsImlhdCI6MTU3NDExOTU1OSwiZXhwIjoxNTc0MjA1OTU5fQ.Vzqm1WyWixoU4YjPF7Hcc9Znsbwz-gL2PttrsukHjgU"
}
```

Save the token, you will need it to make authenticated requests to restricted resources.

#### `[POST] /auth/login`

##### Request Body

In order to login a user, send a post request to `https://medizen-api.herokuapp.com/api/auth/register` with a req body that looks like:

```
{
  email: "valid@email.com", // required, typeof string
  password: "password"// required, typeof string
}
```

##### Response Object

On successful login of a user, the api with return an object that looks like this:

```
{
  message: "Welcome back testers@lambda.com!"
  user: {
    id: 19,
    email: "testers@lambda.com",
    firstname: null,
    lastname: null,
    role: null
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlcnNAbGFtYmRhLmNvbSIsImlhdCI6MTU3NDExOTU1OSwiZXhwIjoxNTc0MjA1OTU5fQ.Vzqm1WyWixoU4YjPF7Hcc9Znsbwz-gL2PttrsukHjgU"
}
```

Save the token, you will need it to make authenticated requests to restricted resources.

#### `[GET] /api/strains` !restricted

A successful `get` request will return a list of strains from the database.

Accepts `limit` and `offset` query params for pagination.

Default request will return first 20 items in the list.

Example url with `limit` and `offset` applied:

```
https://medizen-api.herokuapp.com/api/strains?limit=20&offset=0
// will return first 20 items in the list

https://medizen-api.herokuapp.com/api/strains?limit=20&offset=20
// will return 20 items starting at item 20

https://medizen-api.herokuapp.com/api/strains?limit=20&offset=40
// will return 20 items starting at item 40

// so on and so forth until there are no more items
```

##### Response Object

```
{
  id: number,
  strain_id: number,
  strain: string,
  type: string,
  rating: float,
  description: string,
  effects: array,
  flavors: array
}
```

#### `[GET] /api/strains/:strain_id` !restricted

A successful `get` request with a valid `strain_id` will return a single strain from the database.

##### Response Object

```
{
  id: number,
  strain_id: number,
  strain: string,
  type: string,
  rating: float,
  description: string,
  effects: array,
  flavors: array
}
```

## Database and Schema Design

## Local Development

## Testing

## Deployment
