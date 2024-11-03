const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session'); // Import express-session
const app = express();
const config = require('./config');
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve the starting page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the demographics page and handle POST data
app.post('/page-2-medical-history.html', (req, res) => {
    // Save demographics data
    req.session.demographics = req.body; // Store demographics data in session
    res.sendFile(path.join(__dirname, 'public', 'page-2-medical-history.html')); // Redirect to page 2
});

// Serve the medical history page and handle POST data
app.post('/page-3-ocular-history.html', (req, res) => {
    // Save medical history data
    req.session.medicalHistory = req.body; // Store medical history data in session
    res.sendFile(path.join(__dirname, 'public', 'page-3-ocular-history.html')); // Redirect to page 3
});

// Serve the medical history page and handle POST data
app.post('/page-4-hippa-form.html', (req, res) => {
    // Save ocular history data
    const ocularHistory = {
        lastExam: req.body.lastExam,
        wear: req.body.wear ? req.body.wear : [], // If 'wear' is not sent, default to empty array
        flashes: req.body.flashes,
        floaters: req.body.floaters,
        blackouts: req.body.blackouts,
        ocularConditions: req.body.ocularConditions ? req.body.ocularConditions : [], // Handle potential undefined
        surgeries: req.body.surgeries ? req.body.surgeries : [] // Handle potential undefined
    };

    req.session.ocularHistory = ocularHistory; // Store ocular history data in session
    res.sendFile(path.join(__dirname, 'public', 'page-4-hippa-form.html')); // Redirect to page 4
});

app.get('/session-data', (req, res) => {
    const demographics = req.session.demographics || {};
    res.json(demographics);
});

app.get('/patient-data', (req, res) => {
    const returningPatient = req.session.returningPatient || {};
    res.json(returningPatient);
});

// Serve the ocular history page and handle final submission
app.post('/submit', (req, res) => {
    // Retrieve all the collected data from session
    const demographics = req.session.demographics;
    const medicalHistory = req.session.medicalHistory;
    const ocularHistory = req.session.ocularHistory;

    // Construct the content string
    const content = `
      Patient Information:
      --------------------
      Full Name: ${demographics.firstName} ${demographics.middleInitial || ''} ${demographics.lastName}
      First Name: ${demographics.firstName}
      Middle Initial: ${demographics.middleInitial || ''}
      Last Name: ${demographics.lastName}
      Address: ${demographics.address}
      City: ${demographics.city}
      State: ${demographics.state}
      Zip Code: ${demographics.zipCode}
      Phone: ${demographics.phone}
      Email: ${demographics.email}
      Date of Birth: ${demographics.dob}
      Sex: ${demographics.sex}

      Medical History:
      --------------------
      Allergies: ${medicalHistory.allergies || 'None'}
      Medications: ${medicalHistory.medications || 'None'}
      Diagnosed Conditions: ${Array.isArray(medicalHistory.conditions) ? medicalHistory.conditions.join(', ') : 'None'}
      Family History: ${medicalHistory.familyHistory || 'None'}

      Ocular History:
      --------------------
      Last Eye Exam: ${ocularHistory.lastExam}
      I Wear: ${ocularHistory.wear.join(', ') || 'None'}
      Flashes of Light: ${ocularHistory.flashes || 'No'}
      Floating Objects: ${ocularHistory.floaters || 'No'}
      Temporary Vision Blackouts: ${ocularHistory.blackouts || 'No'}
      Ocular Diagnoses: ${ocularHistory.ocularConditions.join(', ') || 'None'}
      Previous Eye Surgeries: ${ocularHistory.surgeries.join(', ') || 'None'}
    `;

    const infoFilePath = path.join(config.path, `${demographics.lastName} ${demographics.firstName} ${demographics.dob} Info.txt`);

    // Write patient information to a text file
    fs.writeFile(infoFilePath, content, (err) => {
        if (err) {
            console.error('Error writing patient info file:', err);
        }
    });

    // Redirect to confirmation page
    res.sendFile(path.join(__dirname, 'public', 'confirmation.html')); 
});

app.post('/patient-lookup', (req, res) => {
    const fs = require('fs');
    const demographics = req.body
    const filePath = path.join(config.path, `${demographics.lastName} ${demographics.firstName} ${demographics.dob} Info.txt`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        console.log('Patient record does not exist');
        res.sendFile(path.join(__dirname, 'public', 'patient-not-found.html')); 
    } else {
        console.log('Patient record found');
        req.session.returningPatient ={
            firstName:"David",
            middleInitial:"",
            lastName:"Lu",
        }
        res.sendFile(path.join(__dirname, 'public', 'page-1-demographics.html')); 
    }
    });
});

app.post('/clear-session', (req, res) => {
    req.session.returningPatient = null; // Clear the returningPatient data
    res.sendStatus(200); // Send a success status
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
