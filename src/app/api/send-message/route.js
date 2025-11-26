import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';


const TELEGRAM_BOT_TOKEN='8297834317:AAE4xFCN3mqYqXuAXGQ-nkHCboVrvWHS_gI'
  const CHANNEL_USERNAME = '@talavue';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export async function GET() {
  try {
    // واکشی داده از API
    const response = await fetch('https://BrsApi.ir/Api/Market/Gold_Currency.php?key=Freey5YnannRwTuMxgbGstwJy7LJTBtQ');
    const { gold, currency } = await response.json();
     // استخراج قیمت طلای ۱۸ عیار و دلار آمریکا
    const gold18 = gold.find(item => item.symbol === 'IR_GOLD_18K');
    const usd = currency.find(item => item.symbol === 'USD');




    // ساخت پیام تلگرام
    const message = `
📢 نرخ لحظه‌ای بازار:

🟡 طلای ۱۸ عیار: ${gold18.price.toLocaleString()} ${gold18.unit}
💵 دلار: ${usd.price.toLocaleString()} ${usd.unit}

🟨 طلای ۲۴ عیار: ${formatPrice(gold.find(i => i.symbol === 'IR_GOLD_24K'))}
🟡 طلای آب‌شده: ${formatPrice(gold.find(i => i.symbol === 'IR_GOLD_MELTED'))}
🌍 انس جهانی طلا:${formatPrice(gold.find(i => i.symbol === 'XAUUSD'))}
💵 دلار تتر: ${formatPrice(currency.find(i => i.symbol === 'USDT_IRT'))}
👑 سکه امامی: ${formatPrice(gold.find(i => i.symbol === 'IR_COIN_EMAMI'))}
🎯 سکه بهار آزادی: ${formatPrice(gold.find(i => i.symbol === 'IR_COIN_BAHAR'))}

📅 تاریخ: ${currency[0].date} | ⏰ زمان: ${currency[0].time}
`;





const rows = [
  formatItem('طلای ۲۴ عیار', gold.find(i => i.symbol === 'IR_GOLD_24K')),
  formatItem('انس جهانی طلا', gold.find(i => i.symbol === 'XAUUSD')),
  formatItem('طلای آب‌شده', gold.find(i => i.symbol === 'IR_GOLD_MELTED')),
  formatItem('سکه امامی', gold.find(i => i.symbol === 'IR_COIN_EMAMI')),
  formatItem('سکه بهار آزادی', gold.find(i => i.symbol === 'IR_COIN_BAHAR')),
  formatItem('دلار تتر', currency.find(i => i.symbol === 'USDT_IRT')),
];

const message2 = `
📊نرخ لحظه‌ای بازار طلا و ارز:

${formatItem('💵 ','دلار', currency.find(i => i.symbol === 'USD'))}
${formatItem('💵', 'دلار تتر', currency.find(i => i.symbol === 'USDT_IRT'))}
${formatItem('🌍', 'انس جهانی طلا', gold.find(i => i.symbol === 'XAUUSD'))}

${formatItem('🟨', 'طلای ۱۸ عیار:', gold.find(i => i.symbol === 'IR_GOLD_18K'))}
${formatItem('🟨', 'طلای ۲۴ عیار', gold.find(i => i.symbol === 'IR_GOLD_24K'))}
${formatItem('🟡', 'طلای آب‌شده', gold.find(i => i.symbol === 'IR_GOLD_MELTED'))}
${formatItem('👑', 'سکه امامی', gold.find(i => i.symbol === 'IR_COIN_EMAMI'))}
${formatItem('🎯', 'سکه بهار آزادی', gold.find(i => i.symbol === 'IR_COIN_BAHAR'))}

📅تاریخ:${currency[0].date} ⏰زمان:${currency[0].time}
`;



    // ارسال به کانال
    await bot.sendMessage(CHANNEL_USERNAME, message2);

    return NextResponse.json({ status: 'sent' });
  } catch (error) {
    console.error('خطا:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function formatPrice(item) {
  const emoji = item.change_percent > 0 ? '📈' : item.change_percent < 0 ? '📉' : '⚖️';
  const color = item.change_percent > 0 ? '🟢' : item.change_percent < 0 ? '🔴' : '🟠';

  return `${item.price.toLocaleString()} ${item.unit}  ${color}${emoji} ${item.change_percent > 0 ? '+' : ''}${item.change_percent}%`;
}


function formatItem(emoji, name, item) {
  if (!item) return `${emoji} *${name}:* ❌ داده یافت نشد`;

  const direction = item.change_percent > 0 ? '🔼' : item.change_percent < 0 ? '🔻' : '⏸';
  //const color = item.change_percent > 0 ? '🟢' : item.change_percent < 0 ? '🔴' : '🟠';
  const change = `${item.change_percent > 0 ? '+' : ''}${item.change_percent.toFixed(2)}%`;

  return `${name}:${item.price.toLocaleString()}${item.unit}${direction}${change}`;
}
 
