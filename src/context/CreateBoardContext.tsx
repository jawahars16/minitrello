'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Template } from '@/lib/templates';

interface CreateBoardContextType {
  isDialogOpen: boolean;
  openDialog: (template?: Template) => void;
  closeDialog: () => void;
  selectedTemplate: Template | null;
}

const CreateBoardContext = createContext<CreateBoardContextType | undefined>(undefined);

export const CreateBoardProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const openDialog = (template?: Template) => {
    setSelectedTemplate(template || null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <CreateBoardContext.Provider value={{ isDialogOpen, openDialog, closeDialog, selectedTemplate }}>
      {children}
    </CreateBoardContext.Provider>
  );
};

export const useCreateBoard = () => {
  const context = useContext(CreateBoardContext);
  if (context === undefined) {
    throw new Error('useCreateBoard must be used within a CreateBoardProvider');
  }
  return context;
};
