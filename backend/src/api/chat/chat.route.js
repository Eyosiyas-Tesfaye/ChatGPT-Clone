import express from "express";

const chatRouter = express.Router();
import { createConversationController, getConversationController } from "./controller/chat.controller.js";
//  /api/chat/conversation
chatRouter.post("/conversation", createConversationController);

chatRouter.get("/conversation", getConversationController);

export default chatRouter;