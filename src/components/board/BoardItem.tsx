import Link from 'next/link';
import {Board} from "@/types";
import {formatTimeAgo} from "@/lib/util";

const BoardItem = ({board}:{board: Board}) => {
    return (<Link key={board.id} href={`/app/board/${board.id}`}>
        <div className='h-6 bg-red-400 rounded-t-lg' >
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-30 flex items-end justify-start cursor-pointer hover:shadow-lg transition-shadow">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{board.title}</h2>
                <p className="text-lg text-gray-800">{formatTimeAgo(board.createdAt.toMillis())}</p>
            </div>
        </div>
    </Link>)
};

export default BoardItem;