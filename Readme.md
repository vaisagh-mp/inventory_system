# Inventory Management System

## Overview
The Inventory Management System is a web-based application built with Django and React to help manage inventory items and their types. It allows users to add, view, and categorize inventory items efficiently.

## Features
- Manage Item Types (CRUD operations)
- Manage Items (CRUD operations)
- MySQL Database Integration
- React Frontend with Navigation

## Technologies Used
- **Backend**: Django, Django REST Framework (DRF)
- **Frontend**: React.js
- **Database**: MySQL

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/vaisagh-mp/inventory_system.git
cd inventory-management
```

### 2. Set Up Virtual Environment
```sh
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3. Install Dependencies
```sh
pip install -r requirements.txt
```

### 4. Configure MySQL Database
Edit `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'inventory_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 5. Apply Migrations
```sh
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Optional)
```sh
python manage.py createsuperuser
```

### 7. Run the Server
```sh
python manage.py runserver
```

### 8. Start the React Frontend
Navigate to the frontend directory and run:
```sh
npm install
npm start
```

## API Endpoints
### Item Type Endpoints
- `GET /api/item-types/` - List all item types
- `POST /api/item-types/` - Create a new item type

### Item Endpoints
- `GET /api/items/` - List all items with their types
- `POST /api/items/` - Create a new item

