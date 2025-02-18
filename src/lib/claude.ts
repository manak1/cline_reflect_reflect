import Anthropic from '@anthropic-ai/sdk';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

if (!CLAUDE_API_KEY) {
  throw new Error('VITE_CLAUDE_API_KEY environment variable is required');
}

const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
});

export async function getKptFeedback(kptData: {
  keep: string[];
  problem: string[];
  try: string[];
}) {
  const { keep, problem, try: tryItems } = kptData;

  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `以下のKPTについて分析し、改善のためのフィードバックを日本語で提供してください：

Keep（良かった点）：
${keep.map((item) => `- ${item}`).join('\n')}

Problem（課題）：
${problem.map((item) => `- ${item}`).join('\n')}

Try（次回の改善点）：
${tryItems.map((item) => `- ${item}`).join('\n')}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }
  return content.value;
}