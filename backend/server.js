const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'registration_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const {
    lastName, firstName, middleInitial, dateOfBirth, age, gender, race,
    hispanicOrLatino, phoneNumber, facilityName, facilityCity, facilityCounty,
    facilityState, medicalRecordNumber, street, city, county, state
  } = req.body;

  const sql = 'INSERT INTO patients SET ?';
  const data = {
    last_name: lastName,
    first_name: firstName,
    middle_initial: middleInitial,
    date_of_birth: dateOfBirth,
    age: age,
    gender: gender,
    race: race,
    hispanic_or_latino: hispanicOrLatino,
    phone_number: phoneNumber,
    facility_name: facilityName,
    facility_city: facilityCity,
    facility_county: facilityCounty,
    facility_state: facilityState,
    medical_record_number: medicalRecordNumber,
    street: street,
    city: city,
    county: county,
    state: state
  };

  db.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.send('Registration successful');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
