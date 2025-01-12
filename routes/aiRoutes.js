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

module.exports = router;
