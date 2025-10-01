'use client';

import { useState, useEffect, useRef } from 'react';

interface CardEditorProps {
  onSave: (title: string) => Promise<void>;
  onCancel: () => void;
  initialTitle?: string;
}

const CardEditor = ({ onSave, onCancel, initialTitle = '' }: CardEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select(); // Select the text for easy replacement
    }
  }, []);

  // Auto-resize the textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Save on Enter, but allow Shift+Enter for new lines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on enter
      if (title.trim()) {
        await onSave(title.trim());
      }
      // After saving, the parent component will handle unmounting this editor.
    }
    // Cancel on Escape
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleBlur = () => {
    // Also cancel if the user clicks away
    onCancel();
  };

  return (
    <textarea
      ref={textareaRef}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder="Enter a title for this card..."
      className="w-full p-2 rounded-md shadow-md resize-none overflow-hidden bg-white text-gray-900 focus:outline-none"
      style={{ minHeight: '60px' }} // Default height
    />
  );
};

export default CardEditor;
