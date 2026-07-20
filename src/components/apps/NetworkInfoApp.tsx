import React, { useState, useEffect } from 'react';
import { Wifi, MapPin, Copy, ShieldAlert } from 'lucide-react';

interface NetworkData {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
}

export const NetworkInfoApp: React.FC = () => {
  const [data, setData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('Failed');
      const d = await res.json();
      setData({ ip: d.ip, city: d.city, region: d.region, country: d.country_name, org: d.org });
    } catch {
      setError('Unable to retrieve network information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInfo(); }, []);

  return (
    <div className="p-4 text-[#cdd6f4] space-y-3">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-[#cba6f7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-8 space-y-3">
          <Wifi className="w-10 h-10 text-[#585b70] mx-auto" />
          <p className="text-sm text-[#585b70]">{error}</p>
          <button onClick={fetchInfo} className="text-xs text-[#89b4fa] hover:underline cursor-pointer">Retry</button>
        </div>
      ) : data ? (
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#a6adc8] font-bold">IP Address</span>
              <p className="text-sm sm:text-base font-mono font-semibold text-white truncate">{data.ip}</p>
            </div>
            <button onClick={() => navigator.clipboard.writeText(data.ip)} className="p-2 hover:bg-white/10 rounded-lg transition cursor-pointer shrink-0" title="Copy IP">
              <Copy className="w-4 h-4 text-[#89b4fa]" />
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-1.5">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#f38ba8] shrink-0" />
              <span className="text-sm font-semibold text-white">{data.city}, {data.region}</span>
            </div>
            <p className="text-xs text-[#a6adc8]">{data.country}</p>
          </div>

          {data.org && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#a6adc8] font-bold">ISP</span>
              <p className="text-sm text-white break-all">{data.org}</p>
            </div>
          )}

          <div className="rounded-xl border border-[#f38ba8]/30 bg-[#f38ba8]/10 p-4 space-y-2.5">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-[#f38ba8] shrink-0" />
              <span className="text-xs font-bold text-[#f38ba8] uppercase tracking-wider">Stay Vigilant</span>
            </div>
            <p className="text-xs text-[#bac2de] leading-relaxed">
              Be cautious online. Avoid sharing personal information on untrusted sites. Use strong, unique passwords and enable two-factor authentication whenever possible.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
