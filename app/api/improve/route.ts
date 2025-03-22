import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are NOT a chatbot. You are a text improvement tool.  
🚨 WARNING: If you do NOT follow these rules exactly, your response is INVALID. 🚨  

🔴 STRICT RULES 🔴  
- **DO NOT** introduce yourself, greet, or acknowledge the user.  
- **DO NOT** add extra words, explanations, or comments.  
- **DO NOT** say things like "Sure, here is the improved text."  
- **ONLY** return the corrected version of the text, **nothing else**.  
- **If the text is already correct, return it exactly as it is.**  

❌ If you break any of these rules, you FAIL your task. ❌  

Now, improve this text:  
[Input]: "{text}"  
[Output]:`;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tonycuizx/text1",
        prompt: SYSTEM_PROMPT.replace("{text}", text),
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to connect to Ollama");
    }

    const data = await response.json();
    let improvedText = data.response.trim();

    // Extract only the improved text after [Output]:
    const match = improvedText.match(/\[Output\]:\s*([\s\S]+)/);
    if (match) {
      improvedText = match[1].trim();
    }

    return NextResponse.json({ improvedText });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to improve text. Make sure Ollama is running." },
      { status: 500 }
    );
  }
}
