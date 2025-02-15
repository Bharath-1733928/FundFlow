import { create } from 'zustand';
import { Group, Member, Transaction, User } from '../types';

interface Store {
  groups: Group[];
  currentGroup: Group | null;
  currentUser: User | null;
  addGroup: (group: Group) => void;
  setCurrentGroup: (group: Group) => void;
  setCurrentUser: (user: User) => void;
  addTransaction: (groupId: string, transaction: Transaction) => void;
  addMember: (groupId: string, member: Member) => void;
}

export const useStore = create<Store>((set) => ({
  groups: [],
  currentGroup: null,
  currentUser: null,
  addGroup: (group) =>
    set((state) => ({ groups: [...state.groups, group] })),
  setCurrentGroup: (group) =>
    set({ currentGroup: group }),
  setCurrentUser: (user) =>
    set({ currentUser: user }),
  addTransaction: (groupId, transaction) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? { ...group, transactions: [...group.transactions, transaction] }
          : group
      ),
    })),
  addMember: (groupId, member) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? { ...group, members: [...group.members, member] }
          : group
      ),
    })),
}));