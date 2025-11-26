'use client';
import { useEffect, useState } from 'react';



// ✅ نوع داده‌ها
type Item = {
  name: string;
  unit: string;
  price: number;
  change_percent: number;
  symbol: string;
};

export default function MarketPage() {
  const [gold, setGold] = useState<Item[]>([]);
  const [currency, setCurrency] = useState<Item[]>([]);

  useEffect(() => {
    fetch('https://BrsApi.ir/Api/Market/Gold_Currency.php?key=Freey5YnannRwTuMxgbGstwJy7LJTBtQ')
      .then((res) => res.json())
      .then((data) => {
        setGold(data.gold);
        setCurrency(data.currency);
      });
  }, []);

//   const symbols = {
//     'IR_GOLD_24K': 'طلای ۲۴ عیار',
//     'IR_GOLD_18K': 'طلای 18 عیار',
//     'USD': 'دلار',
//     'XAUUSD': 'انس جهانی طلا',
//     'IR_GOLD_MELTED': 'طلای آب‌شده',
//     'IR_COIN_EMAMI': 'سکه امامی',
//     'IR_COIN_BAHAR': 'سکه بهار آزادی',
//     'USDT_IRT': 'دلار تتر',
//   };

  const symbols: { [key: string]: string } = {
  IR_GOLD_24K: 'طلای ۲۴ عیار',
  IR_GOLD_18K: 'طلای ۱۸ عیار',
  USD: 'دلار',
  XAUUSD: 'انس جهانی طلا',
  IR_GOLD_MELTED: 'طلای آب‌شده',
  IR_COIN_EMAMI: 'سکه امامی',
  IR_COIN_BAHAR: 'سکه بهار آزادی',
  USDT_IRT: 'دلار تتر',
};

  const items = [
    ...gold.filter((i) => Object.keys(symbols).includes(i.symbol)),
    ...currency.filter((i) => Object.keys(symbols).includes(i.symbol)),
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        قیمت لحظه‌ای طلا، ارز، و سکه در بازار ایران
      </h1>

      <div className="grid gap-4">
        {items.map((item) => {
          const isPositive = item.change_percent > 0;
          const isNegative = item.change_percent < 0;

          return (
            <div
              key={item.symbol}
              className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-md shadow-sm bg-white"
            >
              <span className="font-semibold">{symbols[item.symbol]}</span>

              <div className="text-right sm:text-left">
                <div className="text-lg font-bold">
                  {item.price.toLocaleString()} {item.unit}
                </div>
                <div
                  className={`text-sm ${
                    isPositive
                      ? 'text-green-600'
                      : isNegative
                      ? 'text-red-600'
                      : 'text-gray-500'
                  }`}
                >
                  {isPositive && '🔼 '}
                  {isNegative && '🔻 '}
                  {item.change_percent > 0 ? '+' : ''}
                  {item.change_percent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}