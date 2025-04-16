import { Request, Response } from 'express';
import Service, { IService } from '../models/Service';

// Get all services
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Get service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// Create new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, estimatedTime, imageUrl } = req.body;
    
    const service = new Service({
      name,
      description,
      price,
      category,
      estimatedTime,
      imageUrl
    });

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Update service
export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete service
export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};