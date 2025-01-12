// const express = require('express');
// const router = express.Router();
// const Progress = require('../models/Progress');

// // 진행 상황 저장 또는 업데이트
// router.post('/', async (req, res) => {
//   const { userId, stage, questions } = req.body;

//   try {
//     let progress = await Progress.findOne({ userId });

//     if (progress) {
//       // 기존 진행 상황 업데이트
//       progress.stage = stage;
//       progress.questions.push(...questions);
//       await progress.save();
//       res.json({ message: 'Progress updated!', progress });
//     } else {
//       // 새로운 진행 상황 생성
//       progress = new Progress({ userId, stage, questions });
//       await progress.save();
//       res.json({ message: 'Progress saved!', progress });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 특정 사용자의 진행 상황 조회
// router.get('/:userId', async (req, res) => {
//   try {
//     const progress = await Progress.findOne({ userId });
//     if (!progress) return res.status(404).json({ message: 'Progress not found' });
//     res.json(progress);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// 진행 상황 저장 또는 업데이트
router.post('/', async (req, res) => {
  const { userId, stage, questions } = req.body;

  try {
    let progress = await Progress.findOne({ userId });

    if (progress) {
      // 기존 진행 상황 업데이트
      progress.stage = stage;
      progress.questions.push(...questions);
      await progress.save();
      res.json({ message: 'Progress updated!', progress });
    } else {
      // 새로운 진행 상황 생성
      progress = new Progress({ userId, stage, questions });
      await progress.save();
      res.json({ message: 'Progress saved!', progress });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 사용자의 진행 상황 조회
router.get('/:userId', async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    if (!progress) return res.status(404).json({ message: 'Progress not found' });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
