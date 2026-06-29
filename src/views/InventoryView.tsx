import { useState } from 'react';
import { 
  Boxes, 
  Search, 
  ArrowRightLeft
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { InventoryItem } from '../services/db';

export default function InventoryView() {
  const [items, setItems] = useState<InventoryItem[]>(() => mockDb.getInventory());
  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'Sensor', 'Microcontroller', 'Robot Kit', 'Mechanical', 'Tools'];
  
  const refreshInventory = () => {
    setItems(mockDb.getInventory());
  };

  const handleAction = (itemId: string, currentStatus: InventoryItem['status']) => {
    const updated = items.map(item => {
      if (item.id === itemId) {
        let newStatus: InventoryItem['status'] = 'Tersedia';
        
        if (currentStatus === 'Tersedia') {
          newStatus = 'Dipinjam';
        } else if (currentStatus === 'Dipinjam') {
          newStatus = 'Tersedia';
        } else if (currentStatus === 'Perbaikan') {
          newStatus = 'Tersedia';
        }

        mockDb.addLog(
          'Guru / Pengguna', 
          `changed status of '${item.name}' (${item.code}) to ${newStatus}`, 
          'Inventaris'
        );

        return { ...item, status: newStatus };
      }
      return item;
    });

    mockDb.saveInventory(updated);
    setItems(updated);
  };

  const filtered = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchVal.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchVal.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: InventoryItem['status']) => {
    switch (status) {
      case 'Tersedia': return 'badge-success';
      case 'Dipinjam': return 'badge-warning';
      case 'Perbaikan': return 'badge-danger';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in" onLoad={refreshInventory}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-800">
            Inventaris Laboratorium Robotik
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Status ketersediaan hardware lab, sensor modular, board, dan peralatan pendukung.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama alat, kode, rak..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="glass-input w-full pl-10 text-[12.5px] py-2"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 bg-slate-200/40 p-1 rounded-2xl border border-slate-200/20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Statuses */}
        <div className="flex gap-1.5 bg-slate-200/40 p-1 rounded-2xl border border-slate-200/20">
          {['All', 'Tersedia', 'Dipinjam', 'Perbaikan'].map(stat => (
            <button
              key={stat}
              onClick={() => setSelectedStatus(stat)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                selectedStatus === stat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Spreadsheet Card */}
      <div className="glass-card p-6 rounded-3xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Kode Barang</th>
              <th className="py-3 px-4">Nama Alat</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Lokasi Rak</th>
              <th className="py-3 px-4">Kondisi</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-slate-500">{item.code}</td>
                <td className="py-4 px-4 font-bold text-slate-800">{item.name}</td>
                <td className="py-4 px-4">
                  <span className="badge badge-secondary font-bold text-[10px]">{item.category}</span>
                </td>
                <td className="py-4 px-4 text-slate-600 font-medium">{item.location}</td>
                <td className="py-4 px-4">
                  <span className={`text-[11.5px] font-semibold ${
                    item.condition === 'Baik' 
                      ? 'text-emerald-600' 
                      : item.condition === 'Rusak Ringan' 
                      ? 'text-amber-500' 
                      : 'text-red-500'
                  }`}>
                    {item.condition}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`badge ${getStatusBadge(item.status)} font-extrabold text-[10px]`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleAction(item.id, item.status)}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      item.status === 'Tersedia'
                        ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                        : item.status === 'Dipinjam'
                        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <ArrowRightLeft size={12} />
                    <span>
                      {item.status === 'Tersedia' 
                        ? 'Pinjam' 
                        : item.status === 'Dipinjam' 
                        ? 'Kembalikan' 
                        : 'Selesai Servis'
                      }
                    </span>
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  <Boxes className="mx-auto mb-2 opacity-30" size={36} />
                  <p className="text-[12.5px] font-medium">Tidak ada inventaris yang ditemukan.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
