# 🚀MERNCourse

This repository is part of a MERN course exploring different technologies and creating projects using those technologies individually and then implementing them together in a project.

## 🖥️ Tech 

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" width="52" alt="mongodb logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" width="52" alt="react logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="52" alt="nodejs logo"  />
</div>

----

###


## 📌Running Proyects

To run index.js & mongodb.js

```bash
  nodemon mongodb.js
```

todo-app

```bash
  npm start
```

## 🎯API Reference Index.js & Mongodb.js 

#### Get all books

```http
  GET /api/books
```

#### Get books

```http
  GET /api/books/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`      | `int`    | **Required**. Id of book to fetch |

#### Insert book

```http
  POST /api/books/addBook
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Name`    | `String` | **Required**. Name of book to insert |

#### Update book

```http
  PUT /api/books/:id
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------        |
| `Id`      | `Int`    | **Required**. Id of book to update       |
| `Name`    | `String` | **Required**. New name of book to update |

#### Delete books

```http
  DELETE /api/books/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`      | `int`    | **Required**. Id of book to delete|





## 🖥️Author

- [@HectorUlisesStamatio](https://www.github.com/hectorulisesstamatio)


