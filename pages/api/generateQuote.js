// Import axios at the top of the file if you haven't already
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ message: 'API key not configured' });
    return;
  }

  // Correct LLM endpoint URL for chat completions
  const llmEndpoint = 'https://openrouter.ai/api/v1/chat/completions';

  // Your custom prompt
  const systemPrompt = `Drawing upon the rich diversity of wisdom from philosophers across various cultures, epochs, and philosophical traditions, and expressing these insights in clear, contemporary English, generate an insightful and motivational quote that offers a unique perspective. Each quote should:

- Reflect a distinct philosophical background or ideology, celebrating the broad spectrum of human thought.
- Be original in its formulation, inspiring fresh reflections and discussions without directly quoting known works.
- Consist of no more than two sentences, ensuring clarity and brevity for easy comprehension and shareability on social media platforms.
- Foster positive engagement, encouraging readers to reflect, question, and discuss the ideas presented.
- If the philosophical tradition or viewpoint is potentially less recognized, include a brief, succinct context or explanation within the two-sentence limit to ensure accessibility and inclusiveness.

Your aim is to illuminate wisdom in a manner that is not only profound and resonates with a broad, English-speaking audience but also concise enough to fit the quick-scrolling nature of social media, inviting users into a global dialogue and fostering a community of curious minds.`;

  try {
    const response = await axios.post(
      llmEndpoint,
      {
        model: 'meta-llama/llama-3.1-8b-instruct:free', // Specify the model here
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: '' }, // Empty user message to prompt the assistant
        ],
        // Include additional parameters if required by your LLM
        temperature: 0.7, // Optional: adjust as needed
        max_tokens: 500,  // Optional: adjust as needed
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:3000', // Update with your site's URL if deployed
          'X-Title': 'Interactive Quote Generator', // Your app's name
        },
      }
    );

    // Log the API response for debugging
    console.log('API Response:', response.data);

    // Check if response.data.choices exists and has at least one choice
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const quote = response.data.choices[0].message.content.trim();
      // Send the quote back to the client
      res.status(200).json({ quote });
    } else {
      console.error('Unexpected API response structure:', response.data);
      res.status(500).json({ message: 'Invalid API response structure' });
    }
  } catch (error) {
    // Extract error message
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error('Error generating quote:', errorMessage);
    res.status(500).json({ message: 'Failed to generate quote', error: errorMessage });
  }
}