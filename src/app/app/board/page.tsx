'use client';

import type { NextPage } from 'next';
import { useCreateBoard } from '@/context/CreateBoardContext';
import { collection, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import {Board} from "@/types";
import BoardItem from "@/components/board/BoardItem";
import BoardListSkeleton from "@/components/board/BoardListSkeleton";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const BoardPage: NextPage = () => {
  const { openDialog } = useCreateBoard();
  const [user, authLoading, authError] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if ((!user && !authLoading) || authError) {
      router.push("/login")
    }
  }, [user, authLoading]);

  // 1. Create the query, but only if the user object is available.
  const boardsRef = collection(db, 'boards');
  const q = user ? query(boardsRef, where('owner', '==', user.uid)) : null;

  // 2. Use the query to fetch the collection.
  const [boards, boardsLoading, boardsError] = useCollection(q);

  // 3. The page is loading if we are waiting for the user OR the boards.
  const isLoading = authLoading || boardsLoading;

  // 4. Combine and check for any errors.
  const error = authError || boardsError;

  const renderContent = () => {
    if (isLoading) {
      return <BoardListSkeleton />;
    }

    if (error) {
      return <div className='text-gray-700'>Error: {error.message}</div>;
    }

    if (boards && boards.docs.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boards.docs.map(doc => <BoardItem key={doc.id} board={{id: doc.id, ...doc.data()} as Board}/>)}
        </div>
      );
    }

    // If we are not loading and there are no boards, show the empty state.
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12">
        <h2 className="text-xl font-semibold text-gray-700">No boards yet!</h2>
        <p className="text-gray-500 mt-2">Get started by creating a new board.</p>
      </div>
    );
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Boards</h1>
        <button
          onClick={() => openDialog()}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-red-400 hover:text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          + Create New Board
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default BoardPage;