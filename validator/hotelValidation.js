import Joi from 'joi';

// Joi schema for room validation
const roomSchema = Joi.object({
  type: Joi.string().required(),
  price: Joi.number().required(),
});

// Joi schema for creating hotel
const createHotelSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  city: Joi.string().required(),
  rating: Joi.number().min(0).max(5),
  description: Joi.string().optional(),
  destination_id: Joi.string(),  // Assuming destination_id is passed as a string (ObjectId)
  address: Joi.string().required(),
  price_per_night: Joi.number().required(),
  cheapestPrice: Joi.number().required(),
  image_url: Joi.string().optional().uri(),
  rooms: Joi.array().items(roomSchema).optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
});

// Joi schema for updating hotel
const updateHotelSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  city: Joi.string().optional(),
  rating: Joi.number().min(0).max(5).optional(),
  description: Joi.string().optional(),
  destination_id: Joi.string().optional(),
  address: Joi.string().optional(),
  price_per_night: Joi.number().optional(),
  cheapestPrice: Joi.number().optional(),
  image_url: Joi.string().optional().uri(),
  rooms: Joi.array().items(roomSchema).optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional().default(Date.now),
}).min(1); // Ensure at least one field is being updated

// Middleware function for hotel creation validation
export const validateCreateHotel = (req, res, next) => {
  const { error } = createHotelSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for hotel update validation
export const validateUpdateHotel = (req, res, next) => {
  const { error } = updateHotelSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
