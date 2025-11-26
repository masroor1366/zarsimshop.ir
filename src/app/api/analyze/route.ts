import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const GET = async () => {
  const API_KEY = process.env.JBLANKED_API_KEY;
  const url = 'https://www.jblanked.com/news/api/mql5/calendar/today/';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:  'Api-Key lxMHo7CX.4hyUznir3Fs4vbLHqmHMOcWphsgRulGG', // بهتره از env گرفته بشه
      },
    });

    
    if (!response.ok) {
      return NextResponse.json(
        [{
        "Name": "EIA Natural Gas Storage Change",
        "Currency": "USD",
        "Event_ID": 840200009,
        "Category": "Commodity Report",
        "Date": "2025.07.31 17:30:00",
        "Actual": 48.0,
        "Forecast": 2.0,
        "Previous": 23.0,
        "Outcome": "Actual > Forecast  Forecast < Previous",
        "Strength": "Strong Data",
        "Quality": "Good Data",
        "Projection": 20.0
    },
    {
        "Name": "Core PCE Price Index m/m",
        "Currency": "USD",
        "Event_ID": 840010001,
        "Category": "Consumer Inflation Report",
        "Date": "2025.07.31 15:30:00",
        "Actual": 0.3,
        "Forecast": 0.4,
        "Previous": 0.2,
        "Outcome": "Actual < Forecast  Actual > Previous",
        "Strength": "Strong Data",
        "Quality": "Bad Data",
        "Projection": 0.3
    }]
     
      );
    }

    const data = await response.json();


    // const filtered = data.filter((event: any) =>
    //   ['CB Consumer Confidence Index', 'JOLTS Job Openings'].includes(event.Name)
    // );

   

//   const analysis = data.map((event: any) => {
//       const { Name, Actual, Forecast, Previous } = event;
//     let summary = '';
//   let goldImpact = '';

//   if (Actual < Forecast && Actual > Previous) {
//     summary = ` نسبت به گذشته بهتر شده، اما ضعیف‌تر از چیزی که پیش‌بینی شده بود.`;
//     goldImpact = `این می‌تواند باعث نوسان محدود در قیمت طلای جهانی شود و تأثیر خنثی یا خفیفی روی طلای ایران داشته باشد.`;
//   } else if (Actual < Forecast && Actual < Previous) {
//     summary = ` افت کرده و هم از پیش‌بینی و هم از مقدار قبلی ضعیف‌تر بوده.`;
//     goldImpact = `ممکن است باعث افزایش قیمت طلای جهانی شود، چرا که ضعف اقتصادی اغلب تقاضا برای دارایی‌های امن را بالا می‌برد. طلای ایران هم احتمالاً تحت تأثیر تورم داخلی افزایشی تجربه خواهد کرد.`;
//   } else if (Actual > Forecast && Actual > Previous) {
//     summary = ` فراتر از انتظار ظاهر شده و نسبت به قبل هم رشد داشته.`;
//     goldImpact = `احتمال کاهش قیمت طلای جهانی وجود دارد، چرا که بهبود داده‌ها می‌تواند تقاضا برای دلار را بالا ببرد. قیمت طلای ایران ممکن است ثابت بماند یا کمی کاهش یابد.`;
//   } else {
//     summary = ` تغییر خاصی نداشته یا نتیجه مبهمی دارد.`;
//     goldImpact = `تأثیر خاصی بر طلای جهانی یا داخلی مشاهده نمی‌شود، اما باید منتظر واکنش بازار بود.`;
//   }

//   return {
//     event: Name,
//     summary_fa: summary,
//     gold_impact_fa: goldImpact,
//   };
// });
    // const analysis = data.map((event: any) => {
    //   const { Name, Actual, Forecast, Previous } = event;
    //   let summary = '';
    //   let goldImpact = '';

    //   if (Actual < Forecast && Actual > Previous) {
    //     summary = `${Name} نسبت به گذشته بهتر شده، اما ضعیف‌تر از چیزی که پیش‌بینی شده بود.`;
    //     goldImpact='test';
    //   } else if (Actual < Forecast && Actual < Previous) {
    //     summary = `${Name} افت کرده و هم از پیش‌بینی و هم از مقدار قبلی ضعیف‌تر بوده.`;
    //     goldImpact='test';
    //   } else if (Actual > Forecast && Actual > Previous) {
    //     summary = `${Name} فراتر از انتظار ظاهر شده و نسبت به قبل هم رشد داشته.`;
    //     goldImpact='test';
    //   } else {
    //     summary = `${Name} تغییر خاصی نداشته یا نتیجه مبهمی دارد.`;
    //     goldImpact='test';
    //   }

    //   return {
    //     event: Name,
    //     summary_fa: summary,
    //     gold_impact_fa: goldImpact
    //   };
    // });

    return NextResponse.json( {data} );
  } catch (error) {
    console.error('❌ خطا در دریافت داده:', error);
    return NextResponse.json(
      { error: 'خطای داخلی هنگام پردازش داده‌ها' },
      { status: 500 }
    );
  }
};