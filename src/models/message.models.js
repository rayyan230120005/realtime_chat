import mongoose, { Schema }  from "mongoose";
import {MessagetatusEnum, AvailableMessageStatus} from "../utils/constants.js"
import { Conversation } from "./conversation.models.js";

const messageSchema = new Schema(
    {
        sender:
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
            index:true,
        },
        conversation:
        {
            type:Schema.Types.ObjectId,
            ref:"Conversation",
            required:true,
            index:true,
        },
        content:
        {
            type:String,
            trim:true,
            default:" ",
        },
        attatchments:
        [
            {
                url:String,
                mimetype:String,
                size:Number,
            },
        ],
        status:
        {
            type:String,
            enum:AvailableMessageStatus,
            default:MessagetatusEnum.SENT
        },
        readBy:
        [
            {
                user:
                {
                    type:Schema.Types.ObjectId,
                    ref:"User",
                },
                readAt:
                {
                    type:Date,
                    default:Date.now,
                },
            },
        ],
        deliveredTO:
        [
            {
                user:
                {
                    type:Schema.Types.ObjectId,
                    ref:"User",
                },
                deliveredAt:
                {
                    type:Date,
                    default:Date.now,
                },
            },
        ],
    },
    {
        timestamps:true,
    }
);

messageSchema.index({conversation:1,createdAt:-1});

export const Message = mongoose.model("Message",messageSchema);
