export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("Bot is Live");

  const body = req.body;
  if (!body.message || !body.message.text) {
    return res.status(200).send("OK");
  }

  const chatId = body.message.chat.id;
  const text = body.message.text;
  
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const token = urlParams.get('token');

  if (!token) return res.status(400).send("Token missing");

  const replyText = `😈 M3MO H.ai: أنا شغال على Vercel يا ملك 👑\n\nوصلني: ${text}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: replyText })
    });
  } catch (e) {
    console.error(e);
  }

  res.status(200).send("OK");
}
