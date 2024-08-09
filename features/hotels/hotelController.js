import HotelService from "./hotelService.js";
import appResponse from "../../lib/appResponse.js"
import {InternalServerError, NotFoundError} from "../../lib/appError.js"

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  getHotelRooms,
  countByCity,
  countByType,

} = new HotelService();
export default class HotelController {
    async createHotel(req,res,next){
        try{
            const savedHotel = await createHotel(req.body);
            res.send(appResponse("Hotel created successfully", savedHotel));
            console.log(savedHotel)
        }catch(error){
            console.log(error);
            next(new InternalServerError("Internal server error",error));
        }
    }
    async updatedHotel(req, res, next) {
        try {
            const updatedHotel = await updateHotel(req.params.id, req.body);
            
            if (!updatedHotel) {
                return next(new NotFoundError("Hotel not found"));
            }
            
            res.status(200).send(appResponse("Hotel updated successfully", updatedHotel));
        } catch (error) {
            console.log(error);
            next(new InternalServerError("Internal server error"));
        }
    }
    
    
    async deleteHotel(req,res,next){
        try{
            await deleteHotel(req.params.id, req.body);
           res.send(appResponse("hotel deleted successfully"))
        }catch(error){
           console.log(error);
           next(new InternalServerError("Internal server error"));
        }
   }
   
   async getHotel(req,res,next){
    try{
        const hotel = await getHotel(req.params.id);
       res.send(appResponse("hotel retrieved successfully",hotel))
       console.log(hotel)
    }catch(error){
       console.log(error);
       next(new InternalServerError("Internal server error"));
    }
}
async getHotels(req,res,next){
    try{
        const hotels = await getHotels(req.query);
       res.send(appResponse("hotel retrieved successfully",hotels))
       console.log(hotels)
    }catch(error){
       console.log(error);
       next(new InternalServerError("Internal server error"));
    }
}

async countByCity(req, res, next){
    try{
        const list = await countByCity(req.query.cities);
        res.send(appResponse("list of cities",list));
    }catch(error){
        next(new InternalServerError("Internal server errror",error));
    }
}
   async countByType(req, res,next){
      try{
        const counts = await countByType();
        res.send(appResponse("counts:",counts));
      }catch(error){
        console.log(error)
        next(new InternalServerError("Internal server error",error))
      }
   }
   async getHotelRooms(req, res, next){
    try {
        const rooms = await getHotelRooms(req.params.id);
        res.send(appResponse("the rooms retrieved succesfully",rooms))
    } catch (error) {
        console.log(error)
        next(new InternalServerError("Internal server error",error));
    }
   }
}  
    


