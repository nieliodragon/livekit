import { cli, defineAgent, inference, ServerOptions, voice } from '@livekit/agents';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createAgent } from './agent.ts';

dotenv.config({ path: '.env.local' });

export default defineAgent({
  entry: async (ctx) => {
    const session = new voice.AgentSession({
      stt: new inference.STT({ model: 'deepgram/nova-3', language: 'en' }),
      tts: new inference.TTS({ model: 'cartesia/sonic-3', voice: '9626c31c-bec5-4cca-baa8-f8ba9e84c8bc' }),
    });

    await ctx.connect();
    await session.start({ agent: createAgent(), room: ctx.room });
    await session.generateReply({
      instructions: 'Greet the visitor, explain that you can answer questions about the candidate, and invite one question.',
    });
  },
});

cli.runApp(new ServerOptions({ agent: fileURLToPath(import.meta.url), agentName: 'resume-advocate' }));
