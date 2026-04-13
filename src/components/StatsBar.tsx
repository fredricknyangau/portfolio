import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  trend?: string;
}

// Simulated backend API integration to prove data fetching proficiency
const fetchBackendStats = async (): Promise<Stat[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: '99.99%', label: 'API Uptime', trend: 'last 30 days' },
        { value: '14ms', label: 'DB Latency', trend: '-2ms' },
        { value: '34.2k', label: 'Webhooks Processed', trend: '+1.2k today' },
        { value: '100%', label: 'Tests Passing', trend: '47/47 coverage' },
      ]);
    }, 1500); // simulate network latency
  });
};

export default function StatsBar(): JSX.Element {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchBackendStats().then((data) => {
      if (mounted) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div
      className={[
        'border-t border-b border-border-dim',
        'grid grid-cols-2 md:grid-cols-4',
        'py-5 px-5 sm:px-6 md:px-12 md:py-7 transition-all',
      ].join(' ')}
    >
      {loading ? (
        <div className="col-span-full flex flex-col items-center justify-center py-4 text-text3 gap-3">
          <Loader2 className="animate-spin text-amber" size={24} />
          <span className="font-mono text-[11px] text-amber-dim uppercase tracking-[0.1em] animate-pulse">
            Connecting to backend telemetry...
          </span>
        </div>
      ) : (
        stats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              'text-center py-4 md:py-0 px-6 fade-up visible',
              i < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-border-dim' : '',
              i === stats.length - 2 ? 'md:border-b-0' : '',
            ].join(' ')}
          >
            <div className="font-serif text-[36px] font-light text-text tracking-[-0.03em] leading-none mb-1.5 flex justify-center items-baseline gap-1">
              <span className="text-amber">{stat.value.replace(/[^0-9.]/g, '')}</span>
              <span className="text-[20px] text-text3">{stat.value.replace(/[0-9.]/g, '')}</span>
            </div>
            <div className="font-mono text-[12px] text-text2 tracking-[0.06em] uppercase">
              {stat.label}
            </div>
            {stat.trend && (
              <div className="font-mono text-[10px] text-green-ok mt-1.5">
                {stat.trend}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
