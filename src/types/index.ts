// A card represents a task
import firebase from 'firebase/compat/app';

export interface Card {
  id: string; // Unique ID for the card
  title: string;
  description?: string;
  order: number; // Order within the lane
}

// A lane is a column on the board
export interface Lane {
  id?: string; // Unique ID for the lane
  title: string;
  description?: string;
  color: string
  order: number; // Order of the lane on the board
  cards?: Card[]; // The cards in this lane
}

// Define the structure of a BoardView document from Firestore
export interface BoardData {
  title: string;
  createdAt: firebase.firestore.Timestamp; // Assuming you're using serverTimestamp()
  owner: string;
  members: string[]; // Array of user IDs who are members of the board
}

// Define the full BoardView type, which includes the document ID
export type Board = BoardData & {
  id: string;
};
