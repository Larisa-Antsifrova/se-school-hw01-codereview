![Banner](./tools-banner.png)

# Web API - Software Engineering School

## Endpoints

### / - Home

Endpoint returns welcome message with basic information about other endpoints.

#### Home endpoint request

```shell

GET /

```

#### Home endpoint response

```shell

Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "message": "Welcome! Please visit /user/create endpoint to register or /user/login to login.
  Once logged in you can visit /btcRate to learn what current bitcoin rate is."
  }

```

### /user/create - Registration of new user

Endpoint for registering new users.

- Email and password are required. Name is optional.
- If no name is provided, 'Guest' is set as default.
- Email and password fields are validated.
- If the email is already in use, the error of conflict is returned.
- If validation is successful and email is unique, the password is hashed and the new user is saved in database.
- No authentication token is returned in case verification stage will be added (for example, verification via e-mail).

#### Registration request

```shell

POST /user/create
Content-Type: application/json
RequestBody: {
  "name": "Software Engineering School",
  "email": "software@engineering.school",
  "password": "ses123456"
}

```

#### Registration validation error

```shell

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Joi validation message>

```

#### Registration conflict error

```shell

Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "This email is already in use."
}

```

#### Registration success response

```shell

Status: 201 Created
Content-Type: application/json
ResponseBody: {
  message: "You have successfully registered."
}

```

### /user/login - Logging in a user

Endpoint to authenticate a user.

- Email and password are required.
- Email and password fields are validated only for their presence.
- If a user with the provided e-mail and or password does not exist in database, general error message is returned.
- If validation is successful and credentials are right, the JSON Web Token is created and returned.
- JWT has limited life span.

#### Login request

```shell

POST /user/login
Content-Type: application/json
RequestBody: {
  "email": "software@engineering.school",
  "password": "ses123456"
}

```

#### Login validation error

```shell

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  "message": "<field> is required"
}

```

#### Login authentication error

```shell

Status: 401 Unauthorized
ResponseBody: {
  "message": "Invalid credentials."
}

```

#### Login success response

```shell

Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "message": "You have successfully logged in.",
  "user": {
      "name": "Software Engineering School",
      "email": "software@engineering.school",
      "token": "header.payload.signature"
    }
}

```

### /btcRate - Current BTC to UAH rate information

Endpoint to provide current rate of BTC to UAH.

- The endpoint is available only for authenticated users.
- isAuthenticated middleware verifies JWT in Authorization header (Bearer token).
- If the provided JWT is valid the endpoint returns current rate of 1 BTC to UAH.
- [Coinlayer API](https://coinlayer.com/documentation) is used to get the rate.

#### Current BTC to UAH rate request

```shell

GET /btcRate

```

#### Rate response

```shell

Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "timestamp": 1624571946,
  "target": "UAH",
  "rates": {
      "BTC": 958151.489893
    }
  }

```

## Structure

| File/Folder  | Description                                                 | Example                     |
| :----------- | :---------------------------------------------------------- | :-------------------------- |
| index.js     | Project's entry point                                       | -                           |
| .example.env | Provides info about what environment variables are expected | API_KEY                     |
| routes       | Keeps all projects endpoints                                | /user/create, /user/login   |
| controllers  | Keeps endpoints handlers                                    | -                           |
| db           | Keeps imitation of a local database                         | -                           |
| repositories | Keeps methods to work with database                         | -                           |
| services     | Keeps methods to work with external services                | Coinlayer                   |
| middleware   | Keeps middleware functions                                  | isAuthenticated, validation |
| helpers      | Keeps project's constants and configs                       | HTTP codes, API limiter     |

## Tools and resources

- JavaScript (Node.js) - as primary language.
- [Express](https://expressjs.com/) - Node.js web application framework.
- [Axios](https://www.npmjs.com/package/axios) - for fetch requests from external service.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - for hashing passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - for generating, signing, verifying JWT.
- [helmet](https://www.npmjs.com/package/helmet) - for securing the Web API.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - for setting rate limits on requests to the Web API.
- [Joi](https://joi.dev/api/) - for validating data provided in POST requests.
- [Coinlayer](https://coinlayer.com/documentation) - external API to get current rate information from.
