"use client";
import { useEffect, useState } from "react";

interface AnalysisItem {
  event: string;
  summary_fa: string;
  gold_impact_fa: string;
}

export default function NewsCard() {
  const [data, setData] = useState<{ analysis: AnalysisItem[] } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/analyze")
      .then((res) => res.json())
      .then((json) => {
        if (json.analysis) {
          setData(json);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-8">❌ خطا در دریافت اطلاعات</p>;
  }

  if (!data || !Array.isArray(data.analysis)) {
    return <p className="text-gray-600 text-center mt-8">⏳ در حال بارگذاری اطلاعات...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {data.analysis.map((item, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-md p-4 border-l-4 mb-6 border-yellow-500">
          <h3 className="font-bold text-lg text-gray-800 mb-2">{item.event}</h3>
          <p className="text-sm text-gray-600 mb-1">📊 خلاصه تحلیل: <span className="font-medium text-gray-700">{item.summary_fa}</span></p>
          <p className="text-sm text-gray-600">💰 تأثیر بر طلا: <span className="font-medium text-yellow-700">{item.gold_impact_fa}</span></p>
        </div>
      ))}
    </div>
  );
}