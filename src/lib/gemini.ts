import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY environment variable is required');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/** KPTデータに基づいてAIフィードバックを生成する */
export async function getKptFeedback(kptData: {
  /** Keepアイテムの配列 */
  keep: string[];
  /** Problemアイテムの配列 */
  problem: string[];
  /** Tryアイテムの配列 */
  try: string[];
}): Promise<string> {
  const { keep, problem, try: tryItems } = kptData;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `以下は、ある人の一週間の振り返りをKPT形式でまとめたものです。
この人の学びと成長に焦点を当てて、後から振り返った時に今週の学びが明確にわかるようなサマリーを日本語で提供してください。

Keep（できたこと・良かったこと）：
${keep.map((item) => `- ${item}`).join('\n')}

Problem（課題・難しかったこと）：
${problem.map((item) => `- ${item}`).join('\n')}

Try（次週に挑戦したいこと）：
${tryItems.map((item) => `- ${item}`).join('\n')}

以下の形式で、具体的な学びと成長のポイントを整理してください：

**1. 今週習得したスキルと学び**
- Keepから見える具体的なスキルの向上
- 実践を通じて得られた気づきや学び
- 特に印象的だった成功体験とその要因

**2. 直面した課題から得られた教訓**
- Problemから見える重要な気づき
- 課題に取り組む中で学んだこと
- 今後に活かせる改善のヒント

**3. 次週に向けた具体的な学習ポイント**
- Tryから見える次の学習目標
- 特に注力すべき成長ポイント
- 具体的な実践方法のアドバイス

**4. 成長の軌跡と今後の展望**
- 今週の学びを通じて見えてきた自身の強み
- 成長が感じられる具体的な変化
- 長期的な成長に向けた示唆`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}