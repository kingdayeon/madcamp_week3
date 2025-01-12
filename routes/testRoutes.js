const express = require('express'); // Express 모듈 가져오기
const router = express.Router(); // 라우터 객체 생성
const Test = require('../models/Test'); // Test 모델 가져오기

// 👉 POST 요청: 새로운 테스트 데이터 저장
router.post('/', async (req, res) => {
  const { title, description } = req.body; // 클라이언트 요청에서 title과 description 가져오기
  try {
    const newTest = new Test({ title, description }); // Test 모델의 인스턴스 생성
    await newTest.save(); // 데이터베이스에 저장
    res.status(201).json(newTest); // 저장된 데이터를 JSON 형식으로 클라이언트에 반환
  } catch (error) {
    res.status(500).json({ error: error.message }); // 에러 발생 시 500번 상태 코드와 에러 메시지 반환
  }
});

// 👉 GET 요청: 모든 테스트 데이터 조회
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find(); // 데이터베이스에서 모든 Test 문서 조회
    res.status(200).json(tests); // 조회된 데이터를 JSON 형식으로 클라이언트에 반환
  } catch (error) {
    res.status(500).json({ error: error.message }); // 에러 발생 시 500번 상태 코드와 에러 메시지 반환
  }
});

module.exports = router; // 라우터 모듈을 외부에서 사용할 수 있도록 내보내기
