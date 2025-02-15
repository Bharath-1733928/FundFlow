import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Users, Receipt, UserPlus } from 'lucide-react';

export const GroupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const group = useStore((state) => 
    state.groups.find((g) => g.id === id)
  );

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{group.name}</h2>
        <p className="text-gray-600">{group.description}</p>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center text-gray-500">
            <Users size={18} className="mr-2" />
            <span>{group.members.length} members</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Receipt size={18} className="mr-2" />
            <span>{group.transactions.length} transactions</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
            <h3 className="text-lg font-semibold">Members</h3>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 w-full sm:w-auto justify-center sm:justify-start">
              <UserPlus size={20} />
              Add Member
            </button>
          </div>
          
          {group.members.length === 0 ? (
            <p className="text-gray-500">No members yet</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {group.members.map((member) => (
                <li key={member.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 w-full sm:w-auto justify-center sm:justify-start">
              <Receipt size={20} />
              Add Transaction
            </button>
          </div>

          {group.transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {group.transactions.map((transaction) => (
                <li key={transaction.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        Paid by: {group.members.find(m => m.id === transaction.paidBy)?.name}
                      </p>
                    </div>
                    <p className="font-medium">₹{transaction.amount}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};