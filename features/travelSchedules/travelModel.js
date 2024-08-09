import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({


     user_id: {
        type: Schema.Types.ObjectId, ref :'User'
    },

    booking_id: {
        type: Schema.Types.ObjectId, ref :'Booking'
    },
        

    event_name: {
        type: String,
        required: true
    },

    event_description: {
        type: String,
        required: true
    },

    start_time:{
        type: Date,
        required: true
    },

    end_time: {
        type: Date,
        required : true
    },

    updated_at: {
        type: Date,
        required : true
    },

    created_at: {
        type: Date,
        required : true
    },



    },{timestamps:true});



    const Schedule = mongoose.model('Schedule', scheduleSchema);
    export default Schedule;
