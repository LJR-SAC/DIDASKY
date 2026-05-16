const OPENROUTER_API_KEY =process.env.OPENROUTER_API_KEY
const MODEL = "deepseek/deepseek-v4-flash:free";

export async function callOpenRouter(prompt) {
    if (!OPENROUTER_API_KEY) {
        throw new Error('Sin API Key');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Didasky'
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: 'Eres Dasky, asistente educativo de Didasky. Eres directo y útil. NUNCA des respuestas directas; solo pistas.'
                },
                { role: 'user', content: prompt }
            ],
            temperature: 0.75,
            max_tokens: 10000
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenRouter ${response.status}: ${err}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}