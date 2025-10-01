'use client';

import type { NextPage } from 'next';
import { defaultTemplates, Template } from '@/lib/templates';
import { useCreateBoard } from '@/context/CreateBoardContext';

const TemplatesPage: NextPage = () => {
  const { openDialog } = useCreateBoard();

  const handleUseTemplate = (template: Template) => {
    openDialog(template);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Browse Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {defaultTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleUseTemplate(template)}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;