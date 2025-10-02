
# 📦 Product Service API

A NestJS + Prisma-based API for managing products, categories, items, and variations.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
```

### 4. Database migration

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

(Optional: If you only want to push schema without migrations)

```bash
npx prisma db push
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```
### 6. Seef The Database

```bash
npx prisma db seed
```

### 6. Run the application

```bash
npm run start:dev
```

The API will be available at:

```
http://localhost:3000
```

---

## 🧪 Testing the API


* Get all products:

```
GET http://localhost:3000/products
```

* Filter products by name:

```
GET http://localhost:3000/products?name=super
```

* Filter by price range:

```
GET http://localhost:3000/products?minPrice=10&maxPrice=50
```

* Pagination:

```
GET http://localhost:3000/products?limit=5&offset=10
```



