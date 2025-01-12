const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');
const aiRoutes = require('./routes/aiRoutes');
const cors = require('cors');
require('dotenv').config();

// MongoDB 연결
connectDB();

// Express 앱 생성
const app = express();
app.use(express.json()); // JSON 파싱

// 👉 CORS 설정 추가
app.use(cors());

// 👉 라우터 연결
app.use('/api/users', userRoutes);        // 사용자 관련 API
app.use('/api/progress', progressRoutes); // 진행 상황 관련 API
app.use('/api/ai', aiRoutes); // ai 관련 API

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
