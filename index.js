const express = require('express');
const connectDB = require('./config/db');
const testRoutes = require('./routes/testRoutes');
require('dotenv').config();

// MongoDB 연결
connectDB();

// Express 앱 생성
const app = express();
app.use(express.json()); // JSON 파싱

// 👉 라우터 연결
app.use('/api/tests', testRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
