// For Vercel serverless functions, Node.js types are automatically available
const fs = require('fs');
const path = require('path');

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email is present
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create the data entry
    const entry = {
      email: email.trim(),
      timestamp: new Date().toISOString()
    };

    // Path to the waitlist file
    const waitlistPath = path.join(process.cwd(), 'waitlist.json');

    // Read existing data or create empty array
    let waitlistData = [];
    try {
      if (fs.existsSync(waitlistPath)) {
        const fileContent = fs.readFileSync(waitlistPath, 'utf8');
        waitlistData = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Error reading waitlist file:', error);
      waitlistData = [];
    }

    // Check if email already exists
    const emailExists = waitlistData.some((item: any) => item.email === email.trim());
    if (emailExists) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Add new entry
    waitlistData.push(entry);

    // Write back to file
    fs.writeFileSync(waitlistPath, JSON.stringify(waitlistData, null, 2));

    // Return success response
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}