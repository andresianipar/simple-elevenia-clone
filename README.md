# Simple Elevenia Clone

Simple Elevenia marketplace web app clone. Developed with Node.js, Hapi.js, connected to PostgreSQL

# Installation

1. npm install
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. npx sequelize-cli db:seed:all

> [Read more about Sequelize](https://sequelize.org/v7/manual/migrations.html)

# Starting the application

To run locally (development mode):
```
export POSTGRES_URI="postgres://postgres:postgres@0.0.0.0:5321/elevenia"
npm run start:dev
```

To run inside container (production mode):
```
docker-compose up -d postgres
docker-compose up -d app
```

# Testing
```
```

# Authentication and Authorization
```
```

# APIs

- Pull initial products route
```
curl -v "http://0.0.0.0:8080/v1/pull-initial-products"
```

## Product routes
- Create products
```
curl -v -X POST "http://0.0.0.0:8080/v1/products" \
-d '{"name": "product 1", "code": "123-456-789", "image": "", "price": 10000, "description": ""}' \
-H "Content-Type: application/json; charset=utf-8" | jq
```

- List products
```
curl -v "http://0.0.0.0:8080/v1/products?page=1&per_page=10" | jq
```

- Show product
```
curl -v "http://0.0.0.0:8080/v1/products/{productId}" | jq
```

- Update product
```
curl -v -X PUT "http://0.0.0.0:8080/v1/product/{productId}" \
-d '{"name": "product 2", "code": "123-456-789", "image": "", "price": 10000, "description": ""}' \
-H "Content-Type: application/json; charset=utf-8" | jq
```

- Delete product
```
curl -v -X DELETE "http://0.0.0.0:8080/v1/product/{productId}" | jq
```

## Transaction routes
```
```
