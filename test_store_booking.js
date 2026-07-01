const http = require('http');

const payload = {
  name: "Store Raj",
  phone: "123456789",
  email: "raj@example.com",
  serviceLocation: "Home",
  shopAddress: null,
  address: { house: "1", street: "2" },
  petDetails: { petName: "A", petBreed: "B", petAge: "C", petAllergy: "D" },
  behavior: { friendlyHuman: "Yes", friendlyPets: "Yes" },
  styling: { style: "style", mattingApproval: "app" },
  booking: { items: [], total: 100, date: "2026", slot: "10am" }
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
