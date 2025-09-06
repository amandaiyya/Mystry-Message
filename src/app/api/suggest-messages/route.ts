// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Generate 3 fun, open-ended, and universal questions for an anonymous chat app. Return them in a single line, separated by '||'. Only return the questions, no extra text.";
  
    // const result = streamText({
    //   model: openai('gemma-'),
    //   prompt
    // });

    const result = await generateText({
      model: groq('gemma2-9b-it'),
      prompt,
    })
  
    // return result.toUIMessageStreamResponse();

    return Response.json(
      {
        success: true,
        result: result.text
      },
      {status: 200}
    )
  } catch (error: any) {
    console.log("An unexpected error occured ", error)
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to generate suggest questions'
      },{status: 500}
    )
  }
}