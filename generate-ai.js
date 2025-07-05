export default async function handler(request, response) {
  const { prompt } = request.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  };

  try {
    const apiResponse = await fetch(googleApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!apiResponse.ok) {
      throw new Error(`Google API responded with status: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    response.status(200).json(result);

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}