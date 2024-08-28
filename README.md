### LabManager ###

This software is designed for managing samples and tests in a laboratory. It allows you to add clients, laboratory personnel, and test names and categories (e.g., microbiology, physiochemistry, instrumental, chromatography). You can track samples, assign tests, and manage work orders.

    *Table of Contents
    *Installation
    *Configuration
    *Usage
    *Contributing
    *License
    *Contact

# Installation

Prerequisites
    *MySQL: You need to have MySQL installed on your system.

    Steps
1.- Clone the repository

2.- Set up the MySQL database
    *Install MySQL server if it's not already installed.
    *Log in to the MySQL server
    *Create a new database
    *Create a new user for this database
    *Change the user's permissions to administrator

3.- Install the required dependencies:

    This project uses node.js. use "npm install"

# Configuration
Create the .env.local file:

In the root directory of your project, create a file named .env.local.

Add the following environment variables, replacing the placeholders with your specific information:

NODE_ENV=local
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

JWT_KEY=your_jwt_secret

# Usage
This software is designed to manage the following elements within a laboratory:

    *Clients: Add and manage client information.
    *Laboratory Personnel: Keep track of personnel involved in the testing process.
    *Test Names and Categories: Define the types of tests available, categorized by type (e.g., microbiology, physiochemistry, etc.).
Getting Started

    1.-Add Clients and Tests:

        Before you start using the software, you need to populate it with some data. Begin by adding a few test names and some clients. This will allow you to start testing the software’s functionality.

    2.- Create Samples and Work Orders:

    *You can add one or more samples related to a single client/work order.
    *Each sample c*an have one or more tests assigned to it. These tests do not have to be the same for each sample, allowing for flexibility in testing different    aspects of a single sample.

    
This process will create a registry of all analyses to be performed by the laboratory personnel.