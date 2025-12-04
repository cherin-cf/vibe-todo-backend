import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  // 할일 내용
  title: {
    type: String,
    required: true,
    trim: true
  },
  // 완료 여부
  completed: {
    type: Boolean,
    default: false
  },
  // 생성 날짜
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;

