import { GoogleGenerativeAI } from "@google/generative-ai";

// AI List Generation API endpoint
export async function POST(request: Request) {
  try {
    const { query, user_id } = await request.json();

    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an intelligent shopping list generator. Based on the user's query, create a shopping list.
      The user's query is: "${query}"
      Provide the response in a JSON format with the following structure:
      {
        "items": [
          { "name": "Product Name", "quantity": 1, "price": 0.0, "stock": 0, "reason": "Reason for adding" }
        ],
        "suggestions": ["Suggestion 1", "Suggestion 2"],
        "preferences": {}
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const data = JSON.parse(responseText);

    const total = data.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    return Response.json({
      success: true,
      data: {
        ...data,
        total,
        query,
        preferences: {}
      }
    });

  } catch (error) {
    console.error('AI List Generation Error:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to generate shopping list'
      },
      { status: 500 }
    );
  }
}
