import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit2, Pin } from 'lucide-react';
import { db, addNote, updateNote, deleteNote } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { UserNote } from '../types';
import Draggable from 'react-draggable';

interface UserNotesProps {
  topicId: string | null;
}

const UserNotes: React.FC<UserNotesProps> = ({ topicId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState<UserNote['color']>('yellow');
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>({});

  const notes = useLiveQuery(
    () => db.notes.where('topicId').equals(topicId || '').toArray(),
    [topicId]
  );

  const colors: UserNote['color'][] = ['yellow', 'blue', 'green', 'pink', 'purple'];

  const colorStyles = {
    yellow: 'bg-amber-100 border-amber-200',
    blue: 'bg-blue-100 border-blue-200',
    green: 'bg-green-100 border-green-200',
    pink: 'bg-pink-100 border-pink-200',
    purple: 'bg-purple-100 border-purple-200'
  };

  const handleSaveNote = async () => {
    if (!topicId || !newNoteContent.trim()) return;

    const noteData: Omit<UserNote, 'id'> = {
      userId: 'default-user',
      topicId,
      content: newNoteContent,
      title: newNoteTitle,
      color: selectedColor,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (editingNote?.id) {
      await updateNote(editingNote.id, {
        ...noteData,
        createdAt: editingNote.createdAt
      });
    } else {
      await addNote(noteData);
    }

    setNewNoteContent('');
    setNewNoteTitle('');
    setIsEditing(false);
    setEditingNote(null);
  };

  const handleEditNote = (note: UserNote) => {
    setEditingNote(note);
    setNewNoteContent(note.content);
    setNewNoteTitle(note.title || '');
    setSelectedColor(note.color || 'yellow');
    setIsEditing(true);
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
  };

  const handleDrag = (id: number, data: { x: number; y: number }) => {
    setPositions(prev => ({
      ...prev,
      [id]: data
    }));
  };

  return (
    <div className="relative min-h-[600px]">
      <div className="absolute top-0 right-0">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
          >
            <PlusCircle size={18} />
            <span className="font-handwriting">Add Note</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-handwriting mb-4">
              {editingNote ? 'Edit Note' : 'New Note'}
            </h3>
            
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note title..."
              className="w-full mb-3 p-2 border-2 border-amber-100 rounded-md font-handwriting"
            />
            
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note here..."
              className="w-full h-32 p-2 border-2 border-amber-100 rounded-md font-handwriting resize-none mb-3"
            />
            
            <div className="flex items-center gap-4 mb-4">
              <span className="font-handwriting text-slate-700">Color:</span>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-amber-500' : ''
                    } ${colorStyles[color]}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingNote(null);
                  setNewNoteContent('');
                  setNewNoteTitle('');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {notes?.map((note) => (
        <Draggable
          key={note.id}
          position={positions[note.id!] || { x: 0, y: 0 }}
          onDrag={(e, data) => note.id && handleDrag(note.id, { x: data.x, y: data.y })}
          handle=".handle"
        >
          <div
            className={`absolute ${colorStyles[note.color || 'yellow']} p-4 rounded-lg shadow-lg max-w-xs`}
            style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}
          >
            <div className="handle cursor-move flex items-center justify-between mb-2">
              <h4 className="font-handwriting text-lg">{note.title}</h4>
              <Pin className="w-4 h-4 opacity-50" />
            </div>
            
            <div className="font-handwritten-notes whitespace-pre-wrap mb-4">
              {note.content}
            </div>
            
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditNote(note)}
                className="p-1 rounded-full hover:bg-white/50"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => note.id && handleDeleteNote(note.id)}
                className="p-1 rounded-full hover:bg-white/50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default UserNotes;