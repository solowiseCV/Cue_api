import hotelModel from "./hotelModel.js";
import { query } from "express";

export default class HotelService {
    async createHotel(data){
        const newHotel = new hotelModel(data);
        return await newHotel.save();
    }

    async updateHotel (id, updateData) {
        return hotelModel.findByIdAndUpdate(id, updateData, {
            new: true,       
            set: true       
        });
    }
    

    async deleteHotel(id){
        return await hotelModel.findByIdAndDelete(id);
    }

    async getHotel(id){
        return await hotelModel.findById(id);
    }

    
    async  getHotels(query) {
        const { min, max, limit, ...others } = query;
    
        try {
            const hotels = await hotelModel.find({
                ...others,
                cheapestPrice: {
                    $gt: min !== undefined ? min : 1,
                    $lt: max !== undefined ? max : 999
                }
            }).limit(Number(limit) || 10); // Convert limit to a number, default to 10 if not provided
            console.log(hotels);
             
            return hotels;
        } catch (err) {
            console.error('Error fetching hotels:', err);
            throw err;
        }
    }
    
    async countByCity(cites){
        const cityList = cites.split(",");
        return await Promise.all(
            cityList.map((city)=>{
                return hotelModel.countDocuments({city:city});
            })
        );
    }
  
    async countByType(){
        const hotelCount = await hotelModel.countDocuments({type:"hotel"});
        const apartmentCount = await hotelModel.countDocuments({type:"apartment"});
        const resortCount = await hotelModel.countDocuments({type:"resort"});
        const villaCount = await hotelModel.countDocuments({type:"villa"});
        const cabinCount = await hotelModel.countDocuments({type:"villa"});

        return [

            {type: "hotel", count:hotelCount},
            {type: "apartment", count:apartmentCount},
            {type: "resort", count:resortCount},
            {type: "villas", count:villaCount},
            {type: "cabins", count:cabinCount},
        ]

    }

    async getHotelRooms (id){
        const hotel = await hotelModel.find(id)
        return await Promise.all(
            hotel.rooms.map((room)=>{
                return room.findById(room)
            })
        )
    }

}