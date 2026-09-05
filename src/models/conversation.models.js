import mongoose,{Schema} from "mongoose";

const conversationSchema = new Schema(
    {
        name:
        {
            type:String,
            trim:true,
            default:"",
        },
        isGroup:
        {
           type:Boolean,
           default:false,
        },
        participants:
        [
            {
                type:Schema.Types.ObjectId,
                ref:"User",
                required:true,
            }
        ],
        admin:
        {
             type:Schema.Types.ObjectId,
             ref:"User"
        },
        lastMessage:
        {
            type:Schema.Types.ObjectId,
            ref:"Message"
        },
    },
    {
        timestamps:true,
    }
);

// Optimize queries for finding user conversations
conversationSchema.index({ participants: 1})
conversationSchema.index({updatedAt:-1})

export const Conversation = mongoose.model("Conversation",conversationSchema);
