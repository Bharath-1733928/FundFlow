import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { GroupCard } from '../components/GroupCard';
import { NewGroupForm } from '../components/NewGroupForm';
import { PaymentChart } from '../components/PaymentChart';
import { ChatSection } from '../components/ChatSection';
import { PlusCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const groups = useStore((state) => state.groups);
  const navigate = useNavigate();
  const [showNewGroupForm, setShowNewGroupForm] = React.useState(false);

  return (
    <div className="space-y-6 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
        <button
          onClick={() => setShowNewGroupForm(!showNewGroupForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto justify-center sm:justify-start"
        >
          <PlusCircle size={20} />
          New Group
        </button>
      </div>

      {showNewGroupForm && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <NewGroupForm />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {groups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No groups yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onClick={() => navigate(`/group/${group.id}`)}
                />
              ))}
            </div>
          )}
          
          {groups.length > 0 && <PaymentChart />}
        </div>

        <div className="lg:sticky lg:top-6">
          <ChatSection />
        </div>
      </div>
    </div>
  );
};