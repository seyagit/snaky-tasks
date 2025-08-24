export const AI_MODELS = {
  'gpt-4': 'GPT-4',
  'gpt-3.5-turbo': 'GPT-3.5 Turbo'
} as const

export type AIModel = keyof typeof AI_MODELS

const FALLBACK_RESPONSES = [
  "またタスクですか？どうせ3日で忘れるくせに意欲的ですね",
  "素晴らしい！今度こそ有言実行してくれるんでしょうね？",
  "やる気スイッチ入りましたね。電池切れまでの時間を計測中です",
  "完璧主義？それとも単なる現実逃避の新しい形？",
  "タスク追加の才能は天才的ですね。実行力は別として",
  "リスト作りのプロですね。実際にやる気があるかは謎ですが",
  "おや、今回は本気ですか？前回と前々回も同じこと言ってませんでした？",
  "また忙しいフリの材料が増えましたね。お疲れ様です",
  "締切のないタスクほど安全なものはありませんよね",
  "やることリストの肥大化、順調ですね。達成率は相変わらずですが"
];

export async function generateSarcasticResponse(taskTitle: string): Promise<string> {
  try {
    const response = await fetch('/api/ai-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskTitle }),
    });
    
    if (!response.ok) {
      throw new Error(`API response error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return getFallbackResponse();
  }
}

function getFallbackResponse(): string {
  const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  return FALLBACK_RESPONSES[randomIndex];
}