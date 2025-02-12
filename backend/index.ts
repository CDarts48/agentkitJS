import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeAgent, runChatMode } from '/Users/corey/Desktop/agentkitJS/typescript/examples/langchain-cdp-chatbot/chatbot';
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userInput = req.body.input;
  const { agent, config } = await initializeAgent();

  try {
    const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config);
    let response = '';

    for await (const chunk of stream) {
      if ("agent" in chunk) {
        response += chunk.agent.messages[0].content;
      } else if ("tools" in chunk) {
        response += chunk.tools.messages[0].content;
      }
    }

    res.json({ response });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Chatbot backend listening at http://localhost:${port}`);
});