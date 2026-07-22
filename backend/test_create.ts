async function test() {
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@dealership.com',
        password: 'admin123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Logged in');

    const res = await fetch('http://localhost:5000/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        make: 'Test',
        model: 'Test Model',
        category: 'SUV',
        price: 10000,
        quantity: 1,
        year: 2024
      })
    });
    const data = await res.json();
    console.log('STATUS:', res.status, data);
  } catch (err) {
    console.log('ERROR:', err);
  }
}
test();
