# Farm2Feed Order Processing API

A Node.js/Express API for creating and managing customer orders with PostgreSQL.

## Installation

```bash
npm install
```

## Run

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=farm_to_feed
```

Start the application:

```bash
node app.js
```

The API runs on `http://localhost:3000`.

## Database Configuration

The application uses PostgreSQL. Configure the database connection using the `.env` variables above.

The database should contain the `customers`, `products`, `orders`, and `order_items` tables.

## Tests

```bash
npm test -- --no-watchman
```

Tests cover order calculations, discount boundaries, validation, and order-status transitions.

## API Endpoints

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/orders`            | Create an order                 |
| GET    | `/orders/:id`        | Retrieve an order and its items |
| GET    | `/orders`            | List orders                     |
| PATCH  | `/orders/:id/status` | Update order status             |

## Assumptions

- The `unit_price` supplied in an order represents the price for that order item.
- Order totals and discounts are always calculated by the backend.
- Completed and cancelled orders cannot be modified.
- An `Idempotency-Key` is used to prevent duplicate orders from retried requests.

## Important Technical Decisions

- Business logic is separated into a service layer.
- Discount calculation and status transitions are isolated as reusable utilities.
- PostgreSQL transactions are used to create an order and its items atomically.
- Database constraints are used as an additional layer of validation.
- Monetary values are stored using PostgreSQL numeric/decimal types.

## Improvements

With more time, I would add:

- More integration tests against PostgreSQL.
- Request validation with a validation library.
- Database migrations.
- Pagination and filtering for order listing.
- Stronger idempotency validation using request-body fingerprints.
- Authentication and authorization.
