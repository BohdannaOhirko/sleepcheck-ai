import Anthropic from '@anthropic-ai/sdk'

// Ініціалізація Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

// Базова функція для запиту до Claude
export async function generateAIResponse(
  prompt: string,
  systemPrompt?: string,
  maxTokens: number = 2000
): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // Отримати текстову відповідь
    const textContent = message.content.find(
      (content) => content.type === 'text'
    )

    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response')
    }

    return textContent.text
  } catch (error) {
    console.error('Claude AI Error:', error)
    throw new Error('Не вдалося отримати відповідь від AI')
  }
}

// Streaming версія (для чатбота)
export async function streamAIResponse(
  prompt: string,
  systemPrompt?: string,
  onChunk?: (text: string) => void
): Promise<string> {
  try {
    let fullResponse = ''

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        const text = chunk.delta.text
        fullResponse += text
        if (onChunk) {
          onChunk(text)
        }
      }
    }

    return fullResponse
  } catch (error) {
    console.error('Claude AI Streaming Error:', error)
    throw new Error('Не вдалося отримати відповідь від AI')
  }
}
