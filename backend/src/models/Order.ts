import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderNumber: string;
  serviceType: string;
  selectedServices: string[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  amount: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  pickupInfo: {
    date: Date;
    timeSlot: string;
  };
  deliveryInfo: {
    date: Date;
    timeSlot: string;
  };
  sizeSpecifications?: {
    chest?: string;
    waist?: string;
    hip?: string;
    inseam?: string;
    shoulder?: string;
    sleeve?: string;
    notes?: string;
  };
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    required: true
  },
  selectedServices: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  pickupInfo: {
    date: Date,
    timeSlot: String
  },
  deliveryInfo: {
    date: Date,
    timeSlot: String
  },
  sizeSpecifications: {
    chest: String,
    waist: String,
    hip: String,
    inseam: String,
    shoulder: String,
    sleeve: String,
    notes: String
  },
  photoUrl: String
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', orderSchema);