export async function POST(request) {
//   const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_TOKEN='7597995063:AAGZaFxMCdcViuvTyD6DzKrf2PM8sWDW68E'
  const CHANNEL_USERNAME = '@aigoldnews';
  const MESSAGE_TEXT = 'پیام تست از Next.js App Router! ✅';

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHANNEL_USERNAME,
        text: MESSAGE_TEXT,
      }),
    });

    const data = await res.json();
    if (data.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, error: data.description }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}