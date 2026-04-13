const benchmarks = [
  { value: '99.99%', label: 'API Uptime', note: 'last 30 days' },
  { value: '<30ms',  label: 'DB Latency', note: 'p95 aggregation' },
  { value: '47/47',  label: 'Tests Passing', note: 'pytest suite' },
  { value: '99.2%',  label: 'Webhook Delivery', note: 'exponential backoff' },
];

export default function StatsBar(): JSX.Element {
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
