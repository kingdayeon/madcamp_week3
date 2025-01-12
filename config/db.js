
const mongoose = require('mongoose');
require('dotenv').config(); //env 파일 연결

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1); // 서버 종료
  }
};

module.exports = connectDB;

