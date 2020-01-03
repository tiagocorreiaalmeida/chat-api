# Chat API

[![Build Status](https://travis-ci.org/tiagocorreiaalmeida/chat-api.svg?branch=master)](https://travis-ci.org/tiagocorreiaalmeida/chat-api)

## Configuration

Create a .env file in the project root and fill the following variables:

| Variable                     | Description                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                         | Port that will be expose for the graphql endpoing                                                                                                       |
| MAILER_EMAIL                 | Gmail SMTP email used to send information to the users                                                                                                  |
| MAILER_PASSWORD              | Gmail SMTP password used to send information to the users                                                                                               |
| DB_HOST                      | Database host used by the server to connect                                                                                                             |
| DB_PORT                      | Database port used by the server to connect                                                                                                             |
| DB_USER                      | Database user used by the server to connect                                                                                                             |
| DB_PASSWORD                  | Database password used by the server to connect                                                                                                         |
| DB_NAME                      | Database name used by the server to connect                                                                                                             |
| REDIS_HOST                   | Redis host used by the server to connect                                                                                                                |
| REDIS_PORT                   | Redis port used by the server to connect                                                                                                                |
| REDIS_PASSWORD               | Redis password used by the server to connect                                                                                                            |
| JWT_SECRET                   | Secret used to protect jsonwebtoken tokens                                                                                                              |
| JWT_EXPIRATION               | Jsonwebtoken expiration, any value supported by expiresIn parameter from the package [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)         |
| JWT_REFRESH_TOKEN_EXPIRATION | Refresh Jsonwebtoken expiration, any value supported by expiresIn parameter from the package [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |

## Run the application

### For Production

```bash
docker-compose build
docker-compose up -d
```

### For Development

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### For Testing

```bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml build
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
```
