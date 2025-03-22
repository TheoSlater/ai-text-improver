import { NextRequest, NextResponse } from "next/server";

interface GrammarMatch {
  message: string;
  replacements: { value: string }[];
  offset: number;
  length: number;
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        text: text,
        language: "en-US",
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "LanguageTool API error" }, { status: 500 });
    }

    const data = await response.json();

    const issues = data.matches.map((match: GrammarMatch) => ({
      message: match.message,
      suggestion: match.replacements.map((r) => r.value).join(", "),
      offset: match.offset,
      length: match.length,
    }));

    return NextResponse.json({ issues });
  } catch (error) {
    console.error("Grammar API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
