const http = require('http');

const payload = {
  name: "Raj",
  phone: "1234567890",
  email: "raj@example.com",
  location: "12.34, 56.78",
  address: { house: "1", street: "2", fullAddress: "1, 2" },
  petDetails: {
    petName: "Buddy",
    petBreed: "Golden Ret",
    petAge: "2",
    petAllergies: "None",
    friendlyWithHumans: true,
    friendlyWithPets: true
  },
  styling: {
    styleSelected: "Puppy Cut",
    hairLength: null,
    mattingApproval: "Approve Removal"
  },
  consentAccepted: true,
  serviceLocation: "Home",
  booking: {
    items: [],
    basePrice: 1049,
    total: 1049,
    date: "2026-03-12",
    slot: "10:00 AM"
  }
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/booking',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Body: ${body}`);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
