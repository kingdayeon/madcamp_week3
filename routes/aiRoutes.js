const express = require('express');
const router = express.Router();
const openai = require('../config/openai');

// 🔮 아리스토텔레스 대화 생성 API
router.post('/generate-response/aristotle', async (req, res) => {
  const { questions = [], userMessage } = req.body; // questions 기본값을 빈 배열로 설정

  if (!userMessage) {
    return res.status(400).json({ error: 'userMessage는 필수입니다.' });
  }

  try {
    const baseMessages = questions.map((q) => ({
      role: 'user',
      content: `Q: ${q.questionText}\nA: ${q.answerText}`,
    }));

    baseMessages.push({ role: 'user', content: userMessage });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '당신은 고대 철학자 아리스토 텔레스입니다. 아리스토텔레스는 현실 세계의 경험과 관찰을 중시하며, 만물의 목적과 본질을 탐구하는 목적론적 세계관을 제시했다. 그는 윤리적으로는 덕을 통한 중용의 삶을, 정치적으로는 공동체의 행복을 최우선으로 여겼다.사람들의 상담을 해주지요. 그 상담받는 사람의 사전 정보를 아리스토 텔레스는 알고있습니다. 그걸 바탕으로 자연스럽게 대화를 이끌어가세요. 멋진 조언을 해주세요. 답은 간결하게 2줄까지.' },
        ...baseMessages,
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content.trim();

    res.json({ message: 'Aristotle response generated successfully!', aiResponse });
  } catch (error) {
    console.error('AI 응답 생성 중 오류 발생:', error);
    res.status(500).json({ error: error.message });
  }
});


// 🔮 쇼펜하우어 대화 생성 API
router.post('/generate-response/schopenhauer', async (req, res) => {
  const { questions = [], userMessage } = req.body; // questions 기본값을 빈 배열로 설정

  if (!userMessage) {
    return res.status(400).json({ error: 'userMessage는 필수입니다.' });
  }

  try {
    const baseMessages = questions.map((q) => ({
      role: 'user',
      content: `Q: ${q.questionText}\nA: ${q.answerText}`,
    }));

    baseMessages.push({ role: 'user', content: userMessage });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '당신은 비관주의 철학자 쇼펜하우어입니다. 쇼펜하우어는 삶의 고통과 무의미함을 인식하며, 이를 극복하기 위해 의지의 부정을 통한 평온과 예술의 가치를 강조했다. 사람들의 상담을 해주지요. 그 상담받는 사람의 사전 정보를 쇼펜하우어는 알고있습니다. 그걸 바탕으로 자연스럽게 대화를 이끌어가세요. 멋진 조언을 해주세요. 답은 간결하게 2줄까지.' },
        ...baseMessages,
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content.trim();

    res.json({ message: 'Aristotle response generated successfully!', aiResponse });
  } catch (error) {
    console.error('AI 응답 생성 중 오류 발생:', error);
    res.status(500).json({ error: error.message });
  }
});


// 🔮 소크라테스스 대화 생성 API
router.post('/generate-response/socrates', async (req, res) => {
  const { questions = [], userMessage } = req.body; // questions 기본값을 빈 배열로 설정

  if (!userMessage) {
    return res.status(400).json({ error: 'userMessage는 필수입니다.' });
  }

  try {
    const baseMessages = questions.map((q) => ({
      role: 'user',
      content: `Q: ${q.questionText}\nA: ${q.answerText}`,
    }));

    baseMessages.push({ role: 'user', content: userMessage });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '당신은 고대 철학자 소크라테스입니다. 소크라테스는 무지를 인정하고 질문과 대화를 통해 진리를 탐구하는 방법을 강조하며, “너 자신을 알라”라는 격언으로 유명하다. 사람들의 상담을 해주지요. 그 상담받는 사람의 사전 정보를 소크라테스는 알고있습니다. 그걸 바탕으로 자연스럽게 대화를 이끌어가세요. 멋진 조언을 해주세요. 답은 간결하게 2줄까지.' },
        ...baseMessages,
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content.trim();

    res.json({ message: 'Aristotle response generated successfully!', aiResponse });
  } catch (error) {
    console.error('AI 응답 생성 중 오류 발생:', error);
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
