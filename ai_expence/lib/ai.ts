// import OpenAI from 'openai';

// interface RawInsight {
//   type?: string;
//   title?: string;
//   message?: string;
//   action?: string;
//   confidence?: number;
// }

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
//   defaultHeaders: {
//     'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//     'X-Title': 'ExpenseTracker AI',
//   },
// });

// export interface ExpenseRecord {
//   id: string;
//   amount: number;
//   category: string;
//   description: string;
//   date: string;
// }

// export interface AIInsight {
//   id: string;
//   type: 'warning' | 'info' | 'success' | 'tip';
//   title: string;
//   message: string;
//   action?: string;
//   confidence: number;
// }

// export async function generateExpenseInsights(
//   expenses: ExpenseRecord[]
// ): Promise<AIInsight[]> {
//   try {
//     // Prepare expense data for AI analysis
//     const expensesSummary = expenses.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));

//     const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights. 
//     Return a JSON array of insights with this structure:
//     {
//       "type": "warning|info|success|tip",
//       "title": "Brief title",
//       "message": "Detailed insight message with specific numbers when possible",
//       "action": "Actionable suggestion",
//       "confidence": 0.8
//     }

//     Expense Data:
//     ${JSON.stringify(expensesSummary, null, 2)}

//     Focus on:
//     1. Spending patterns (day of week, categories)
//     2. Budget alerts (high spending areas)
//     3. Money-saving opportunities
//     4. Positive reinforcement for good habits

//     Return only valid JSON array, no additional text.`;

//     const completion = await openai.chat.completions.create({
//       model: 'deepseek/deepseek-chat-v3-0324:free',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
//         },
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     const response = completion.choices[0].message.content;
//     if (!response) {
//       throw new Error('No response from AI');
//     }

//     // Clean the response by removing markdown code blocks if present
//     let cleanedResponse = response.trim();
//     if (cleanedResponse.startsWith('```json')) {
//       cleanedResponse = cleanedResponse
//         .replace(/^```json\s*/, '')
//         .replace(/\s*```$/, '');
//     } else if (cleanedResponse.startsWith('```')) {
//       cleanedResponse = cleanedResponse
//         .replace(/^```\s*/, '')
//         .replace(/\s*```$/, '');
//     }

//     // Parse AI response
//     const insights = JSON.parse(cleanedResponse);

//     // Add IDs and ensure proper format
//     const formattedInsights = insights.map(
//       (insight: RawInsight, index: number) => ({
//         id: `ai-${Date.now()}-${index}`,
//         type: insight.type || 'info',
//         title: insight.title || 'AI Insight',
//         message: insight.message || 'Analysis complete',
//         action: insight.action,
//         confidence: insight.confidence || 0.8,
//       })
//     );

//     return formattedInsights;
//   } catch (error) {
//     console.error('❌ Error generating AI insights:', error);

//     // Fallback to mock insights if AI fails
//     return [
//       {
//         id: 'fallback-1',
//         type: 'info',
//         title: 'AI Analysis Unavailable',
//         message:
//           'Unable to generate personalized insights at this time. Please try again later.',
//         action: 'Refresh insights',
//         confidence: 0.5,
//       },
//     ];
//   }
// }

// export async function categorizeExpense(description: string): Promise<string> {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'deepseek/deepseek-chat-v3-0324:free',
//       messages: [
//         { role: 'system', content: 'You are an expense categorizer.' },
//         { role: 'user', content: description },
//       ],
//     });

//     return completion.choices[0].message.content || 'Other';
//   } catch (error: any) {
//     if (error.status === 429) {
//       console.warn('Rate limit hit. Using fallback category.');
//       return 'Uncategorized'; // fallback
//     }
//     console.error('Error categorizing expense:', error);
//     return 'Error';
//   }
// }
// export async function generateAIAnswer(
//   question: string,
//   context: ExpenseRecord[]
// ): Promise<string> {
//   try {
//     const expensesSummary = context.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));

//     const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

//     Expense Data:
//     ${JSON.stringify(expensesSummary, null, 2)}

