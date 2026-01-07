# TaskForPear

**TaskForPear** is a full-stack project consisting of a **.NET Core Web API** backend and an **Angular frontend**. This README will guide you through setting up and running the project locally.

---

## Table of Contents

* [Prerequisites](#prerequisites)
* [Database Setup](#database-setup)
* [Backend Setup (API)](#backend-setup-api)
* [Frontend Setup (Angular)](#frontend-setup-angular)
* [Running the Application](#running-the-application)
* [Project Structure](#project-structure)
* [Notes](#notes)

---

## Prerequisites

Make sure you have the following installed:

* [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
* [SQL Server](https://www.microsoft.com/en-us/sql-server)
* [Node.js](https://nodejs.org/) (version 16+)
* [Angular CLI](https://angular.io/cli)
* [Visual Studio / VS Code](https://code.visualstudio.com/)

---

## Database Setup

1. Open **SQL Server Management Studio (SSMS)**.
2. Navigate to the project folder:

```
\Data\Script
```

3. Execute the SQL script to create the database and tables.
4. After running the script, your database is ready for the API.

---

## Backend Setup (API)

1. Open the **TaskForPear** project in **Visual Studio** or **VS Code**.
2. Edit the connection string in `appsettings.json` to match your SQL Server instance:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DATABASE;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

3. Restore NuGet packages (Visual Studio does this automatically, or run):

```bash
dotnet restore
```

4. Run the API project:

```bash
dotnet run
```

> The API will start and typically run at `https://localhost:5001` or `http://localhost:5000`.

---

## Frontend Setup (Angular)

1. Navigate to the Angular project folder:

```
FrontEndAngular
```

2. Edit the environment file (`src/environments/environment.ts`) to point to your API URL:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api' // match your running API
};
```

3. Install Angular dependencies:

```bash
npm install
```

4. Run the Angular project:

```bash
ng serve
```

> The frontend will typically run at `http://localhost:4200`.

---

## Running the Application

1. Start the **API** first (TaskForPear project).
2. Then start the **Angular frontend**.
3. Open your browser and navigate to `http://localhost:4200` to access the app.

---

## Project Structure

```
TaskForPear/           # .NET Core Web API
    appsettings.json   # Connection strings and config
    Controllers/       # API controllers
    Data/              # Database context & scripts
    Models/            # Entity models
FrontEndAngular/       # Angular frontend
    src/environments/  # Environment files
    src/app/           # Components, services, models
```

---

## Notes

* Do **not commit** `node_modules/` or `.vs/` folders.
* Ensure your SQL Server allows connections from your API project.
* If you change the API URL, update the Angular environment file accordingly.
* Use Postman or Swagger (if enabled) to test API endpoints.
