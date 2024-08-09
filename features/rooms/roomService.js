import roomModel from './roomModel.js';

export default class RoomService{
    async createRoom(roomData){
       try {
        const room = await roomModel.create(roomData)
        return room;
       } catch (error) {
        console.log(error)

       }
    }

    async updateRoom(id,updateRoomData){
        try {
            const updatedRoom = await roomModel.findByIdAndUpdate(id,updateRoomData,{
                new :true,
                set: true
            });

        } catch (error) {
           console.log(error)

        }
        return updatedRoom

    }

    async getRoom(id){
         const room = await roomModel.findById(id)
         return room;
    }
  
    async getRooms(){

        const room = await roomModel.find()
        return room;
   }
  async deleteRoom (){
     return await roomModel.findByIdAndDelete();
  }
}