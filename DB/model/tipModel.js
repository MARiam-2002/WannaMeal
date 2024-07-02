import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 31
  },
  content: {
    type: String,
    required: true,
    min:10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;
