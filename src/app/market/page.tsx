'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Item = {
  name: string;
  unit: string;
  price: number;
  change_percent: number;
  symbol: string;
  date: string;
  time: string;
};

type SilverItem = {
  name: string;
  unit: string;
  price: number;
  change_percent: number;
  date: string;
  time: string;
};

const getJalaliDayName = () => {
  const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const today = new Date();
  const day = (today.getDay() + 1) % 7;
  return days[day];
};

export default function MarketPage() {
  const [gold, setGold] = useState<Item[]>([]);
  const [currency, setCurrency] = useState<Item[]>([]);
  const [silver, setSilver] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [res1, res2] = await Promise.all([
        fetch('https://BrsApi.ir/Api/Market/Gold_Currency.php?key=Freey5YnannRwTuMxgbGstwJy7LJTBtQ'),
        fetch('https://BrsApi.ir/Api/Market/Exclusive/Silver_09120270308.php?key=Freey5YnannRwTuMxgbGstwJy7LJTBtQ'),
      ]);

      if (!res1.ok || !res2.ok) {
        throw new Error('خطا در دریافت اطلاعات از سرور');
      }

      const data1 = await res1.json();
      const data2 = await res2.json();

      setGold(data1.gold || []);
      setCurrency(data1.currency || []);

   const silverData: Item[] = Object.entries(data2.data || {}).map(([symbol, item]) => {
  const silverItem = item as SilverItem;
  return {
    symbol,
    name: silverItem.name,
    unit: silverItem.unit,
    price: silverItem.price,
    change_percent: silverItem.change_percent,
    date: silverItem.date,
    time: silverItem.time,
  };
});

      setSilver(silverData);
    } catch (err) {
      console.error('خطا در دریافت داده‌ها:', err);
      setError('❌ خطا در دریافت اطلاعات بازار. لطفاً اتصال اینترنت را بررسی کرده و دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const symbols: { [key: string]: string } = {
    USD: 'دلار آمریکا',
    USDT_IRT: 'دلار تتر',
    XAUUSD: 'انس جهانی طلا',
    XAGUSD: 'انس جهانی نقره',
    IR_GOLD_18K: 'طلای ۱۸ عیار',
    IR_GOLD_24K: 'طلای ۲۴ عیار',
    IR_SILVER_999: 'نقره عیار ۹۹۹',
    IR_SILVER_925: 'نقره عیار ۹۲۵',
  };

  const priorityList = [
    'USD',
    'USDT_IRT',
    'XAUUSD',
    'XAGUSD',
    'IR_GOLD_18K',
    'IR_GOLD_24K',
    'IR_SILVER_999',
    'IR_SILVER_925',
  ];

  const allItems = [...gold, ...currency, ...silver];
  const itemMap = new Map(allItems.map((item) => [item.symbol, item]));

  const items = priorityList
    .map((symbol) => {
      const item = itemMap.get(symbol);
      return item ? { ...item, label: symbols[symbol] } : null;
    })
    .filter(Boolean) as (Item & { label: string })[];

  const getColor = (p: number) => (p > 0 ? 'text-green-600' : p < 0 ? 'text-red-600' : 'text-gray-500');
  const getArrow = (p: number) => (p > 0 ? '⬆️' : p < 0 ? '🔻' : '⏸️');
  const getBgColor = (p: number) => {
    if (isNaN(p)) return 'bg-gray-100';
    if (p > 0) return 'bg-green-50';
    if (p < 0) return 'bg-red-50';
    return 'bg-white';
  };

  
  return (
<div className="w-full min-h-screen bg-gradient-to-b from-yellow-100 to-white flex items-center justify-center font-[IRANSans] text-right overflow-hidden">
<div className="w-fit max-w-[98vw] aspect-[9/12] bg-white flex flex-col justify-between p-2 shadow-lg rounded-xl border border-yellow-300 relative">
{/* لوگو برند - گوشه بالا سمت راست */}
<div className="absolute top-3 right-3 w-12 h-12 bg-white rounded-full shadow-md z-10 flex items-center justify-center">
  <Image
    src="/logo.jpg"
    alt="ZarSim Logo"
    width={40}
    height={40}
  className="object-contain ring-1 ring-gray-300 shadow-md rounded-full bg-black"
    priority
  />
</div>


  
    {/* هدر تبلیغاتی */}
    <div className="bg-yellow-300 text-black text-center text-base font-bold py-2 rounded-md shadow-sm leading-tight">
       فروش ویژه شمش طلا و نقره
    </div>

    {/* اطلاعات تماس */}
    <div className="text-center text-sm font-medium leading-tight mt-1 space-y-1 text-gray-700">
      <a href="https://wa.me/989120270308" target="_blank" rel="noopener noreferrer">
        📱 09120270308 | خرید مستقیم شمش
      </a>
      <br />
      <a href="https://instagram.com/zarsimshop.ir" target="_blank" rel="noopener noreferrer">
          @ZarSimShop.ir | Gold & Silver Bullion
      </a>
    </div>

    {/* وضعیت بارگذاری یا خطا */}
    {loading && <p className="text-center text-sm text-gray-500 my-2 leading-tight">⏳ در حال دریافت اطلاعات...</p>}
    {error && (
      <div className="text-center text-sm text-red-600 my-2 leading-tight">
        {error}
        <button onClick={fetchData} className="block mx-auto mt-2 text-blue-600 underline">
          تلاش مجدد
        </button>
      </div>
    )}

    {/* لیست قیمت‌ها */}
    {!loading && !error && items.length > 0 && (
      <>
        <p className="text-xs text-center text-gray-600 mt-1 leading-tight">
          📅 {items[1]?.date} | ⏰ {items[1]?.time} | 🗓️ {getJalaliDayName()}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {items.map((item) => (
            <div
              key={item.symbol}
              className={`h-20 flex flex-col justify-between p-2 border rounded-md ${getBgColor(item.change_percent)}`}
            >
              <span className="text-sm font-semibold leading-tight text-gray-800">{item.label}</span>
              <div className="text-right space-y-0.5">
                <div className="text-base font-bold leading-tight text-gray-900">
                  {item.price.toLocaleString('fa-IR')} {item.unit}
                </div>
                <div className={`text-xs ${getColor(item.change_percent)} leading-tight`}>
                  {getArrow(item.change_percent)} {item.change_percent > 0 ? '+' : ''}
                  {item.change_percent.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}

    {/* فوتر تبلیغاتی */}
    <div className="bg-black text-white text-center py-2 text-sm rounded-md shadow-sm mt-2 leading-tight">
      📢 برای قیمت روزانه و آموزش رایگان، پیج رو فالو کن: @ZarSimShop.ir
    </div>
  </div>
</div>
  );
}