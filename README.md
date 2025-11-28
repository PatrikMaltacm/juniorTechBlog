# JuniorTechBlog

A dynamic blog platform built with React, Vite, and Firebase, designed for sharing and interacting with tech content. Features include user authentication, post management, comments, likes, and a personalized user dashboard.

## Key Features

*   **User Authentication:** Register, Login, and Logout functionality.
*   **Post Management:** Create, Read, Update, and Delete (CRUD) blog posts.
*   **Commenting System:** Users can comment on posts.
*   **Like Functionality:** Express appreciation for posts.
*   **User Dashboard & Profile:** Manage your posts and view your profile.
*   **Search Functionality:** Easily find posts by title or tags.
*   **Responsive Design:** Optimized for various screen sizes.
*   **Firebase Integration:** Utilizes Firebase for Authentication, Firestore Database, and Analytics.

## Technologies Used

*   **Frontend:** React, Vite
*   **Styling:** CSS Modules
*   **State Management:** React Context API (AuthContext, ThemeContext)
*   **Backend/Database:** Firebase (Authentication, Firestore)
*   **Routing:** React Router DOM
*   **Linting:** ESLint

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/juniorTechBlog.git # Replace with your actual repo URL
    cd juniorTechBlog
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project. Copy the content from `.env.example` and fill in your Firebase project credentials.
    Example `.env` content:
    ```
    VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
    VITE_FIREBASE_MEASUREMENT_ID="YOUR_FIREBASE_MEASUREMENT_ID"
    ```
    *Ensure this `.env` file is in your `.gitignore` and never committed to version control.*

## Running the Project

To start the development server:
```bash
npm run dev
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see the `CONTRIBUTING.md` file for detailed guidelines on how to contribute to this project.

## License

Distributed under the MIT License. See `LICENSE` for more information.
