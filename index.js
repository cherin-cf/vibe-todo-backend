import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/todo.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 - CORS 수동 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

// 라우터
app.use('/todos', todoRouter);

// MongoDB 연결
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-db';
console.log('연결 URI:', MONGO_URI.includes('localhost') ? 'localhost' : 'MongoDB Atlas');

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB 연결 성공!');
    
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error.message);
  });

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend API' });
});
