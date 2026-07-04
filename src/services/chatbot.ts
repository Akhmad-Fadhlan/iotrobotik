import { mockDb } from './db';

export interface ChatbotResponse {
  text: string;
  link?: { label: string; tab: string };
}

export function getChatbotResponse(query: string): ChatbotResponse {
  const q = query.toLowerCase().trim();

  // 1. Direct matches for sample/frequent questions
  if (q.includes('bluetooth') || q.includes('source code tinybit')) {
    return {
      text: 'Source code untuk **Tinybit Bluetooth Controller** tersedia di repositori Github resmi. Anda dapat langsung mengunduh file Makecode Hex atau melakukan clone menggunakan git command di panel Source Code.',
      link: { label: 'Buka Source Code Repository', tab: 'source-code' }
    };
  }
  
  if (q.includes('parking') || q.includes('rppm smart parking')) {
    return {
      text: 'Ya, dokumen RPPM untuk project **Smart Parking System** tersedia di Project Library. Anda dapat membukanya melalui folder Google Drive yang tersemat pada detail project tersebut.',
      link: { label: 'Lihat Project Library', tab: 'projects' }
    };
  }
  
  if (q.includes('setelah tinybit') || q.includes('materi setelah tinybit')) {
    return {
      text: 'Berdasarkan **Roadmap Kurikulum Kelas 7**, setelah menyelesaikan materi pemrograman robot **Tinybit**, materi selanjutnya adalah **Microbit Basic** (mengenal pin out, display LED, dan sensor internal) sebelum masuk ke IoT Basic.',
      link: { label: 'Buka Draft Kurikulum', tab: 'kurikulum' }
    };
  }

  // 2. Search in SOPs
  const sops = mockDb.getSops();
  const matchedSop = sops.find(s => 
    s.title.toLowerCase().includes(q) || 
    s.robotName.toLowerCase().includes(q)
  );
  if (matchedSop) {
    const stepsText = matchedSop.steps.map((st, i) => `${i+1}. ${st}`).join('\n');
    return {
      text: `Berikut ringkasan SOP untuk **${matchedSop.title}** (${matchedSop.robotName}):\n\n${stepsText}\n\nDokumentasi SOP lengkap dapat Anda akses di menu SOP.`,
      link: { label: 'Buka SOP Robot', tab: 'sop' }
    };
  }

  // 3. Search in Projects
  const projects = mockDb.getProjects();
  const matchedProjects = projects.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) || 
    p.competencies.toLowerCase().includes(q) || 
    p.hardware.some(h => h.toLowerCase().includes(q)) || 
    p.software.some(s => s.toLowerCase().includes(q))
  );
  if (matchedProjects.length > 0) {
    const list = matchedProjects.slice(0, 3).map(p => 
      `• **${p.name}** (${p.category}): ${p.description}\n  *Hardware*: ${p.hardware.join(', ')}\n  *Tingkat*: ${p.difficulty}`
    ).join('\n\n');
    return {
      text: `Saya menemukan proyek yang relevan di Project Library:\n\n${list}\n\nAnda dapat melihat detail lengkapnya di tab Project Library.`,
      link: { label: 'Buka Project Library', tab: 'projects' }
    };
  }

  // 4. Search in Lessons / Materi
  const lessons = mockDb.getLessons();
  const matchedLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(q) || 
    l.topic.toLowerCase().includes(q) || 
    l.creator.toLowerCase().includes(q)
  );
  if (matchedLessons.length > 0) {
    const list = matchedLessons.slice(0, 4).map(l => 
      `• **${l.title}** (Topik: ${l.topic}, Kelas: ${l.classLevel}): Disusun oleh ${l.creator}`
    ).join('\n');
    return {
      text: `Saya menemukan materi/modul pembelajaran yang cocok:\n\n${list}\n\nAnda dapat mengunduh dan membaca modul lengkapnya di menu Materi.`,
      link: { label: 'Buka Menu Materi', tab: 'materi' }
    };
  }

  // 5. Search in People (Teachers & Technicians)
  const teachers = mockDb.getTeachers();
  const technicians = mockDb.getTechnicians();
  
  // Format teachers and technicians into unified search entities
  const peopleList = [
    ...teachers.map(t => ({ name: t.name, role: 'Guru', branch: t.branch, email: t.email, phone: t.phone, detail: `Kelas ${t.classLevel}` })),
    ...technicians.map(t => ({ name: t.name, role: 'Teknisi', branch: t.branch, email: t.email, phone: t.phone, detail: `Cabang ${t.branch}` }))
  ];

  const matchedPeople = peopleList.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.role.toLowerCase().includes(q) || 
    p.branch.toLowerCase().includes(q)
  );
  
  if (matchedPeople.length > 0) {
    const list = matchedPeople.map(p => 
      `• **${p.name}** (${p.role} - ${p.branch}): ${p.detail}. Kontak: ${p.email || p.phone || '-'}`
    ).join('\n');
    return {
      text: `Berikut informasi staf/guru yang saya temukan:\n\n${list}`,
      link: { label: 'Buka Staf & Guru', tab: 'people' }
    };
  }

  // 6. Search in Inventory
  const inventory = mockDb.getInventory();
  const matchedInv = inventory.filter(i => 
    i.name.toLowerCase().includes(q) || 
    i.category.toLowerCase().includes(q) || 
    i.code.toLowerCase().includes(q)
  );
  if (matchedInv.length > 0) {
    const list = matchedInv.slice(0, 5).map(i => 
      `• **${i.name}** (Kode: ${i.code}): Lokasi di *${i.location}* [Kondisi: ${i.condition}, Status: ${i.status}]`
    ).join('\n');
    return {
      text: `Saya menemukan alat/komponen berikut di lab:\n\n${list}\n\nStatus detail dapat dipantau di tab Inventaris.`,
      link: { label: 'Buka Inventaris LAB', tab: 'inventory' }
    };
  }

  // Fallback / default
  return {
    text: 'Maaf, saya tidak dapat menemukan dokumen spesifik tentang hal itu. Namun, Anda dapat mencari informasi tersebut menggunakan pencarian global di bagian atas website, atau menavigasi ke kategori terkait seperti **Draft Kurikulum** atau **Project Library**.'
  };
}
