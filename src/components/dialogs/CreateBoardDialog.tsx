'use client';

import { useCreateBoard } from '@/context/CreateBoardContext';
import { defaultTemplates } from '@/lib/templates';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Lane} from "@/types";

const CreateBoardDialog = () => {
  const { isDialogOpen, closeDialog, selectedTemplate } = useCreateBoard();
  const [title, setTitle] = useState('');
  const [templateId, setTemplateId] = useState<string>('');
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      setTitle(selectedTemplate.title);
      setTemplateId(selectedTemplate.id);
    } else {
      setTitle('');
      setTemplateId('');
    }
  }, [selectedTemplate, isDialogOpen]);

  if (!isDialogOpen) {
    return null;
  }

  const handleCreate = async () => {
    if (!user) {
      // For now, we're not handling anonymous users, as per the user's request.
      // We can add a message here to prompt the user to log in.
      console.error("User must be logged in to create a board.");
      return;
    }

    console.log(user)
    setIsCreating(true);

    try {
      let lanesToCreate: Lane[] = [];
      const template = defaultTemplates.find(t => t.id === templateId);
      if (template) {
        lanesToCreate = template.lanes;
      }

      const boardRef = await addDoc(collection(db, 'boards'), {
        title: title || 'Untitled BoardView',
        createdAt: serverTimestamp(),
        owner: user.uid,
        members: [user.uid],
      });

      const batch = writeBatch(db);
      lanesToCreate.forEach(lane => {
        batch.set(doc(collection(db, 'boards', boardRef.id, 'lanes')), lane);
      });

      await batch.commit();

      closeDialog();
      router.push(`/app/board/${boardRef.id}`);

    } catch (error) {
      console.error("Error creating board: ", error);
      // TODO: Show an error message to the user
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Board</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Board Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., My Awesome Project"
            />
          </div>
          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              id="template"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a template</option>
              {defaultTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={closeDialog}
            disabled={isCreating}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardDialog;