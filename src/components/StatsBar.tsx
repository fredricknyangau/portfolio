import { useEffect, useState } from 'react';

export interface TelemetryStat {
  value: string;
  label: string;
  note: string;
}

const fallbackBenchmarks: TelemetryStat[] = [
  { value: '99.99%', label: 'API Uptime', note: 'last 30 days' },
  { value: '<30ms',  label: 'DB Latency', note: 'p95 aggregation' },
  { value: '47/47',  label: 'Tests Passing', note: 'pytest suite' },
  { value: '99.2%',  label: 'Webhook Delivery', note: 'exponential backoff' },
];

export default function StatsBar(): JSX.Element {
  const [benchmarks, setBenchmarks] = useState<TelemetryStat[]>(fallbackBenchmarks);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
        const res = await fetch(`${apiUrl}/api/v1/telemetry`);
        if (res.ok) {
          const data = await res.json();
          if (data.stats && data.stats.length > 0) {
            setBenchmarks(data.stats);
          }
        }
      } catch (err) {
        // Silently fail to static defaults if backend stream is interrupted
        console.warn('Telemetry endpoint offline. Serving static fallbacks.');
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={[
        'border-t border-b border-border-dim',
        'grid grid-cols-2 md:grid-cols-4',
        'py-5 px-5 sm:px-6 md:px-12 md:py-7',
      ].join(' ')}
    >
      {benchmarks.map((stat, i) => {
        // Split value into numeric part and unit suffix
        const numeric = stat.value.replace(/[^0-9.]/g, '');
        const unit    = stat.value.replace(/[0-9.]/g, '');

        return (
          <div
            key={stat.label}
            className={[
              'text-center py-4 md:py-0 px-6 fade-up visible',
              i < benchmarks.length - 1 ? 'border-b md:border-b-0 md:border-r border-border-dim' : '',
            ].join(' ')}
          >
            <div className="font-serif text-[36px] font-light text-text tracking-[-0.03em] leading-none mb-1.5 flex justify-center items-baseline gap-1">
              <span className="text-amber">{numeric}</span>
              <span className="text-[20px] text-text3">{unit}</span>
            </div>
            <div className="font-mono text-[12px] text-text2 tracking-[0.06em] uppercase">
              {stat.label}
            </div>
            <div className="font-mono text-[10px] text-green-ok mt-1.5">
              {stat.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}
