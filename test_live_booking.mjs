async function testBooking() {
  const payload = {
    user: {
      firstName: "Test",
      lastName: "User",
      phone: "1234567890",
      email: "test@example.com"
    },
    address: {
      line1: "123 Test Street",
      line2: "",
      landmark: "",
      city: "Test City",
      state: "TS",
      pincode: "110001"
    },
    petDetails: {
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2",
      gender: "Male",
      weight: "15",
      friendlyWithHumans: "Yes",
      friendlyWithPets: "Yes",
      healthConditions: ""
    },
    serviceType: "Home Grooming",
    date: new Date().toISOString(),
    timeSlot: "10:00 AM - 11:00 AM",
    paymentMethod: "Pay After Service",
    consentAccepted: "Yes",
    styling: {},
    items: [
      {
        id: "bath_spa_1",
        name: "Basic Bath",
        price: 999,
        category: "Bath & Spa",
        quantity: 1
      }
    ],
    totalPrice: 999
  };

  try {
    console.log("Sending booking request to https://sniffnsnooz.in/api/booking...");
    const response = await fetch("https://sniffnsnooz.in/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log(`Status: ${response.status} ${response.statusText}`);
    try {
      const json = JSON.parse(text);
      console.log("Response JSON:", JSON.stringify(json, null, 2));
    } catch (e) {
      console.log("Response Text:", text);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testBooking();
