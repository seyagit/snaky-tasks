const SARCASTIC_RESPONSES = [
  "またタスクを増やすんですね...本当にやる気があるのかしら？",
  "おお、素晴らしいアイデアですね！きっと明日には忘れてるでしょうけど",
  "また新しいタスクですか？既存のタスクはどうなったんでしょうね",
  "やる気満々ですね！3日後にはリストから削除されてる予感がしますが",
  "タスク追加の才能は素晴らしいですね。実行の才能はまた別の話ですが",
  "わお、今度こそ本気ですね？前回と前々回もそう言ってましたが",
  "リストが長くなるほど達成感が減るって知ってます？",
  "タスクを追加するのは簡単ですよね。問題はその後ですが...",
  "また壮大な計画を立ててますね。現実逃避の新しい形でしょうか？",
  "完璧主義者ですか？それとも単なる先延ばし魔人？",
  "このタスク、本当に必要ですか？それとも忙しいフリをしたいだけ？",
  "タスク管理のプロですね！実際にやるかどうかは別として...",
  "また締切のないタスクを追加してますね。便利な逃げ道です",
  "今度のタスクはいつ頃忘れる予定ですか？統計を取ってるので",
  "やることリストがこんなに長いなんて、きっと重要人物なんでしょうね"
];

export async function generateSarcasticResponse(taskTitle: string): Promise<string> {
  // For MVP, use pre-defined responses
  const randomIndex = Math.floor(Math.random() * SARCASTIC_RESPONSES.length);
  return SARCASTIC_RESPONSES[randomIndex];
}

// Future enhancement: OpenAI API integration
/*
export async function generateSarcasticResponseWithAI(taskTitle: string): Promise<string> {
  try {
    const response = await fetch('/api/ai-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskTitle }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return generateSarcasticResponse(taskTitle);
  }
}
*/