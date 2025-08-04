# Advanced Web Calculator with Flask

This project is an enhanced web-based calculator built using Python's Flask framework for the backend. It features a dashboard that displays calculation history and is styled with a modern, dark theme.

## Features

- **Core Arithmetic**: Supports addition, subtraction, multiplication, and division.
- **Interactive UI**: A sleek, user-friendly interface with separate panels for the calculator and a dashboard.
- **Dashboard**:
    - **Calculation History**: A history log that dynamically updates with each new calculation.
    - **Re-use Expressions**: Clicking a history item populates the calculator display with the stored expression.
- **Robust Backend**: A Flask API handles all calculations and manages a persistent history stored in a JSON file.
- **Error Handling**: The application handles invalid input and prevents division by zero gracefully.

## Project Structure

- `app.py`: The main Flask application, containing all API endpoints for calculation and history management.
- `basic_operations.py`: A separate module for the core arithmetic logic.
- `templates/index.html`: The HTML file for the single-page application frontend.
- `static/style.css`: Provides a modern, dark theme for the UI.
- `static/script.js`: Handles all frontend logic, including user interactions, API calls, and dynamic history updates.
- `requirements.txt`: Lists the Python dependencies (`Flask`).
- `calculation_history.json`: A file that will be automatically created to store the calculation history.

## How to Run

1.  **Clone the repository** (or create the files and directories).
2.  **Create and activate a virtual environment**:
    ```sh
    python -m venv venv
    # On Windows: .\venv\Scripts\activate
    # On macOS/Linux: source venv/bin/activate
    ```
3.  **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```
4.  **Run the Flask application**:
    ```sh
    python app.py
    ```
5.  Open your browser and navigate to the local address provided (e.g., `http://127.0.0.1:5000`).