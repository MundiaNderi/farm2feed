# Farm2Feed Order Processing API

A Node.js/Express API for creating and managing customer orders with PostgreSQL.

## Requirements

### Docker

Docker Desktop is recommended for running the application and PostgreSQL database.

### Local development

If you prefer to run Node.js outside Docker:

- Node.js
- PostgreSQL

## Run with Docker

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd farm2feed
```

Start the API and PostgreSQL database:

```bash
docker compose up --build
```

The API runs on: http://localhost:3000

The PostgreSQL database runs on:

```text
localhost:5432
```

The Docker setup creates a PostgreSQL database named `farm_to_feed`.

The database schema is initialized automatically from:

```text
config/schema.sql
```

To stop the application:

```bash
docker compose down
```

To stop the application and remove the PostgreSQL volume:

```bash
docker compose down -v
```

> Removing the volume deletes the Dockerized database data.

## Run without Docker

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=farm_to_feed
```

Make sure PostgreSQL is running and the `farm_to_feed` database has been initialized using:

```text
config/schema.sql
```

Start the application:

```bash
node app.js
```

## Database Configuration

The application uses PostgreSQL.

When running with Docker Compose, the database is provided by the PostgreSQL container and initialized using `config/schema.sql`.

When running Node.js directly on the host machine, the database connection is configured using the `.env` variables.

The database contains:

- `customers`
- `products`
- `orders`
- `order_items`

## Tests

Run the test suite with:

```bash
npm test -- --no-watchman
```

Tests cover:

- Order calculations
- Discount boundaries
- Input validation
- Order-status transitions

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
- Docker Compose provides a reproducible PostgreSQL environment for development and evaluation.
- The database schema is stored in the repository so the database can be recreated consistently.

## Improvements

With more time, I would:

Complete and integrate the API routes with the service and database layers.
Add integration tests against PostgreSQL.
Add request validation with a validation library.
Add database migrations.
Add pagination and filtering for order listing.
Strengthen idempotency by validating request-body fingerprints.
Add authentication and authorization.
