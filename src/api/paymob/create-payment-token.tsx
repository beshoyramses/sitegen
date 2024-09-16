// Example API route for generating Paymob payment token

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { subaccountId, funnelId } = req.body;
        
        // Paymob endpoint and credentials
        const response = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token sk_test_626ba4a60a6f9cf4b0bc066ad3de884e93693afd5218ef832e99cbdf76a0fb37`, // Replace with your Paymob API key
          },
          body: JSON.stringify({
            amount_cents: 10000, // Dummy amount in cents
            currency: "EGP",
            order_id: "1234567890", // Dummy order ID
            integration_id: "868689", // Replace with your Paymob integration ID
            shipping_data: {
              first_name: "John",
              last_name: "Doe",
              email: "john.doe@example.com",
              phone_number: "01000000000",
              address: "123 Elm Street",
              country: "EG",
              city: "Cairo"
            }
          }),
        });
        const data = await response.json();
  
        if (!data || !data.payment_key) {
          throw new Error('Failed to retrieve payment token');
        }
  
        res.status(200).json({ token: data.payment_key });
      } catch (error) {
        res.status(500).json({ error: 'Failed to generate payment token' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  

  