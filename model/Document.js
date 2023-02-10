import mongoose from "mongoose";

const Schema = mongoose.Schema;
const documentSchema = new Schema( {
    value: {
        type: String,
        required: true
    }

});

export default mongoose.model("Document", documentSchema );
//user