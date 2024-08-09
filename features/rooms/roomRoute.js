import express from 'express'
import RoomController from './roomController.js';
import authenticate from '../../middlewares/auth.middle.js';
import { validateCreateHotel, validateUpdateHotel } from '../../validator/hotelValidation.js';

const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,

} = new RoomController();

const roomRoute = express.Router();

roomRoute.post("/",validateCreateHotel, createRoom);
roomRoute.put("/:id",authenticate,validateUpdateHotel, createRoom);
roomRoute.delete("/:id",authenticate,deleteRoom);
roomRoute.get("/:id",authenticate,getRoom);
roomRoute.get("/",authenticate,getRooms);


export default roomRoute;