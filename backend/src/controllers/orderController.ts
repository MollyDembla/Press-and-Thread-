import { Request, Response } from 'express';
import Order from '../models/Order';

interface AuthRequest extends Request {
  user?: any;
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const {
      serviceType,
      selectedServices,
      amount,
      address,
      pickupInfo,
      deliveryInfo,
      sizeSpecifications
    } = req.body;

    // Generate unique order number
    const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create new order
    const order = new Order({
      userId: req.user._id,
      orderNumber,
      serviceType,
      selectedServices,
      status: 'pending',
      amount,
      address,
      pickupInfo: {
        date: new Date(pickupInfo.date),
        timeSlot: pickupInfo.timeSlot
      },
      deliveryInfo: {
        date: new Date(deliveryInfo.date),
        timeSlot: deliveryInfo.timeSlot
      },
      sizeSpecifications
    });

    const savedOrder = await order.save();
    
    // Return the saved order
    res.status(201).json({
      success: true,
      order: savedOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating order', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status (500).json({ 
      message: 'Error fetching order',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status (500).json({ 
      message: 'Error updating order status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const uploadOrderPhoto = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Note: Implement actual file upload logic here
    // This is a placeholder for now
    const photoUrl = req.body.photoUrl;
    
    if (photoUrl) {
      order.photoUrl = photoUrl;
      await order.save();
    }

    res.json(order);
  } catch (error) {
    res.status (500).json({ 
      message: 'Error uploading photo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};