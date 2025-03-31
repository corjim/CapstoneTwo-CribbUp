# Real Estate Finder App (CribbUp) 

A **real estate listing and favorite management** web application that allows users to search for properties with a zip code, cit/town or address, save them favorites for future reference and tracking. App made use of Zillow api in the intergration and search of properties.

---

## Features  

- **Property Search** – Browse through real estate listings.  
- **Favorite Properties** – Add properties to your favorite list.  
- **Remove Favorites** – Easily remove saved properties.   
- **Responsive UI** – Built with **React Bootstrap** for a modern, mobile-friendly design.  

---

## Tech Stack  

| Technology       | Description                          |
|-----------------|--------------------------------------|
| React.js        | Frontend Framework                  |
| Express.js      | Backend API                         |
| Node.js         | Server-side Runtime                 |
| PostgreSQL      | Database for storing user favorites |
| Bootstrap       | UI Styling                          |


## Other Integration.

 - Zillow API (for real estate data)
---

## Installation & Setup  

### 1 Clone the Repository  

git clone https://github.com/corjim/CapstoneTwo-CribbUp/tree/main
cd cribbup

### Install Dependencies

npm install
Create a .env file in the root directory


### Start the Development Server.
npm start

The app will be available at http://localhost:5000.


##  API Routes

Method	    Endpoint	                Description
GET 	    /api/properties             Get all property listings
GET	        /api/favorites/:user	    Get user's favorite properties
POST	    /api/favorites/:user	    Add a property to favorites
DELETE	    /api/favorites/:user/:id	Remove a property from favorites


## Future Enhancements.

- Google Map integration.
- Compare property feature.
- Sort and filter property based on prices, room and bathrooms numbers.


## Contributing.

Feel free to fork the repo and create pull requests!