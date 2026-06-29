import { useState } from 'react';
import { 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle 
} from 'lucide-react';
import { mockDb } from '../services/db';

export default function SopView() {
  const sops = mockDb.getSops();
  const [expandedId, setExpandedId] = useState<string | null>('SOP_1'); // Default open first item

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const generalGuidelines = [
    { title: 'Sebelum Praktikum', detail: 'Semua siswa wajib mencuci tangan dan memastikan meja dalam keadaan kering sebelum menyentuh modul hardware. Pastikan modul dirakit di atas alas non-konduktif.' },
    { title: 'Selama Perakitan', detail: 'Matikan baterai/power saat memasang kabel jumper pada pin ESP32/Microbit. Hubungan pendek (short circuit) VCC ke GND dapat membakar IC utama.' },
    { title: 'Setelah Praktikum', detail: 'Cabut semua kabel, rapikan kabel jumper sesuai kategori warna/ukuran, lepas baterai lithium dari sasis robot, lalu kembalikan kit ke laci inventaris dalam keadaan utuh.' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-800">
          SOP Penggunaan Robot
        </h2>
        <p className="text-[12px] text-slate-500 mt-1">
          Standard Operating Procedure (SOP) keselamatan kerja lab, perakitan, dan pemrograman robot.
        </p>
      </div>

      {/* Grid containing Guidelines & Accordions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Accordions (Left Column - 2/3 width) */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="font-heading text-[15px] font-bold text-slate-700 mb-2">
            Prosedur Pengoperasian Hardware
          </h3>
          
          {sops.map((sop) => {
            const isExpanded = expandedId === sop.id;
            return (
              <div 
                key={sop.id} 
                className="glass-card p-0 rounded-3xl overflow-hidden border border-slate-100/50"
              >
                {/* Header Toggle */}
                <div 
                  onClick={() => toggleExpand(sop.id)}
                  className="flex items-center justify-between p-5 cursor-pointer bg-white/40 hover:bg-white/60 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading text-[13.5px] font-bold text-slate-800 leading-tight">
                        {sop.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">
                        Device: {sop.robotName}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
                </div>

                {/* Steps List */}
                {isExpanded && (
                  <div className="p-6 bg-white/20 border-t border-slate-100 space-y-4 animate-fade-in">
                    {sop.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start text-[12.5px] text-slate-700 leading-relaxed">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Lab Rules Sidebar (Right Column - 1/3 width) */}
        <div className="space-y-4">
          <h3 className="font-heading text-[15px] font-bold text-slate-700 mb-2">
            Tata Tertib & Keselamatan Lab
          </h3>
          
          <div className="glass-card p-6 rounded-3xl bg-slate-50/70 border border-slate-100">
            <div className="space-y-4">
              {generalGuidelines.map((rule, idx) => (
                <div key={idx} className="pb-3 last:pb-0 last:border-b-0 border-b border-slate-200/50">
                  <h4 className="font-heading text-[12.5px] font-bold text-slate-800 flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-blue-600" />
                    {rule.title}
                  </h4>
                  <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
