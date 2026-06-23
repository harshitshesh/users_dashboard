# User Management Dashboard

A simple web application to view, add, edit, and delete users using the JSONPlaceholder API.

---

## Tech Stack

- React + Vite
- Tailwind CSS v4
- JSONPlaceholder API

---

## Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-username/user-management-dashboard.git

# 2. Go into the project folder
cd user-management-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Features

- View all users fetched from `/users` endpoint
- Add a new user (simulated via POST)
- Edit an existing user (simulated via PUT)
- Delete a user (simulated via DELETE)
- Search across all fields
- Filter by first name, last name, email, and department
- Sort by any column
- Pagination with 10, 25, 50, 100 rows per page
- Form validation with error messages
- API error handling with error display
- Fully responsive UI

---

## Assumptions

- JSONPlaceholder does not persist data — add/edit/delete are simulated and reflected only in local state
- `name` field from API is split into `firstName` and `lastName` using the first space
- `company.name` from API is used as the `department` field
- Department field is free-text input since API has no department list

---

## Challenges & Improvements

**Challenges faced:**
- JSONPlaceholder returns `name` as a single string and has no `department` field — handled via a `transformUser` function in the service layer
- Keeping search, filter, and pagination in sync required careful state management

**Improvements with more time:**
- Add a real backend with persistent data
- Add unit tests for hooks and components
- Add dark mode support
- Implement infinite scrolling as an alternative to pagination
