const express = require('express');
const router = express.Router();
const openai = require('../config/openai');

// 🔮 사용자 질문과 답변을 바탕으로 OpenAI 응답 생성
router.post('/generate-response', async (req, res) => {
  const { questions, userMessage } = req.body;

  // 질문과 답변을 OpenAI 메시지 형식으로 변환
  const baseMessages = questions.map((q) => ({
    role: 'user',
    content: `Q: ${q.questionText}\nA: ${q.answerText}`,
  }));

  baseMessages.push({ role: 'user', content: userMessage });

  try {
    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant who speaks like a philosopher.' },
        ...baseMessages,
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content.trim();

    res.json({
      message: 'AI response generated successfully!',
      aiResponse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔮 사용자 질문과 답변을 바탕으로 각 stage별 요약 생성
router.post('/generate-statistics', async (req, res) => {
  const { questions } = req.body;

  // 각 stage별 질문과 답변을 그룹화
  const groupedByStage = questions.reduce((acc, question) => {
    const { stage, questionText, answerText } = question;
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(`Q: ${questionText}\nA: ${answerText}`);
    return acc;
  }, {});

  // OpenAI API 요청 메시지 생성
  const stageSummaries = [];
  for (const [stage, messages] of Object.entries(groupedByStage)) {
    const messageContent = messages.join('\n\n');
    const systemMessage = `Summarize the following answers into 2-3 lines for stage ${stage}. Use a warm and empathetic tone. 당신은 ~한 사람이네요! 같은 어감으로 나에 대해 새롭게 알게된 점을 나열하는 말투로 해줘.`;

    try {
      // OpenAI API 호출
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: messageContent },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      // AI 응답 저장
      const aiSummary = response.choices[0].message.content.trim();
      stageSummaries.push({
        stage: parseInt(stage),
        summary: aiSummary,
      });
    } catch (error) {
      return res.status(500).json({ error: `OpenAI API error for stage ${stage}: ${error.message}` });
    }
  }

  // 모든 stage 요약 반환
  res.json({
    message: 'Stage summaries generated successfully!',
    summaries: stageSummaries,
  });
});

module.exports = router;
