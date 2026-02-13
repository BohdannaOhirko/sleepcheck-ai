// app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/ai/claude';
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/ai/chatbot-prompts';
import { ContextBuilder } from '@/lib/ai/context-builder';
import { chatRequestSchema } from '@/lib/validations/chatSchema';
import { aiChatRatelimit, getClientIp } from '@/lib/security/ratelimit';

export const runtime = 'edge';

// Типи для повідомлень
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    // ✅ RATE LIMITING - перевірка ліміту запитів
    const ip = getClientIp(request);
    const { success, limit, remaining, reset } = await aiChatRatelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Занадто багато запитів. Спробуйте через хвилину.',
          limit,
          remaining,
          resetAt: new Date(reset).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }

    const body = await request.json();
    
    // ✅ ZOD ВАЛІДАЦІЯ
    const validationResult = chatRequestSchema.safeParse({
      messages: body.messages,
      questionnaireData: body.context?.questionnaireData
    });

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return NextResponse.json(
        { 
          error: 'Невалідні дані',
          details: errors 
        },
        { status: 400 }
      );
    }

    const { messages, questionnaireData } = validationResult.data;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Останнє повідомлення має бути від користувача' },
        { status: 400 }
      );
    }

    // Формування контексту
    let systemPrompt = CHATBOT_SYSTEM_PROMPT;
    
    if (questionnaireData && typeof questionnaireData === 'string') {
      try {
        const parsedData = JSON.parse(questionnaireData);
        
        systemPrompt += ContextBuilder.buildComplete({
          questionnaireData: parsedData,
          includeTime: true,
        });
      } catch (error) {
        console.error('Error parsing or building context:', error);
      }
    }

    const conversationHistory = messages
      .map((msg: ChatMessage) => 
        `${msg.role === 'user' ? 'Користувач' : 'Асистент'}: ${msg.content}`
      )
      .join('\n\n');

    const prompt = conversationHistory;

    const response = await generateAIResponse(
      prompt,
      systemPrompt,
      2000
    );

    return NextResponse.json({
      message: response,
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Виникла помилка при обробці запиту';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'Ехокор Chat API',
    version: '1.0.0'
  });
}