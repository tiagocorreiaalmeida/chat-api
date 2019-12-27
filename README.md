# Chat API

[![Build Status](https://travis-ci.org/tiagocorreiaalmeida/chat-api.svg?branch=master)](https://travis-ci.org/tiagocorreiaalmeida/chat-api)

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
