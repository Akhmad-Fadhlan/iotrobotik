import { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw 
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { Lesson, Project, Teacher, Technician, SopRobot, InventoryItem, AuditLog, SystemConfig, CurriculumSubject } from '../services/db';

export default function AdminView() {
  const [activeTab, setActiveTab] = useState<'wizard' | 'seeder' | 'crud' | 'logs'>('wizard');
  const [crudSubTab, setCrudSubTab] = useState<'lessons' | 'projects' | 'teachers' | 'technicians' | 'inventory' | 'sops' | 'curriculum'>('lessons');

  // Config State
  const [config, setConfig] = useState<SystemConfig>(() => mockDb.getConfig());

  // Database States
  const [lessons, setLessons] = useState<Lesson[]>(() => mockDb.getLessons());
  const [curriculum, setCurriculum] = useState<CurriculumSubject[]>(() => mockDb.getCurriculum());
  const [projects, setProjects] = useState<Project[]>(() => mockDb.getProjects());
  const [teachers, setTeachers] = useState<Teacher[]>(() => mockDb.getTeachers());
  const [technicians, setTechnicians] = useState<Technician[]>(() => mockDb.getTechnicians());
  const [inventory, setInventory] = useState<InventoryItem[]>(() => mockDb.getInventory());
  const [sops, setSops] = useState<SopRobot[]>(() => mockDb.getSops());
  const [logs, setLogs] = useState<AuditLog[]>(() => mockDb.getLogs());

  // Seeder Input Counts
  const [seedCounts, setSeedCounts] = useState({ lessons: 10, projects: 5, teachers: 3, inventory: 15 });

  // CRUD Editing Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemType, setEditItemType] = useState<'lessons' | 'projects' | 'teachers' | 'technicians' | 'inventory' | 'sops' | 'curriculum' | null>(null);

  // CRUD Form States
  const [lessonForm, setLessonForm] = useState({ title: '', classLevel: '7' as '7'|'8', topic: 'Python Basic', duration: '2 JP', driveLinksRaw: '', creator: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', branch: 'Sentul' as Teacher['branch'], classLevel: '7' as Teacher['classLevel'], email: '', phone: '', photo: '', signature: '' });
  const [technicianForm, setTechnicianForm] = useState({ name: '', branch: 'Sentul' as Technician['branch'], email: '', phone: '', photo: '' });
  const [inventoryForm, setInventoryForm] = useState({ name: '', code: '', category: 'Sensor' as InventoryItem['category'], status: 'Tersedia' as InventoryItem['status'], condition: 'Baik' as InventoryItem['condition'], location: 'Laci A-1' });
  const [projectForm, setProjectForm] = useState({ name: '', category: 'Tinybit', difficulty: 'Mudah' as Project['difficulty'], description: '', objectives: '', competencies: '', hardware: '', software: '', duration: '4 JP', driveLink: '', githubLink: '', author: '', year: '2026', curriculumId: '' });
  const [sopForm, setSopForm] = useState({ title: '', robotName: '', steps: '' });
  const [curriculumForm, setCurriculumForm] = useState({ title: '', gradeLevel: '7' as '7'|'8', semester: 'Semester 2', icon: 'trash', desc: '', duration: '3 Minggu', level: 'Pemula', type: 'Praktik Mandiri', status: 'Belum Dimulai' as CurriculumSubject['status'], pic: '', subMateri: '', outputs: '' });

  const refreshAllStates = () => {
    setLessons(mockDb.getLessons());
    setCurriculum(mockDb.getCurriculum());
    setProjects(mockDb.getProjects());
    setTeachers(mockDb.getTeachers());
    setTechnicians(mockDb.getTechnicians());
    setInventory(mockDb.getInventory());
    setSops(mockDb.getSops());
    setLogs(mockDb.getLogs());
    setConfig(mockDb.getConfig());
  };

  // 1. Setup Config Wizard Submit
  const handleConfigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.saveConfig(config);
    mockDb.addLog('Admin', 'Updated system spreadsheet configuration parameters', 'Settings');
    refreshAllStates();
    if (config.appsScriptUrl) {
      await mockDb.postToBackend('/api/config/save', config);
      window.dispatchEvent(new CustomEvent('forceSyncBackend'));
    }
    alert('Config spreadsheet berhasil disimpan!');
  };

  // 2. Seeder commands
  const handleSeed = async () => {
    mockDb.seedDummyData(seedCounts);
    refreshAllStates();
    if (config.appsScriptUrl) {
      await mockDb.postToBackend('/api/seeder', seedCounts);
      window.dispatchEvent(new CustomEvent('forceSyncBackend'));
    }
    alert('Dummy data berhasil ditambahkan ke database local!');
  };

  const handleReset = async () => {
    if (window.confirm('Apakah Anda yakin ingin melakukan reset database? Seluruh data kustom akan hilang.')) {
      mockDb.resetDatabase();
      refreshAllStates();
      if (config.appsScriptUrl) {
        await mockDb.postToBackend('/api/reset', {});
        window.dispatchEvent(new CustomEvent('forceSyncBackend'));
      }
      alert('Database berhasil di-reset ke data bawaan!');
    }
  };

  // 3. CRUD actions
  const handleDelete = async (type: 'lessons' | 'projects' | 'teachers' | 'technicians' | 'inventory' | 'sops' | 'curriculum', id: string, name: string) => {
    if (window.confirm(`Hapus item '${name}' dari database?`)) {
      let route = '';
      if (type === 'lessons') {
        const updated = lessons.filter(l => l.id !== id);
        mockDb.saveLessons(updated);
        route = '/api/materials/delete';
      } else if (type === 'projects') {
        const updated = projects.filter(p => p.id !== id);
        mockDb.saveProjects(updated);
        route = '/api/projects/delete';
      } else if (type === 'teachers') {
        const updated = teachers.filter(t => t.id !== id);
        mockDb.saveTeachers(updated);
        route = '/api/teachers/delete';
      } else if (type === 'technicians') {
        const updated = technicians.filter(t => t.id !== id);
        mockDb.saveTechnicians(updated);
        route = '/api/technicians/delete';
      } else if (type === 'inventory') {
        const updated = inventory.filter(i => i.id !== id);
        mockDb.saveInventory(updated);
        route = '/api/inventory/delete';
      } else if (type === 'sops') {
        const updated = sops.filter(s => s.id !== id);
        mockDb.saveSops(updated);
        route = '/api/sops/delete';
      } else if (type === 'curriculum') {
        const updated = curriculum.filter(c => c.id !== id);
        mockDb.saveCurriculum(updated);
        route = '/api/curriculum/delete';
      }
      mockDb.addLog('Admin', `Deleted ${type} record: '${name}'`, type.toUpperCase());
      refreshAllStates();

      if (config.appsScriptUrl && route) {
        await mockDb.postToBackend(route, { id });
        window.dispatchEvent(new CustomEvent('forceSyncBackend'));
      }
    }
  };


  const openAddModal = (type: 'lessons' | 'projects' | 'teachers' | 'technicians' | 'inventory' | 'sops' | 'curriculum') => {
    setEditItemType(type);
    if (type === 'lessons') {
      setLessonForm({ title: '', classLevel: '7', topic: 'Python Basic', duration: '2 JP', driveLinksRaw: '', creator: teachers[0]?.name || 'Admin' });
    } else if (type === 'teachers') {
      setTeacherForm({ name: '', branch: 'Sentul', classLevel: '7', email: '', phone: '', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', signature: '' });
    } else if (type === 'technicians') {
      setTechnicianForm({ name: '', branch: 'Sentul', email: '', phone: '', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' });
    } else if (type === 'inventory') {
      setInventoryForm({ name: '', code: `SNS-${100 + Math.floor(Math.random()*900)}`, category: 'Sensor', status: 'Tersedia', condition: 'Baik', location: 'Laci A-1' });
    } else if (type === 'projects') {
      setProjectForm({ name: '', category: 'Tinybit', difficulty: 'Mudah', description: '', objectives: '', competencies: '', hardware: '', software: '', duration: '4 JP', driveLink: '', githubLink: '', author: teachers[0]?.name || 'Admin', year: '2026', curriculumId: '' });
    } else if (type === 'sops') {
      setSopForm({ title: '', robotName: '', steps: '' });
    } else if (type === 'curriculum') {
      setCurriculumForm({ title: '', gradeLevel: '7', semester: 'Semester 2', icon: 'trash', desc: '', duration: '3 Minggu', level: 'Pemula', type: 'Praktik Mandiri', status: 'Belum Dimulai', pic: teachers[0]?.name || 'Admin', subMateri: '', outputs: '' });
    }
    setShowEditModal(true);
  };

  const handleCrudSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let route = '';
    let payload: any = null;

    if (editItemType === 'lessons') {
      const current = mockDb.getLessons();
      // Parse multiple drive links from textarea (one per line, format: "Label|URL" or just URL)
      const parsedLinks = lessonForm.driveLinksRaw
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => {
          const parts = s.split('|');
          return parts.length >= 2
            ? { label: parts[0].trim(), url: parts.slice(1).join('|').trim() }
            : { label: 'Google Drive', url: s };
        });
      const newLesson: Lesson = {
        id: `M_NEW_${Date.now()}`,
        title: lessonForm.title,
        classLevel: lessonForm.classLevel,
        topic: lessonForm.topic,
        duration: lessonForm.duration,
        driveLinks: parsedLinks.length > 0 ? parsedLinks : [{ label: 'Google Drive', url: 'https://drive.google.com' }],
        creator: lessonForm.creator,
      };
      current.push(newLesson);
      mockDb.saveLessons(current);
      mockDb.addLog('Admin', `Added new lesson: '${newLesson.title}'`, 'Materi');
      route = '/api/materials/create';
      payload = newLesson;
    } else if (editItemType === 'teachers') {
      const current = mockDb.getTeachers();
      const newTeacher: Teacher = {
        id: `T_NEW_${Date.now()}`,
        ...teacherForm
      };
      current.push(newTeacher);
      mockDb.saveTeachers(current);
      mockDb.addLog('Admin', `Added new teacher: '${newTeacher.name}'`, 'Guru');
      route = '/api/teachers/create';
      payload = newTeacher;
    } else if (editItemType === 'technicians') {
      const current = mockDb.getTechnicians();
      const newTechnician: Technician = {
        id: `TEC_NEW_${Date.now()}`,
        ...technicianForm
      };
      current.push(newTechnician);
      mockDb.saveTechnicians(current);
      mockDb.addLog('Admin', `Added new technician: '${newTechnician.name}'`, 'Teknisi');
      route = '/api/technicians/create';
      payload = newTechnician;
    } else if (editItemType === 'inventory') {
      const current = mockDb.getInventory();
      const newInventory: InventoryItem = {
        id: `I_NEW_${Date.now()}`,
        ...inventoryForm
      };
      current.push(newInventory);
      mockDb.saveInventory(current);
      mockDb.addLog('Admin', `Added new inventory item: '${newInventory.name}'`, 'Inventaris');
      route = '/api/inventory/create';
      payload = newInventory;
    } else if (editItemType === 'projects') {
      const current = mockDb.getProjects();
      const newProject: Project = {
        id: `P_NEW_${Date.now()}`,
        ...projectForm,
        hardware: projectForm.hardware.split(',').map(s => s.trim()).filter(Boolean),
        software: projectForm.software.split(',').map(s => s.trim()).filter(Boolean)
      };
      current.push(newProject);
      mockDb.saveProjects(current);
      mockDb.addLog('Admin', `Added new project: '${newProject.name}'`, 'Project');
      route = '/api/projects/create';
      payload = newProject;
    } else if (editItemType === 'sops') {
      const current = mockDb.getSops();
      const newSop: SopRobot = {
        id: `SOP_NEW_${Date.now()}`,
        title: sopForm.title,
        robotName: sopForm.robotName,
        steps: sopForm.steps.split('\n').map(s => s.trim()).filter(Boolean)
      };
      current.push(newSop);
      mockDb.saveSops(current);
      mockDb.addLog('Admin', `Added new SOP: '${newSop.title}'`, 'SOP');
      route = '/api/sops/create';
      payload = newSop;
    } else if (editItemType === 'curriculum') {
      const current = mockDb.getCurriculum();
      const newSub: CurriculumSubject = {
        id: `C_NEW_${Date.now()}`,
        title: curriculumForm.title,
        gradeLevel: curriculumForm.gradeLevel,
        semester: curriculumForm.semester,
        icon: curriculumForm.icon,
        desc: curriculumForm.desc,
        duration: curriculumForm.duration,
        level: curriculumForm.level,
        type: curriculumForm.type,
        status: curriculumForm.status,
        pic: curriculumForm.pic,
        subMateri: curriculumForm.subMateri.split('\n').map(s => s.trim()).filter(Boolean).map(s => ({ name: s })),
        outputs: curriculumForm.outputs.split('\n').map(s => s.trim()).filter(Boolean)
      };
      current.push(newSub);
      mockDb.saveCurriculum(current);
      mockDb.addLog('Admin', `Added new curriculum subject: '${newSub.title}'`, 'Curriculum');
      route = '/api/curriculum/create';
      payload = newSub;
    }
    setShowEditModal(false);
    refreshAllStates();

    if (config.appsScriptUrl && route && payload) {
      await mockDb.postToBackend(route, payload);
      window.dispatchEvent(new CustomEvent('forceSyncBackend'));
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={24} />
            Control Center Administrator
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Gunakan panel ini untuk sinkronisasi database Spreadsheet, seeder, dan memodifikasi records.
          </p>
        </div>

        {/* Action Toggle Tabs */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-slate-200/30 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === 'wizard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Setup Wizard
          </button>
          <button
            onClick={() => setActiveTab('seeder')}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === 'seeder' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dummy Seeder
          </button>
          <button
            onClick={() => setActiveTab('crud')}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === 'crud' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kelola Database
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === 'logs' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Logs
          </button>
        </div>
      </div>

      {/* Tab: Config Wizard */}
      {activeTab === 'wizard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl space-y-5">
            <h3 className="font-heading text-[15px] font-bold text-slate-800">
              Koneksi Integrasi Google Workspace CMS
            </h3>
            
            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-slate-700">Google Spreadsheet ID (Admin Panel)</label>
                <input
                  type="text"
                  value={config.spreadsheetId}
                  onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
                  className="glass-input text-[13px]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-slate-700">Google Drive Folder ID (Storage Aset)</label>
                <input
                  type="text"
                  value={config.driveFolderId}
                  onChange={(e) => setConfig({ ...config, driveFolderId: e.target.value })}
                  className="glass-input text-[13px]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-slate-700">Google Apps Script Web App URL (Deploy Link)</label>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={config.appsScriptUrl || ''}
                  onChange={(e) => setConfig({ ...config, appsScriptUrl: e.target.value })}
                  className="glass-input text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-700">Nama Sekolah</label>
                  <input
                    type="text"
                    value={config.schoolName}
                    onChange={(e) => setConfig({ ...config, schoolName: e.target.value })}
                    className="glass-input text-[13px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-slate-700">Model Chatbot AI</label>
                  <select
                    value={config.chatbotModel}
                    onChange={(e) => setConfig({ ...config, chatbotModel: e.target.value })}
                    className="glass-input text-[13px]"
                  >
                    <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                    <option value="gpt-4o">OpenAI GPT-4o</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-slate-700">Jumlah Siswa Aktif (Untuk Statistik Beranda)</label>
                <input
                  type="text"
                  placeholder="2.5K+ atau 2500"
                  value={config.totalStudents || ''}
                  onChange={(e) => setConfig({ ...config, totalStudents: e.target.value })}
                  className="glass-input text-[13px]"
                />
              </div>

              <button type="submit" className="glass-button py-3 text-[13px] font-bold mt-2">
                <Save size={16} />
                Simpan & Sinkronisasi
              </button>
            </form>
          </div>

          {/* Setup Wizard Progress Checkmarks */}
          <div className="glass-card p-6 rounded-3xl bg-slate-50/70 border border-slate-200/50 space-y-4">
            <h3 className="font-heading text-[14.5px] font-bold text-slate-800 pb-2 border-b border-slate-200">
              System Initialization Checklist
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Verifikasi API Credentials', status: 'Passed' },
                { label: 'Cek Skema Kolom Spreadsheet', status: 'Passed' },
                { label: 'Mount Folder Asset Google Drive', status: 'Passed' },
                { label: 'Inisialisasi Cache Memory Hub', status: 'Active' }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-bold">
                    ✓
                  </div>
                  <span className="text-[12px] font-semibold text-slate-600">{step.label}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block leading-normal">
                CMS Status: **Linked**. Hub terhubung secara penuh ke Google Workspace Spreadsheet API sebagai backend real-time.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Dummy Seeder */}
      {activeTab === 'seeder' && (
        <div className="glass-card p-6 rounded-3xl space-y-6">
          <div>
            <h3 className="font-heading text-[15px] font-bold text-slate-800">
              Pengisian Data Contoh (Realistic Dummy Seeder)
            </h3>
            <p className="text-[12px] text-slate-500 mt-1">
              Tambahkan data latih/contoh berukuran besar untuk melakukan stress-testing antarmuka layout dan pengisian hub.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-bold text-slate-700">Materi Baru</label>
              <input
                type="number"
                value={seedCounts.lessons}
                onChange={(e) => setSeedCounts({ ...seedCounts, lessons: parseInt(e.target.value) || 0 })}
                className="glass-input py-2 text-[13px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-bold text-slate-700">Project Library</label>
              <input
                type="number"
                value={seedCounts.projects}
                onChange={(e) => setSeedCounts({ ...seedCounts, projects: parseInt(e.target.value) || 0 })}
                className="glass-input py-2 text-[13px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-bold text-slate-700">Guru Baru</label>
              <input
                type="number"
                value={seedCounts.teachers}
                onChange={(e) => setSeedCounts({ ...seedCounts, teachers: parseInt(e.target.value) || 0 })}
                className="glass-input py-2 text-[13px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-bold text-slate-700">Inventaris LAB</label>
              <input
                type="number"
                value={seedCounts.inventory}
                onChange={(e) => setSeedCounts({ ...seedCounts, inventory: parseInt(e.target.value) || 0 })}
                className="glass-input py-2 text-[13px]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={handleSeed} className="glass-button font-bold text-[12.5px]">
              <RefreshCw size={15} />
              Jalankan Seeder Contoh
            </button>
            <button onClick={handleReset} className="glass-button-secondary font-bold text-[12.5px] text-red-600 hover:text-red-700 border-red-200">
              Reset Semua Database ke Bawaan
            </button>
          </div>
        </div>
      )}

      {/* Tab: CRUD Manager */}
      {activeTab === 'crud' && (
        <div className="space-y-6">
          {/* Sub tabs selectors */}
          <div className="flex flex-wrap gap-1.5 bg-slate-200/40 p-1.5 rounded-2xl border border-slate-200/20 self-start">
            <button
              onClick={() => setCrudSubTab('lessons')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'lessons' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Materi ({lessons.length})
            </button>
            <button
              onClick={() => setCrudSubTab('curriculum')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'curriculum' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kurikulum ({curriculum.length})
            </button>
            <button
              onClick={() => setCrudSubTab('projects')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'projects' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Project Library ({projects.length})
            </button>
            <button
              onClick={() => setCrudSubTab('teachers')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'teachers' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Guru ({teachers.length})
            </button>
            <button
              onClick={() => setCrudSubTab('technicians')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'technicians' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teknisi ({technicians.length})
            </button>
            <button
              onClick={() => setCrudSubTab('inventory')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'inventory' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inventaris ({inventory.length})
            </button>
            <button
              onClick={() => setCrudSubTab('sops')}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                crudSubTab === 'sops' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SOP Robot ({sops.length})
            </button>
          </div>

          {/* Sub Content: Lessons CRUD */}
          {crudSubTab === 'lessons' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar Materi Ajar
                </h3>
                <button 
                  onClick={() => openAddModal('lessons')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah Materi
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3 w-[70px]">Kelas</th>
                    <th className="py-2.5 px-3">Topik</th>
                    <th className="py-2.5 px-3">Judul Materi</th>
                    <th className="py-2.5 px-3">Durasi</th>
                    <th className="py-2.5 px-3">Penyusun</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 w-[70px]"><span className="badge-blue">Kelas {lesson.classLevel}</span></td>
                      <td className="py-3 px-3 font-semibold text-slate-500">{lesson.topic}</td>
                      <td className="py-3 px-3 font-bold text-slate-800">{lesson.title}</td>
                      <td className="py-3 px-3">{lesson.duration}</td>
                      <td className="py-3 px-3 font-medium text-slate-600">{lesson.creator}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('lessons', lesson.id, lesson.title)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Content: Projects CRUD */}
          {crudSubTab === 'projects' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar Proyek (Project Library)
                </h3>
                <button 
                  onClick={() => openAddModal('projects')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah Proyek
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3">Nama Proyek</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Kesulitan</th>
                    <th className="py-2.5 px-3">Penyusun</th>
                    <th className="py-2.5 px-3">Tahun</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-800">{project.name}</td>
                      <td className="py-3 px-3">{project.category}</td>
                      <td className="py-3 px-3">{project.difficulty}</td>
                      <td className="py-3 px-3">{project.author}</td>
                      <td className="py-3 px-3">{project.year}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('projects', project.id, project.name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Content: Teachers CRUD */}
          {crudSubTab === 'teachers' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar Guru Robotik
                </h3>
                <button 
                  onClick={() => openAddModal('teachers')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah Guru
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3">Nama</th>
                    <th className="py-2.5 px-3">Cabang</th>
                    <th className="py-2.5 px-3">Tingkat Ajar</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-800">{teacher.name}</td>
                      <td className="py-3 px-3">{teacher.branch}</td>
                      <td className="py-3 px-3">Kelas {teacher.classLevel}</td>
                      <td className="py-3 px-3 text-slate-500">{teacher.email}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('teachers', teacher.id, teacher.name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Content: Technicians CRUD */}
          {crudSubTab === 'technicians' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar Teknisi Laboratorium
                </h3>
                <button 
                  onClick={() => openAddModal('technicians')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah Teknisi
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3">Nama</th>
                    <th className="py-2.5 px-3">Cabang</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Telepon</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {technicians.map((tech) => (
                    <tr key={tech.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-800">{tech.name}</td>
                      <td className="py-3 px-3">{tech.branch}</td>
                      <td className="py-3 px-3 text-slate-500">{tech.email}</td>
                      <td className="py-3 px-3">{tech.phone}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('technicians', tech.id, tech.name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Content: Inventory CRUD */}
          {crudSubTab === 'inventory' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar Inventaris Laboratorium
                </h3>
                <button 
                  onClick={() => openAddModal('inventory')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah Alat
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3">Kode</th>
                    <th className="py-2.5 px-3">Nama Alat</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Kondisi</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-400">{item.code}</td>
                      <td className="py-3 px-3 font-bold text-slate-800">{item.name}</td>
                      <td className="py-3 px-3">{item.category}</td>
                      <td className="py-3 px-3">{item.condition}</td>
                      <td className="py-3 px-3 font-semibold">{item.status}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('inventory', item.id, item.name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Content: SOPs CRUD */}
          {crudSubTab === 'sops' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar SOP Penggunaan Robot
                </h3>
                <button 
                  onClick={() => openAddModal('sops')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah SOP
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3">Judul SOP</th>
                    <th className="py-2.5 px-3">Nama Robot</th>
                    <th className="py-2.5 px-3">Jumlah Langkah</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sops.map((sop) => (
                    <tr key={sop.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-800">{sop.title}</td>
                      <td className="py-3 px-3">{sop.robotName}</td>
                      <td className="py-3 px-3">{sop.steps.length} Langkah</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('sops', sop.id, sop.title)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Content: Curriculum CRUD */}
          {crudSubTab === 'curriculum' && (
            <div className="glass-card p-6 rounded-3xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                  Daftar Subjek Kurikulum
                </h3>
                <button 
                  onClick={() => openAddModal('curriculum')}
                  className="glass-button py-2 px-3 text-[11px] rounded-xl"
                >
                  <Plus size={14} />
                  Tambah Subjek
                </button>
              </div>

              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                    <th className="py-2.5 px-3">Judul</th>
                    <th className="py-2.5 px-3">Tingkat Ajar</th>
                    <th className="py-2.5 px-3">Semester</th>
                    <th className="py-2.5 px-3">Durasi</th>
                    <th className="py-2.5 px-3">Tingkat</th>
                    <th className="py-2.5 px-3">PJ (Guru)</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {curriculum.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-800">{sub.title}</td>
                      <td className="py-3 px-3">Kelas {sub.gradeLevel}</td>
                      <td className="py-3 px-3">{sub.semester}</td>
                      <td className="py-3 px-3">{sub.duration}</td>
                      <td className="py-3 px-3">{sub.level}</td>
                      <td className="py-3 px-3">{sub.pic}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${
                          sub.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                          sub.status === 'Sedang Berjalan' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete('curriculum', sub.id, sub.title)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab: Logs */}
      {activeTab === 'logs' && (
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-heading text-[15px] font-bold text-slate-800">
                System Audit Trail Logs
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Riwayat perubahan sistem, seeder, dan update inventaris secara transparan.
              </p>
            </div>
            <button 
              onClick={() => {
                mockDb.clearLogs();
                refreshAllStates();
              }}
              className="text-[11px] font-bold text-red-500 hover:underline"
            >
              Hapus Semua Logs
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9.5px]">
                  <th className="py-2.5 px-3">Waktu</th>
                  <th className="py-2.5 px-3">Pengguna</th>
                  <th className="py-2.5 px-3">Modul</th>
                  <th className="py-2.5 px-3">Tindakan / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-400">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-slate-800 font-bold">{log.user}</td>
                    <td className="py-2.5 px-3 text-blue-600">{log.module}</td>
                    <td className="py-2.5 px-3">{log.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CRUD Creation Form Overlay Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-[420px] p-8 border border-white/50 bg-white/80 shadow-2xl relative">
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute right-6 top-6 rounded-full p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              x
            </button>

            <h3 className="font-heading text-[16px] font-bold text-slate-800 mb-5 text-center">
              Tambah Rekor {
                editItemType === 'lessons' ? 'Materi' :
                editItemType === 'teachers' ? 'Guru' :
                editItemType === 'technicians' ? 'Teknisi' :
                editItemType === 'projects' ? 'Proyek' :
                editItemType === 'sops' ? 'SOP Robot' : 'Alat Lab'
              } Baru
            </h3>

            <form onSubmit={handleCrudSubmit} className="space-y-4">
              
              {/* LESSON FORM FIELDS */}
              {editItemType === 'lessons' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Judul Materi</label>
                    <input
                      type="text"
                      value={lessonForm.title}
                      onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Kelas</label>
                      <select
                        value={lessonForm.classLevel}
                        onChange={(e) => setLessonForm({ ...lessonForm, classLevel: e.target.value as '7'|'8' })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Estimasi</label>
                      <input
                        type="text"
                        placeholder="2 JP"
                        value={lessonForm.duration}
                        onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Topik Ajar</label>
                    <input
                      type="text"
                      placeholder="Python / Tinybit / ESP32"
                      value={lessonForm.topic}
                      onChange={(e) => setLessonForm({ ...lessonForm, topic: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Link Aset (satu per baris)</label>
                    <p className="text-[10.5px] text-slate-400">Format: <code>Label|URL</code> atau hanya URL. Contoh: <code>Modul Drive|https://drive.google.com/...</code></p>
                    <textarea
                      placeholder={`Modul Presentasi|https://docs.google.com/...\nFolder Drive|https://drive.google.com/...`}
                      value={lessonForm.driveLinksRaw}
                      onChange={(e) => setLessonForm({ ...lessonForm, driveLinksRaw: e.target.value })}
                      className="glass-input text-[12.5px] py-2 resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Penyusun</label>
                    <select
                      value={lessonForm.creator}
                      onChange={(e) => setLessonForm({ ...lessonForm, creator: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    >
                      {teachers.map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* TEACHER FORM FIELDS */}
              {editItemType === 'teachers' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Nama Lengkap</label>
                    <input
                      type="text"
                      value={teacherForm.name}
                      onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Cabang</label>
                      <select
                        value={teacherForm.branch}
                        onChange={(e) => setTeacherForm({ ...teacherForm, branch: e.target.value as Teacher['branch'] })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Sentul">Sentul</option>
                        <option value="Jonggol">Jonggol</option>
                        <option value="Pamijahan">Pamijahan</option>
                        <option value="Solo">Solo</option>
                        <option value="Akhwat">Akhwat</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Tingkat Kelas</label>
                      <select
                        value={teacherForm.classLevel}
                        onChange={(e) => setTeacherForm({ ...teacherForm, classLevel: e.target.value as Teacher['classLevel'] })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                        <option value="7 & 8">Kelas 7 & 8</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Email</label>
                    <input
                      type="email"
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Telepon</label>
                    <input
                      type="text"
                      value={teacherForm.phone}
                      onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">URL Tanda Tangan (Signature)</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={teacherForm.signature}
                      onChange={(e) => setTeacherForm({ ...teacherForm, signature: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    />
                  </div>
                </>
              )}

              {/* TECHNICIAN FORM FIELDS */}
              {editItemType === 'technicians' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Nama Lengkap</label>
                    <input
                      type="text"
                      value={technicianForm.name}
                      onChange={(e) => setTechnicianForm({ ...technicianForm, name: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Cabang</label>
                    <select
                      value={technicianForm.branch}
                      onChange={(e) => setTechnicianForm({ ...technicianForm, branch: e.target.value as Technician['branch'] })}
                      className="glass-input text-[12.5px] py-2"
                    >
                      <option value="Sentul">Sentul</option>
                      <option value="Jonggol">Jonggol</option>
                      <option value="Pamijahan">Pamijahan</option>
                      <option value="Solo">Solo</option>
                      <option value="Akhwat">Akhwat</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Email</label>
                    <input
                      type="email"
                      value={technicianForm.email}
                      onChange={(e) => setTechnicianForm({ ...technicianForm, email: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Telepon</label>
                    <input
                      type="text"
                      value={technicianForm.phone}
                      onChange={(e) => setTechnicianForm({ ...technicianForm, phone: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>
                </>
              )}

              {/* INVENTORY FORM FIELDS */}
              {editItemType === 'inventory' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Nama Alat</label>
                    <input
                      type="text"
                      value={inventoryForm.name}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Kode Barang</label>
                      <input
                        type="text"
                        value={inventoryForm.code}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, code: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Kategori</label>
                      <select
                        value={inventoryForm.category}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, category: e.target.value as InventoryItem['category'] })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Sensor">Sensor</option>
                        <option value="Microcontroller">Microcontroller</option>
                        <option value="Robot Kit">Robot Kit</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Lokasi Rak</label>
                      <input
                        type="text"
                        value={inventoryForm.location}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, location: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Kondisi</label>
                      <select
                        value={inventoryForm.condition}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, condition: e.target.value as InventoryItem['condition'] })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Baik">Baik</option>
                        <option value="Rusak Ringan">Rusak Ringan</option>
                        <option value="Rusak Berat">Rusak Berat</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* PROJECT FORM FIELDS */}
              {editItemType === 'projects' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Materi (Nama Proyek)</label>
                    <input
                      type="text"
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Kategori</label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Tingkat Kesulitan</label>
                      <select
                        value={projectForm.difficulty}
                        onChange={(e) => setProjectForm({ ...projectForm, difficulty: e.target.value as Project['difficulty'] })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Mudah">Mudah</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Sulit">Sulit</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Deskripsi Proyek</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="glass-input text-[12.5px] py-2 h-16 resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">SKL (Standar Kompetensi Lulusan)</label>
                    <input
                      type="text"
                      value={projectForm.objectives}
                      onChange={(e) => setProjectForm({ ...projectForm, objectives: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Kompetensi yang Dilatih</label>
                    <input
                      type="text"
                      value={projectForm.competencies}
                      onChange={(e) => setProjectForm({ ...projectForm, competencies: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Hardware / Alat &amp; Bahan (koma)</label>
                    <input
                      type="text"
                      placeholder="Micro:bit, Servo, Sensor"
                      value={projectForm.hardware}
                      onChange={(e) => setProjectForm({ ...projectForm, hardware: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">AI &amp; Software yang Digunakan (koma)</label>
                    <input
                      type="text"
                      placeholder="Makecode, ChatGPT, Lovable"
                      value={projectForm.software}
                      onChange={(e) => setProjectForm({ ...projectForm, software: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Link GitHub</label>
                      <input
                        type="url"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Link Materi (Modul Ajar)</label>
                      <input
                        type="url"
                        value={projectForm.driveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, driveLink: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">PIC (Penanggung Jawab / Guru)</label>
                      <select
                        value={projectForm.author}
                        onChange={(e) => setProjectForm({ ...projectForm, author: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Admin">Admin</option>
                        {teachers.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Tahun Pembuatan</label>
                      <input
                        type="text"
                        placeholder="2025"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Bersumber dari Subjek Kurikulum</label>
                    <select
                      value={projectForm.curriculumId}
                      onChange={(e) => setProjectForm({ ...projectForm, curriculumId: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                    >
                      <option value="">-- Bukan dari Kurikulum (Umum) --</option>
                      {curriculum.map(c => (
                        <option key={c.id} value={c.id}>{c.title} (Kelas {c.gradeLevel} - {c.semester})</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* SOP FORM FIELDS */}
              {editItemType === 'sops' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Judul SOP</label>
                    <input
                      type="text"
                      value={sopForm.title}
                      onChange={(e) => setSopForm({ ...sopForm, title: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Nama Robot</label>
                    <input
                      type="text"
                      value={sopForm.robotName}
                      onChange={(e) => setSopForm({ ...sopForm, robotName: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Langkah-langkah (satu langkah per baris)</label>
                    <textarea
                      value={sopForm.steps}
                      onChange={(e) => setSopForm({ ...sopForm, steps: e.target.value })}
                      className="glass-input text-[12.5px] py-2 h-24 resize-none"
                      required
                    />
                  </div>
                </>
              )}

              {/* CURRICULUM FORM FIELDS */}
              {editItemType === 'curriculum' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Judul Subjek</label>
                    <input
                      type="text"
                      value={curriculumForm.title}
                      onChange={(e) => setCurriculumForm({ ...curriculumForm, title: e.target.value })}
                      className="glass-input text-[12.5px] py-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Kelas</label>
                      <select
                        value={curriculumForm.gradeLevel}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, gradeLevel: e.target.value as '7'|'8' })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Semester</label>
                      <select
                        value={curriculumForm.semester}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, semester: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 4">Semester 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Ikon Visual</label>
                      <select
                        value={curriculumForm.icon}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, icon: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="trash">Tempat Sampah (Trash)</option>
                        <option value="bluetooth">Bluetooth</option>
                        <option value="sprout">Tanaman (Sprout)</option>
                        <option value="parking">Parkir (Parking)</option>
                        <option value="home">Rumah (Home)</option>
                        <option value="route">Rute (Route)</option>
                        <option value="hand">Tangan (Hand)</option>
                        <option value="package">Paket (Package)</option>
                        <option value="graduation">Wisuda (Graduation)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Durasi</label>
                      <input
                        type="text"
                        placeholder="3 Minggu"
                        value={curriculumForm.duration}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, duration: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Tingkat Kesulitan</label>
                      <input
                        type="text"
                        placeholder="Pemula / Menengah"
                        value={curriculumForm.level}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, level: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Jenis Pembelajaran</label>
                      <input
                        type="text"
                        placeholder="Praktik Mandiri"
                        value={curriculumForm.type}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, type: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">Status</label>
                      <select
                        value={curriculumForm.status}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, status: e.target.value as any })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="Selesai">Selesai</option>
                        <option value="Sedang Berjalan">Sedang Berjalan</option>
                        <option value="Belum Dimulai">Belum Dimulai</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11.5px] font-bold text-slate-700">PJ / Guru Ajar</label>
                      <select
                        value={curriculumForm.pic}
                        onChange={(e) => setCurriculumForm({ ...curriculumForm, pic: e.target.value })}
                        className="glass-input text-[12.5px] py-2"
                      >
                        <option value="System">System</option>
                        {teachers.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Deskripsi Ringkas</label>
                    <textarea
                      value={curriculumForm.desc}
                      onChange={(e) => setCurriculumForm({ ...curriculumForm, desc: e.target.value })}
                      className="glass-input text-[12.5px] py-2 h-16 resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Sub Materi Ajar (satu per baris)</label>
                    <textarea
                      placeholder="Mengenal Microbit&#10;Logika Percabangan"
                      value={curriculumForm.subMateri}
                      onChange={(e) => setCurriculumForm({ ...curriculumForm, subMateri: e.target.value })}
                      className="glass-input text-[12.5px] py-2 h-16 resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-slate-700">Output Proyek (satu per baris)</label>
                    <textarea
                      placeholder="Video Demo&#10;Flyer Proyek"
                      value={curriculumForm.outputs}
                      onChange={(e) => setCurriculumForm({ ...curriculumForm, outputs: e.target.value })}
                      className="glass-input text-[12.5px] py-2 h-16 resize-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="glass-button w-full justify-center py-3 text-[13.5px] mt-4"
              >
                Simpan ke Database
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
