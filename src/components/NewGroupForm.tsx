import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const NewGroupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const addGroup = useStore((state) => state.addGroup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGroup({
      id: crypto.randomUUID(),
      name,
      description,
      members: [],
      transactions: [],
      createdAt: new Date().toISOString(),
    });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Group Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Group
      </button>
    </form>
  );
};