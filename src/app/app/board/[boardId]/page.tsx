import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import {auth, db} from '@/lib/firebase';
import BoardView from '@/components/board/BoardView';
import { notFound } from 'next/navigation';
import {Board,Lane} from "@/types";
import {getAuth} from "firebase/auth";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

// Helper function to fetch board data
async function getBoardData(boardId: string): Promise<Board | null> {
  const boardRef = doc(db, 'boards', boardId);
  const boardSnap = await getDoc(boardRef);
  if (!boardSnap.exists()) {
    return null;
  }
  return boardSnap.data() as Board;
}

// Helper function to fetch lanes data
async function getLanesData(boardId: string): Promise<Lane[] | null> {
  const lanesRef = collection(db, 'boards', boardId, 'lanes');
  const q = query(lanesRef, orderBy('order'));
  const lanesSnap = await getDocs(q);
  return lanesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Lane[];
}

// The main page component is now an async Server Component
const BoardPage = async ({ params }: BoardPageProps) => {
  console.log("user", getAuth().currentUser)
  const { boardId } = await params;

  const boardData = await getBoardData(boardId);

  if (!boardData) {
    notFound(); // Use Next.js notFound utility
  }

  const lanesData = await getLanesData(boardId);

  // We cast the data to the expected types. 
  // It's good practice to use a type guard or validation library here (e.g., Zod) in a real app.
  const initialBoardData = {
    title: boardData.title || 'Untitled BoardView',
  };

  if (!lanesData) {
    notFound(); // If lanes data is not found, we also return a 404
  }

  return (
    <BoardView
      boardId={boardId} 
      initialBoardData={initialBoardData} 
      initialLanesData={lanesData}
    />
  );
};

export default BoardPage;