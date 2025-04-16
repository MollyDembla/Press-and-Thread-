import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  estimatedTime?: string;
  imageUrl?: string;
}

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  estimatedTime: String,
  imageUrl: String
}, { timestamps: true });

export default mongoose.model<IService>('Service', serviceSchema);