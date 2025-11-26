'use client';
import { useEffect, useState } from 'react';
// import jalaali from 'jalaali-js';


const getJalaliDayName = () => {
  const weekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const today = new Date();
  const dayName = weekDays[today.getDay()];
  return `${dayName} `;
};



type Item = {
  name: string;
  unit: string;
  price: number;
  change_percent: number;
  symbol: string;
  date: string;
  time: string;
};

export default function MarketPage() {
  const [gold, setGold] = useState<Item[]>([]);
  const [currency, setCurrency] = useState<Item[]>([]);
  const [metal_precious, setMetal_precious] = useState<Item[]>([]);

  useEffect(() => {
    fetch('https://BrsApi.ir/Api/Market/Gold_Currency.php?key=Freey5YnannRwTuMxgbGstwJy7LJTBtQ')
      .then((res) => res.json())
      .then((data) => {
        setGold(data.gold);
        setCurrency(data.currency);
      });
  }, []);

    useEffect(() => {
    fetch( 'https://brsapi.ir/Api/Market/Commodity.php?key=Freey5YnannRwTuMxgbGstwJy7LJTBtQ')
      .then((gu) => gu.json())
      .then((data) => {
         
        setMetal_precious(data.metal_precious);
      });
  }, []);

  const symbols: { [key: string]: string } = {
    USD: 'دلار آمریکا',
    USDT_IRT: 'دلار تتر',
    XAUUSD: 'انس جهانی طلا',
    XAGUSD: 'انس جهانی نقره',
    IR_GOLD_18K: 'طلای ۱۸ عیار',
    IR_GOLD_24K: 'طلای ۲۴ عیار',
    IR_COIN_EMAMI: 'سکه امامی',
    IR_COIN_BAHAR: 'سکه بهار آزادی',
    IR_GOLD_MELTED: 'طلای آب‌شده',
  };

  const priorityList = [
    'USD',
    'USDT_IRT',
    'XAUUSD',
    'XAGUSD',
    'IR_GOLD_18K',
    'IR_GOLD_24K',
    // 'IR_COIN_EMAMI',
    // 'IR_COIN_BAHAR',
    // 'IR_GOLD_MELTED',
  ];

  const items = priorityList
    .map((symbol) => {
      const item = gold.find((i) => i.symbol === symbol) || currency.find((i) => i.symbol === symbol) || metal_precious.find((i) => i.symbol === symbol);
      return item ? { ...item, label: symbols[symbol] } : null;
    })
    .filter(Boolean) as (Item & { label: string })[];

  const getColor = (p: number) =>
    p > 0 ? 'text-green-600' : p < 0 ? 'text-red-600' : 'text-gray-500';

  const getArrow = (p: number) =>
    p > 0 ? '🔼' : p < 0 ? '🔻' : '⏸';

  const getBgColor = (p: number) => {
    if (isNaN(p)) return 'bg-gray-200'; // متوقف یا نامعتبر
    if (p > 0) return 'bg-green-100';
    if (p < 0) return 'bg-red-100';
    return 'bg-white'; // ثابت
  };




 
  return (
    <div className="max-w-x1 mx-auto px-3 py-20">
      {/* <h1 className="text-1xl font-bold mb-2 text-center"> فروش شمش طلا و نقره | @ZarSimShop.ir | Gold & Silver Bullion </h1> */}
      <h1 className="text-1xl font-bold mb-2 text-center">
  📞 09120270308 | فروش شمش طلا و نقره   <i className="fab fa-instagram"></i>   <br />

  @ZarSimShop.ir | Gold & Silver Bullion
</h1>
      {/* <p className="text-1xl font-bold mb-1 text-center">فروش شمش طلا و نقره ، سرمایه گذاری امن با ضمانت و فاکتور رسمی ، ارسال سریع به سراسر کشور ، شماره تلفن ثبت سفارش 09120270308</p> */}

      {items.length > 0 && (
        // <p className="text-sm text-center text-gray-500 mb-4">
        <p className="text-md text-center text-black-500 mb-1">

          {/* 📅 {currency[0].date} | ⏰ {currency[0].time}  امروز: {getJalaliDayName()} */}
              {/* 📅 {currency[0].date} | ⏰ {currency[0].time} | {getJalaliDayName()} | 09120270308 */}
              📅 {currency[0].date} | ⏰ {currency[0].time} | 🗓️ {getJalaliDayName()} 
      
        </p>
        
      )}

      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item.symbol}
            className={`flex justify-between items-center p-2 border rounded-lg shadow-md ${getBgColor(item.change_percent)}`}
          >
            <span className="font-semibold">{item.label}</span>

            <div className="text-right">
              <div className="text-lg font-bold">
                {item.price.toLocaleString()} {item.unit}
              </div>
              <div className={`text-sm ${getColor(item.change_percent)}`}>
                {getArrow(item.change_percent)} {item.change_percent > 0 ? '+' : ''}
                {item.change_percent.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}