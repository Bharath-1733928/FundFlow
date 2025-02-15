import React from 'react';
import { Group } from '../types';
import { Users, Receipt } from 'lucide-react';

interface GroupCardProps {
  group: Group;
  onClick: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
      <p className="text-gray-600 mb-4">{group.description}</p>
      
      <div className="flex flex-col sm:flex-row justify-between text-gray-500 gap-2 sm:gap-0">
        <div className="flex items-center">
          <Users size={18} className="mr-2" />
          <span>{group.members.length} members</span>
        </div>
        <div className="flex items-center">
          <Receipt size={18} className="mr-2" />
          <span>{group.transactions.length} transactions</span>
        </div>
      </div>
    </div>
  );
};