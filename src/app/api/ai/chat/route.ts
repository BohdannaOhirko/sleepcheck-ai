// app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/ai/claude';
import { CHATBOT_SYSTEM_PROMPT, buildChatContext } from '@/lib/ai/chatbot-prompts';
import { ContextBuilder } from '@/lib/ai/context-builder';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валідація
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Невірний формат повідомлень' },
        { status: 400 }
      );
    }

    if (body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Немає повідомлень для обробки' },
        { status: 400 }
      );
    }

    // Отримуємо останнє повідомлення користувача
    const lastMessage = body.messages[body.messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Останнє повідомлення має бути від користувача' },
        { status: 400 }
      );
    }

    // Формування контексту
    let systemPrompt = CHATBOT_SYSTEM_PROMPT;
    
    if (body.context?.questionnaireData) {
      systemPrompt += ContextBuilder.buildComplete({
        questionnaireData: body.context.questionnaireData,
        includeTime: true,
      });
    }

    // Формуємо повну історію розмови для промпту
    const conversationHistory = body.messages
      .map((msg: any) => `${msg.role === 'user' ? 'Користувач' : 'Асистент'}: ${msg.content}`)
      .join('\n\n');

    const prompt = `${conversationHistory}`;

    // Відправка запиту до Claude
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

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'Ехокор Chat API',
    version: '1.0.0'
  });
}