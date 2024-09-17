import mongoose  from "mongoose";

const CarrerraSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    area: {
        type: String,
        required: true,
        trim: true
    }
})

const Carreras = mongoose.model('Carreras', CarrerraSchema)

export default Carreras
