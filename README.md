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
[
  {
    id: number,
    strain_id: number,
    strain: string,
    type: string,
    rating: float,
    description: string,
    effects: array,
    flavors: array,
    is_favorite: boolean
  },
  ...
]
```

#### `[GET] /api/strains/:strain_id` !restricted

A successful `get` request with a valid `strain_id` will return a single strain from the database.

##### Response Object

```
{
  id: integer,
  strain_id: integer,
  strain: string,
  type: string,
  rating: float,
  description: string,
  effects: array,
  flavors: array,
  is_favorite: boolean
}
```

#### `[POST] /api/strains/recommendations` !restricted

A successful `post` request with a valid request body will return a list of recommended strains from the database.

##### Request Body

```
{
  filters: ['list','of','user','selected','filters'], // required, typeof array
  limit: 5 // optional, typeof integer, defaults to 10
}
```

##### Response Object

```
[
  {
    strain_id: integer,
    strain: string,
    type: string,
    rating: float,
    description: string,
    effects: array,
    flavors: array,
    is_favorite: boolean
  }
]
```

#### `[GET] /api/favorites/strains` !restricted

A successful `get` request will return a list of the logged in user's favorited strains.

##### Response Object

```
[
  {
    favorite_id: integer,
    strain_id: integer,
    strain: string,
    type: string,
    effects: array,
    flavors: array,
    rating: float,
    description: string,
    is_favorite: boolean
  },
  ...
]
```

#### `[POST] /api/favorites/strains` !restricted

A successful `post` request will return the favorite_id of the favorited strain.

##### Request Body

```
{ strain_id: integer }
```

##### Response Object

```
[
  integer
]
```

#### `[DELETE] /api/favorites/strains/:favorite_id` !restricted

A successful `delete` request will return the strain removed from the user's favorites list.

##### Response Object

```
  {
    id: integer,
    strain_id: integer,
    strain: string,
    type: string,
    effects: array,
    flavors: array,
    rating: float,
    description: string
  }
```

#### Treatments

#### `[GET] /treatments` !restricted

Returns a list of the current user's treatment plans

##### Response Object

```
[
  {
    id: integer,
    user_id: integer,
    strain: string,
    method: string,
    dosage: string,
    schedule: string,
    symptoms: string
  },
  ...
]
```

#### `[GET] /treatments/:treatment_id` !restricted

Returns a treatment plan with the provided treatment_id

##### Response Object

```
  {
    id: integer,
    user_id: integer,
    strain: string,
    method: string,
    dosage: string,
    schedule: string,
    symptoms: string
  }
```

#### `[POST] /treatments` !restricted

Returns the created treatment plan

##### Request Body

```
  {
    strain: string,
    method: string,
    dosage: string,
    schedule: string,
    symptoms: string
  }
```

##### Response Object

```
  {
    id: integer,
    user_id: integer,
    strain: string,
    method: string,
    dosage: string,
    schedule: string,
    symptoms: string
  }
```

#### `[PUT] /treatments/:treatment_id` !restricted

Returns the updated treatment plan

##### Request Body

You can update any nunmber of fields at a time that you want.
The `PUT` request requires at least one field present to update the treatment plan.


```
  {
    strain: string, //optional
    method: string, //optional
    dosage: string, //optional
    schedule: string, //optional
    symptoms: string //optional
  }
```

##### Response Object

```
  {
    id: integer,
    user_id: integer,
    strain: string,
    method: string,
    dosage: string,
    schedule: string,
    symptoms: string
  }
```

#### `[DELETE] /treatments/:treatment_id` !restricted

Returns confirmation of deleted treatment plan

##### Response Object

```
{
  message: string
}
```

## Database and Schema Design

## Local Development

## Testing

## Deployment
