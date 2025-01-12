// const mongoose = require('mongoose');

// const progressSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   stage: {
//     type: Number,
//     default: -1,  // 진행 상황 단계: -1 = 시작 전, 0 = 방랑자 정보 입력 완료, 1~5 각 방 완료
//   },
//   questions: [
//     {
//       stage: { type: Number, required: true },      // 질문이 속한 단계
//       questionText: { type: String, required: true }, // 질문 내용
//       answerText: { type: String, default: '' },    // 사용자가 입력한 답변
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Progress', progressSchema);
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    default: -1,
  },
  questions: [
    {
      stage: { type: Number, required: true },
      questionText: { type: String, required: true },
      answerText: { type: String, default: '' },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', progressSchema);
