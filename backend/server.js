const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Senpai@1423',
  database: 'registration_db',
  port: 3306  // MySQL default port
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
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

  // Insert into facility table
  const facilityData = {
    name: facilityName,
    city: facilityCity,
    county: facilityCounty,
    state: facilityState,
    medical_record_number: medicalRecordNumber
  };

  db.query('INSERT INTO facility SET ?', facilityData, (err, facilityResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    const facilityId = facilityResult.insertId;

    // Insert into address table
    const addressData = {
      street: street,
      city: city,
      county: county,
      state: state
    };

    db.query('INSERT INTO address SET ?', addressData, (err, addressResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }

      const addressId = addressResult.insertId;

      // Insert into patients table
      const patientData = {
        last_name: lastName,
        first_name: firstName,
        middle_initial: middleInitial,
        date_of_birth: dateOfBirth,
        age: age,
        gender: gender,
        race: race,
        hispanic_or_latino: hispanicOrLatino,
        phone_number: phoneNumber,
        facility_id: facilityId,
        address_id: addressId
      };

      db.query('INSERT INTO patients SET ?', patientData, (err, patientResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        res.send('Registration successful');
      });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
