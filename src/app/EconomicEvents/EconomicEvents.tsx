// components/EconomicEvents.tsx
import React, { useState } from 'react';
import { interpretEvent } from './interpretEvent';

type EconomicEvent = {
  Name: string;
  Currency: string;
  Event_ID: number;
  Category: string;
  Date: string;
  Actual: number;
  Forecast: number;
  Previous: number;
  Outcome: string;
  Strength: string;
  Quality: string;
  Projection: number;
};

interface Props {
  events: EconomicEvent[];
}

const EconomicEvents: React.FC<Props> = ({ events }) => {
  const [viewMode, setViewMode] = useState<'story' | 'post'>('story');
  console.log('dattaaaaaaa');
  console.log("dattaaaaaaa2222222");
 console.log(events);
  return (
    <div className="flex flex-col font-sans text-[15px] leading-relaxed">
      
      {/* کنترل انتخاب حالت نمایش */}
      <div className="flex justify-center gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="story"
            checked={viewMode === 'story'}
            onChange={() => setViewMode('story')}
          />
          <span>استوری اینستاگرام</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="post"
            checked={viewMode === 'post'}
            onChange={() => setViewMode('post')}
          />
          <span>پست اینستاگرام</span>
        </label>
      </div>

      {events.map((event) => {
        const { summary, goldImpact } = interpretEvent(event.Name, event.Actual, event.Forecast, event.Previous);
        
        return (
          <div
            key={event.Event_ID}
            className={`flex flex-col justify-center w-full px-3 py-4 sm:px-5 sm:py-8 my-4 transition duration-300 ${
              event.Quality === 'Good Data' ? 'bg-green-50' : 'bg-red-50'
            } ${viewMode === 'story' ? 'text-[13px]' : 'text-[18px]'}`}
          >
            <span className="text-xs text-gray-500 mb-2 text-left ltr">@talavue</span>

            <h2 className="text-xl font-bold mb-2 text-left rtl">{event.Name}</h2>
            <p className="text-sm mb-1 text-left rtl">
              {event.Category} • <span className="text-left ltr font-mono inline-block"><bdi>{event.Currency}</bdi></span>
            </p>
            <p className="text-sm mb-2 text-left rtl">
              📅 <span className="text-left ltr font-mono inline-block"><bdi>{new Date(event.Date).toLocaleString()}</bdi></span>
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4 text-left rtl">
              <div>🔢 Actual: <span className="text-left ltr font-mono inline-block"><bdi>{event.Actual}</bdi></span></div>
              <div>📊 Forecast: <span className="text-left ltr font-mono inline-block"><bdi>{event.Forecast}</bdi></span></div>
              <div>📉 Previous: <span className="text-left ltr font-mono inline-block"><bdi>{event.Previous}</bdi></span></div>
              <div>🔮 Projection: <span className="text-left ltr font-mono inline-block"><bdi>{event.Projection}</bdi></span></div>
            </div>

            <p className="text-sm text-left rtl">
              <strong>Outcome:</strong> <span className="text-left ltr font-mono inline-block"><bdi>{event.Outcome}</bdi></span>
            </p>
            <p className="text-sm text-left rtl">
              <strong>Strength:</strong> <span className="text-left ltr font-mono inline-block"><bdi>{event.Strength}</bdi></span>
            </p>
            <p className="text-sm text-left rtl mb-2">
              <strong>Quality:</strong> <span className="text-left ltr font-mono inline-block"><bdi>{event.Quality}</bdi></span>
            </p>

            <hr className="my-4" />

            {/* تحلیل */}
            <div className="text-sm font-medium text-right rtl mb-1">
              📈 <strong>تحلیل:</strong><br /> {summary}
            </div>

            {/* تأثیر بر طلا */}
            <div className="text-sm text-right rtl mb-4">
              💰 <strong>تأثیر بر طلا:</strong><br /> {goldImpact}
            </div>

            {/* اطلاع‌رسانی VIP */}
            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 text-sm text-gray-800 rounded-lg shadow-sm text-right rtl">
              <h3 className="font-bold text-yellow-600 mb-2">📢  رفع مسئولیت</h3>
              <p>
                تحلیل‌های ارائه‌شده توسط هوش مصنوعی بر اساس اخبار اقتصادی تولید شده و صرفاً جهت اطلاع‌رسانی هستند و به‌هیچ‌وجه نباید به‌عنوان توصیه مالی یا سرمایه‌گذاری تلقی شوند.
              </p>
              <p className="mt-2">
                🔐<span className="text-red-600 font-semibold">جهت عضویت و دریافت خدمات ویژه دایرکت پیام دهید</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EconomicEvents;