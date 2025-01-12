// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const axios = require('axios');

// // 🔑 카카오 로그인 요청
// router.post('/login/kakao', async (req, res) => {
//   // 👉 추가 입력값 받기
//   const { accessToken, surname, name, birthday } = req.body;

//   try {
//     // 👉 카카오 API로 사용자 정보 가져오기
//     const kakaoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     // 🔍 카카오에서 받은 사용자 정보
//     const kakaoId = kakaoResponse.data.id;

//     // 👉 사용자 DB에 저장 또는 기존 사용자 찾기
//     let user = await User.findOne({ kakaoId });

//     if (!user) {
//       // 새로운 사용자 저장
//       user = new User({
//         kakaoId,
//         name,
//         surname,
//         birthday,
//       });
//       await user.save();
//     }

//     res.json({
//       message: 'Login successful!',
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// 사용자 생성 또는 기존 사용자 조회
router.post('/create', async (req, res) => {
  const { name, surname, birthday } = req.body;

  try {
    // 새로운 사용자 생성
    const userId = uuidv4();  // 고유 UUID 생성
    const user = new User({ userId, name, surname, birthday });
    await user.save();

    res.json({ message: 'User created!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 사용자 정보 조회
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
