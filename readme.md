# College Management System (MERN Stack)

This is a web-based project for managing student, faculty, and administrative information at **Government Polytechnic Awasari (GPA)**. The system provides role-based access for admins, faculty, and students to efficiently manage academic and administrative data.

## Features

- **Admin Module**: Manage users, departments, and system settings.
- **Student Module**: View attendance, grades, and course materials.
- **Faculty Module**: Manage student records, attendance, and assignments.
- **Authentication System**: Secure login system with JWT for all roles.

## Technologies Used

- **MongoDB** for database management
- **Express.js** for server-side logic
- **React.js** for building the user interface
- **Node.js** for backend development

## Setup Instructions

To set up the College Management System on your local machine, follow these steps:

1. **Install Required Software**:

   - Install **MongoDB**, **Node.js**, and **npm** on your machine.

2. **Clone the Repository**:

   - Open your command line or terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/SahilGawade07/GPA.git
   ```

3. **Install Dependencies**:
   Navigate to the project folder and install dependencies for both frontend and backend:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. **Environment Variables**:
   Create a `.env` file in the backend folder and add the required environment variables such as:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Application**:
   Run the backend and frontend servers:
   ```bash
   cd backend
   npm start
   ```
   In a separate terminal:
   ```bash
   cd frontend
   npm start
   ```

## Authors

- [Sahil Gawade](https://github.com/Sahil1459)
- [Abhishek Lohot](https://github.com/CodeWizAbhi)
- [Anand Jadhav](https://github.com/AnandJadhav08)
- [Payal Shinde](https://github.com/PayalShinde07)

## Contact

For any inquiries or feedback, please contact:

- Sahil Gawade at [sahilgawa07@gmail.com]

# This project is currently under development
