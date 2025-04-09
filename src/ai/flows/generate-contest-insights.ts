'use server';
/**
 * @fileOverview Generates AI-powered insights about a user's prediction performance in past contests.
 *
 * - generateContestInsights - A function that generates insights based on user prediction data.
 * - GenerateContestInsightsInput - The input type for the generateContestInsights function.
 * - GenerateContestInsightsOutput - The return type for the generateContestInsights function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateContestInsightsInputSchema = z.object({
  userId: z.number().describe('The ID of the user.'),
  predictionHistory: z.array(
    z.object({
      contestId: z.string().describe('The ID of the contest.'),
      prediction: z.boolean().describe('The user prediction (true for Yes, false for No).'),
      outcome: z.boolean().describe('The actual outcome of the contest (true for Yes, false for No).'),
      winCoinWagered: z.number().describe('The amount of WinCoin wagered on the contest.'),
    })
  ).describe('The user prediction history for past contests.'),
});

export type GenerateContestInsightsInput = z.infer<typeof GenerateContestInsightsInputSchema>;

const GenerateContestInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights about the user prediction performance.'),
});

export type GenerateContestInsightsOutput = z.infer<typeof GenerateContestInsightsOutputSchema>;

export async function generateContestInsights(input: GenerateContestInsightsInput): Promise<GenerateContestInsightsOutput> {
  return generateContestInsightsFlow(input);
}

const generateInsightsPrompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: {
    schema: z.object({
      userId: z.number().describe('The ID of the user.'),
      predictionHistory: z.array(
        z.object({
          contestId: z.string().describe('The ID of the contest.'),
          prediction: z.boolean().describe('The user prediction (true for Yes, false for No).'),
          outcome: z.boolean().describe('The actual outcome of the contest (true for Yes, false for No).'),
          winCoinWagered: z.number().describe('The amount of WinCoin wagered on the contest.'),
        })
      ).describe('The user prediction history for past contests.'),
    }),
  },
  output: {
    schema: z.object({
      insights: z.string().describe('AI-generated insights about the user prediction performance.'),
    }),
  },
  prompt: `You are an AI assistant that analyzes a user's prediction history in past contests and provides insights to help them improve their future predictions.

  Analyze the following prediction history for user {{userId}}:
  {{#each predictionHistory}}
  - Contest ID: {{contestId}}, Prediction: {{prediction}}, Outcome: {{outcome}}, WinCoin Wagered: {{winCoinWagered}}
  {{/each}}

  Based on this data, provide insightful and actionable advice to the user. The data may be limited, so don't be afraid to say that there is not enough data to generate meaningful insights.
  Be concise and avoid stating the obvious. Focus on identifying patterns, strengths, and weaknesses in the user's prediction strategy.
  What is the user good at predicting? What should the user avoid predicting? What kind of contests does the user tend to bet high or low?
  If the user has wagered a significant amount on specific contest that would also be a good insight to expose. Also expose the risk.
  Incorporate specific examples from the prediction history to support your analysis.
  Remember to keep the tone encouraging and helpful.

  Insights:
  `,
});

const generateContestInsightsFlow = ai.defineFlow<
  typeof GenerateContestInsightsInputSchema,
  typeof GenerateContestInsightsOutputSchema
>(
  {
    name: 'generateContestInsightsFlow',
    inputSchema: GenerateContestInsightsInputSchema,
    outputSchema: GenerateContestInsightsOutputSchema,
  },
  async input => {
    const {output} = await generateInsightsPrompt(input);
    return output!;
  }
);
