// utils/interpretEvent.ts
export function interpretEvent(Name: string, Actual: number, Forecast: number, Previous: number) {
  let summary = '';
  let goldImpact = '';

  if (Actual < Forecast && Actual > Previous) {
    summary = ` نسبت به گذشته بهتر شده، اما ضعیف‌تر از چیزی که پیش‌بینی شده بود.`;
    goldImpact = `این می‌تواند باعث نوسان محدود در قیمت طلای جهانی شود و تأثیر خنثی یا خفیفی روی طلای ایران داشته باشد.`;
  } else if (Actual < Forecast && Actual < Previous) {
    summary = ` افت کرده و هم از پیش‌بینی و هم از مقدار قبلی ضعیف‌تر بوده.`;
    goldImpact = `ممکن است باعث افزایش قیمت طلای جهانی شود، چرا که ضعف اقتصادی اغلب تقاضا برای دارایی‌های امن را بالا می‌برد. طلای ایران هم احتمالاً تحت تأثیر تورم داخلی افزایشی تجربه خواهد کرد.`;
  } else if (Actual > Forecast && Actual > Previous) {
    summary = ` فراتر از انتظار ظاهر شده و نسبت به قبل هم رشد داشته.`;
    goldImpact = `احتمال کاهش قیمت طلای جهانی وجود دارد، چرا که بهبود داده‌ها می‌تواند تقاضا برای دلار را بالا ببرد. قیمت طلای ایران ممکن است ثابت بماند یا کمی کاهش یابد.`;
  } else {
    summary = ` تغییر خاصی نداشته یا نتیجه مبهمی دارد.`;
    goldImpact = `تأثیر خاصی بر طلای جهانی یا داخلی مشاهده نمی‌شود، اما باید منتظر واکنش بازار بود.`;
  }

  return { summary, goldImpact };
}