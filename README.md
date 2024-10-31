# Optometry Check-In Web Application

This is a web-based optometry check-in application designed to streamline patient information intake by collecting general demographics, medical history, ocular history, and HIPAA consent. The data is gathered across multiple pages with an intuitive, user-friendly interface, allowing patients to fill out forms quickly and easily.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application Locally](#running-the-application-locally)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Project Overview

This application guides users through a series of forms across multiple pages:
1. **Demographics**: Basic patient information (name, age, etc.).
2. **Medical History**: Collection of relevant medical history details.
3. **Ocular History**: Eye-related medical information and past conditions.
4. **HIPAA Consent**: Collection of patient consent for information handling.

The goal is to streamline patient intake for optometrists by enabling patients to pre-fill required information before their appointments, saving time and reducing data entry errors.

## Features

- Multi-step form navigation.
- Real-time input validation for required fields.
- Signature collection and conditional file download.
- “Exit” and “Next” buttons for navigation control.
- **User-friendly** interface with clear instructions and form progress indicators.

## Prerequisites

Ensure that you have the following installed on your system:

- **Node.js** (version 14.x or higher) - [Download here](https://nodejs.org/)
- **npm** (Node Package Manager) - Installed automatically with Node.js

You may verify installations by running:

```bash
node -v
npm -v
```

## Setup and Installation

1. **Clone the Repository**
Clone this repository to your local machine using the following command:

```bash
git clone [<repository-url>](https://github.com/daves777/patient-history-check-in.git)
```

2. **Navigate to the Project Directory**

```bash
cd optometry-checkin
```

3. **Install Dependencies**
Install all required dependencies listed in package.json by running:

```bash
npm install
```

## Running the Application Locally

1. Start the Server
Run the server locally using the following command:

```bash
npm start
```

The server will start at http://localhost:3000 by default (or a specified port if modified).

2. **Access the Application**
Open your web browser and go to:

```plaintext
http://localhost:3000
```

## Project Structure

Here's a breakdown of the main files and directories:

- index.js: Main server file that initiates the application.
- config.js: Configuration file for setting options like port number.
- public/: Contains all static assets, including HTML pages, CSS, and JavaScript files.
    - index.html: Welcome page for the application.
    - page-1-demographics.html: Demographics information form.
    - page-2-medical-history.html: Medical history form.
    - page-3-ocular-history.html: Ocular history form.
    - page-4-hippa-form.html: HIPAA consent form.
    - styles.css: Stylesheet for all pages, maintaining consistency across the UI.

## Usage

1. **Form Navigation**
- Begin on the Demographics page (page-1-demographics.html) and fill out the form.
- Use the "Next" button to proceed to subsequent pages (Medical History, Ocular History, HIPAA Consent).
- An "Exit" button is provided on each form page to cancel and return to the index page without saving.

2. Conditional Signature Download
- On the HIPAA Consent page, the signature will only be available for download if both the signature and date fields are completed.

3. Progress Indicator
- A progress indicator at the bottom of each form page helps patients track their completion status across steps.

## Future Enhancements

Planned improvements include:

- Backend Integration: To store patient data securely in a database.
- Returning Patient Lookup: Currently the returning patient lookup is non functional, when it is complete the form will autocomplete based on store patient information and give a chance to update if needed.

## Troubleshooting

If you encounter issues:
- Ensure all dependencies are installed by running npm install.
- Confirm the server is running and accessible at http://localhost:3000.
- Check for typos or missing fields in form pages, especially if the application fails at a specific page.
