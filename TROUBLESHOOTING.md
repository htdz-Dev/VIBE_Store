# Troubleshooting Guide

## Database Connection Error
**Error:** `SQLSTATE[HY000] [2002] ... target machine actively refused it`

This error means your Laravel application cannot connect to the MySQL database server. This usually happens because:
1.  **MySQL is not running.**
2.  MySQL is running on a different port than `3306`.

### How to Fix

1.  **Start MySQL Service**
    - **XAMPP**: Open XAMPP Control Panel and click "Start" next to MySQL.
    - **WAMP**: Left-click WAMP icon > MySQL > Service administration > Start/Resume Service.
    - **Laragon**: Click "Start All".
    - **Docker**: Ensure your database container is running (`docker ps`).

2.  **Verify Port**
    - Check your database manager to see which port MySQL is using (Default is 3306).
    - If it's different (e.g., 3307), update your `backend/.env` file:
      ```
      DB_PORT=3307
      ```

3.  **Test Connection**
    - Open a terminal in `backend/` and run:
      ```bash
      php artisan migrate:status
      ```
    - If this lists migrations, your connection is working.