//     Provide a comprehensive answer that:
//     1. Addresses the specific question directly
//     2. Uses concrete data from the expenses when possible
//     3. Offers actionable advice
//     4. Keeps the response concise but informative (2-3 sentences)
    
//     Return only the answer text, no additional formatting.`;

//     const completion = await openai.chat.completions.create({
//       model: 'deepseek/deepseek-chat-v3-0324:free',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a helpful financial advisor AI that provides specific, actionable answers based on expense data. Be concise but thorough.',
//         },
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 200,
//     });

//     const response = completion.choices[0].message.content;
//     if (!response) {
//       throw new Error('No response from AI');
//     }

//     return response.trim();
//   } catch (error) {
//     console.error('❌ Error generating AI answer:', error);
//     return "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
//   }
// }









import OpenAI from 'openai';
import NodeCache from 'node-cache';

// 🧩 Cache AI responses for 1 hour to reduce API usage
const aiCache = new NodeCache({ stdTTL: 3600 });

// ✅ Use a stable model (you can override in .env)
const MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

// 🔁 Retry helper for handling 429 errors
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.status === 429) {
        console.warn(`⏳ Rate limit hit (attempt ${attempt + 1}/${retries}). Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      throw err;
    }
  }
  throw new Error(`Failed after ${retries} retries`);
}

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'ExpenseTracker AI',
  },
});

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

export async function generateExpenseInsights(expenses: ExpenseRecord[]): Promise<AIInsight[]> {
  try {
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const cacheKey = JSON.stringify(expensesSummary);
    const cached = aiCache.get<AIInsight[]>(cacheKey);
    if (cached) return cached;

    const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights. 
    Return a JSON array of insights with this structure:
    {
      "type": "warning|info|success|tip",
      "title": "Brief title",
      "message": "Detailed insight message with specific numbers when possible",
      "action": "Actionable suggestion",
      "confidence": 0.8
    }

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Focus on:
    1. Spending patterns (day of week, categories)
    2. Budget alerts (high spending areas)
    3. Money-saving opportunities
    4. Positive reinforcement for good habits

    Return only valid JSON array, no additional text.`;

    const completion = await withRetry(() =>
      openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
    );

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from AI');

    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const insights = JSON.parse(cleanedResponse);

    const formattedInsights = insights.map((insight: RawInsight, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      type: insight.type || 'info',
      title: insight.title || 'AI Insight',
      message: insight.message || 'Analysis complete',
      action: insight.action,
      confidence: insight.confidence || 0.8,
    }));

    aiCache.set(cacheKey, formattedInsights);
    return formattedInsights;
  } catch (error) {
    console.error('❌ Error generating AI insights:', error);
    return [
      {
        id: 'fallback-1',
        type: 'info',
        title: 'AI Analysis Unavailable',
        message:
          'Unable to generate personalized insights at this time. Please try again later.',
        action: 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const completion = await withRetry(() =>
      openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are an expense categorizer.' },
          { role: 'user', content: description },
        ],
        max_tokens: 50,
      })
    );

    return completion.choices[0].message.content?.trim() || 'Other';
  } catch (error: any) {
    if (error.status === 429) {
      console.warn('Rate limit hit. Using fallback category.');
      return 'Uncategorized';
    }
    console.error('Error categorizing expense:', error);
    return 'Error';
  }
}

export async function generateAIAnswer(question: string, context: ExpenseRecord[]): Promise<string> {
  try {
    const expensesSummary = context.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Provide a comprehensive answer that:
    1. Addresses the specific question directly
    2. Uses concrete data from the expenses when possible
    3. Offers actionable advice
    4. Keeps the response concise but informative (2-3 sentences)
    
    Return only the answer text, no additional formatting.`;

    const completion = await withRetry(() =>
      openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful financial advisor AI that provides specific, actionable answers based on expense data. Be concise but thorough.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 200,
      })
    );

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from AI');
    return response.trim();
  } catch (error) {
    console.error('❌ Error generating AI answer:', error);
    return "I'm unable to provide a detailed answer at the moment. Please try again later.";
  }
}
