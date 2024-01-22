# PERN_TODO

## Introduction
PERN_TODO is a simple To-Do application built using the PERN stack (PostgreSQL, Express.js, React, and Node.js). The application consists of two main components: a client directory written using VITE for the frontend and a server directory written in Node.js with Express for the backend.

## Deployment on Render
The application's frontend and backend are deployed on Render. Render provides a seamless platform for deploying and scaling applications, making it easy to host PERN_TODO in a production environment.

## Local Setup

To run this application locally, follow these steps:

1. **Create a `.env` file**
   Create a `.env` file in the root of the server directory and set the `VITE_SERVER_URL` variable to your server's URL.

   ```env
   VITE_SERVER_URL="your_server_url"
   ```

2. ***Modify `db.js` in the server directory Remove the following lines from the db.js file:***
    ```
            connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    ```
    Replace them with your PostgreSQL connection details:
    ```
    user: "your_postgres_username",
    password: "your_postgres_password",
    host: "your_hostname",
    database: "your_database_name",
    port: 5432,

    ```

3. ***Run Database Script Execute the SQL script provided in database.sql to create the required table in your PostgreSQL database.***

4. ***Install Dependencies Navigate to both the client and server directories and install the dependencies:***
    ```
        cd client
        npm install

        cd ../server
        npm install

    ```

5. ***Run the Application Start the client and server separately:***
    Client:
    ```
        cd client
        npm run dev

    ```
    Server:
    ```
        cd ../server
        npm start


    ```