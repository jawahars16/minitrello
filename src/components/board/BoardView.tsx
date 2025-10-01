'use client'

import LaneView from './LaneView';
import {Lane} from "@/types";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

interface BoardData {
  title: string;
  // other board fields...
}

interface BoardProps {
  boardId: string;
  initialBoardData: BoardData;
  initialLanesData: Lane[];
}

const BoardView = ({ boardId, initialBoardData, initialLanesData }: BoardProps) => {
    const [user, authLoading, authError] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        console.log("user", user)
        if (user == null && !authLoading) {
            router.push("/login")
        }
    }, [user, authLoading]);

  return (
    <div className="p-2 h-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{initialBoardData.title}</h1>
      <div className="flex space-x-4 h-full pb-16 overflow-x-auto">
        {initialLanesData.map(lane => (
          <LaneView key={lane.id} boardId={boardId} lane={{ id: lane.id, ...lane }} />
        ))}
      </div>
    </div>
  );
};

export default BoardView;
