import React, { useState } from 'react';
import { Module, Grade } from '../logic/calculator';
import { Plus, Trash2, BookOpen, Edit2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleListProps {
    modules: Module[];
    onAddModule: (module: Omit<Module, 'id'>) => void;
    onRemoveModule: (id: string) => void;
    onUpdateModule: (id: string, module: Omit<Module, 'id'>) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({ modules, onAddModule, onRemoveModule, onUpdateModule }) => {
    const [newName, setNewName] = useState('');
    const [newLevel, setNewLevel] = useState<2 | 3>(3);
    const [newCredits, setNewCredits] = useState<number>(60);
    const [newGrade, setNewGrade] = useState<Grade>(1);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editLevel, setEditLevel] = useState<2 | 3>(3);
    const [editCredits, setEditCredits] = useState<number>(60);
    const [editGrade, setEditGrade] = useState<Grade>(1);

    const handleAdd = () => {
        if (!newName.trim()) return;
        onAddModule({
            name: newName,
            level: newLevel,
            credits: newCredits,
            grade: newGrade,
        });
        setNewName('');
    };

    const startEditing = (module: Module) => {
        setEditingId(module.id);
        setEditName(module.name);
        setEditLevel(module.level);
        setEditCredits(module.credits);
        setEditGrade(module.grade);
    };

    const saveEdit = () => {
        if (!editingId || !editName.trim()) return;
        onUpdateModule(editingId, {
            name: editName,
            level: editLevel,
            credits: editCredits,
            grade: editGrade,
        });
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div className="module-list">
            <div className="add-module-form">
                <div className="input-group">
                    <label>Module Name</label>
                    <input
                        type="text"
                        placeholder="e.g. TM354 Software Engineering"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Level</label>
                        <select value={newLevel} onChange={(e) => setNewLevel(Number(e.target.value) as 2 | 3)}>
                            <option value={2}>Level 2</option>
                            <option value={3}>Level 3</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Credits</label>
                        <select value={newCredits} onChange={(e) => setNewCredits(Number(e.target.value))}>
                            <option value={30}>30 Credits</option>
                            <option value={60}>60 Credits</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Grade</label>
                        <select value={newGrade} onChange={(e) => setNewGrade(Number(e.target.value) as Grade)}>
                            <option value={1}>1 (Distinction)</option>
                            <option value={2}>2 (Pass 2)</option>
                            <option value={3}>3 (Pass 3)</option>
                            <option value={4}>4 (Pass 4)</option>
                        </select>
                    </div>
                </div>

                <button className="btn-primary" onClick={handleAdd}>
                    <Plus size={18} /> Add Module
                </button>
            </div>

            <div className="modules-display">
                <h3>Current Modules ({modules.length})</h3>
                <div className="modules-grid">
                    <AnimatePresence>
                        {modules.map((m) => (
                            <motion.div
                                key={m.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`module-card level-${m.level} ${editingId === m.id ? 'editing' : ''}`}
                            >
                                {editingId === m.id ? (
                                    // Edit mode
                                    <div className="module-edit-form">
                                        <div className="edit-row">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="edit-input-name"
                                                placeholder="Module name"
                                            />
                                        </div>
                                        <div className="edit-row">
                                            <select
                                                value={editLevel}
                                                onChange={(e) => setEditLevel(Number(e.target.value) as 2 | 3)}
                                                className="edit-select"
                                            >
                                                <option value={2}>L2</option>
                                                <option value={3}>L3</option>
                                            </select>
                                            <select
                                                value={editCredits}
                                                onChange={(e) => setEditCredits(Number(e.target.value))}
                                                className="edit-select"
                                            >
                                                <option value={30}>30</option>
                                                <option value={60}>60</option>
                                            </select>
                                            <select
                                                value={editGrade}
                                                onChange={(e) => setEditGrade(Number(e.target.value) as Grade)}
                                                className="edit-select"
                                            >
                                                <option value={1}>Grade 1</option>
                                                <option value={2}>Grade 2</option>
                                                <option value={3}>Grade 3</option>
                                                <option value={4}>Grade 4</option>
                                            </select>
                                        </div>
                                        <div className="edit-actions">
                                            <button className="btn-icon btn-save" onClick={saveEdit}>
                                                <Check size={16} />
                                            </button>
                                            <button className="btn-icon btn-cancel" onClick={cancelEdit}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View mode
                                    <>
                                        <div className="module-info">
                                            <div className="module-icon">
                                                <BookOpen size={16} />
                                            </div>
                                            <div className="module-details">
                                                <h4>{m.name}</h4>
                                                <span>Level {m.level} • {m.credits} Credits • Grade {m.grade}</span>
                                            </div>
                                        </div>
                                        <div className="module-actions">
                                            <button className="btn-icon" onClick={() => startEditing(m)} title="Edit module">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn-icon" onClick={() => onRemoveModule(m.id)} title="Delete module">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {modules.length === 0 && (
                        <p className="empty-state">No modules added yet. Add your Level 2 and Level 3 modules to get started.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleList;
