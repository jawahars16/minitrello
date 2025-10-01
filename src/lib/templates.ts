import {Lane} from "@/types";

export interface Template {
  id: string;
  title: string;
  description: string;
  exampleImages: string[];
  lanes: Lane[];
}

export const defaultTemplates: Template[] = [
  {
    id: 'traditional-kanban-board',
    title: 'Traditional Kanban BoardView',
    description: 'A classic Kanban board for tracking tasks. Perfect for agile teams.',
    exampleImages: ['/placeholders/dev-template-1.png', '/placeholders/dev-template-2.png'],
    lanes: [
      { title: 'Backlog', description: 'All the tasks that need to be done.', order: 1, color: '#90a4ae' },
      { title: 'To Do', description: 'Tasks that are ready to be worked on.', order: 2, color: '#fdd835' },
      { title: 'In Progress', description: 'Tasks that are currently being worked on.', order: 3, color: '#42a5f5' },
      { title: 'Blocked', description: 'Tasks that are blocked and need attention.', order: 4, color: '#e57373' },
      { title: 'In Review', description: 'Tasks that are completed and are waiting for review.', order: 5, color: '#7e57c2' },
      { title: 'QA', description: 'Tasks that are being tested.', order: 6, color: '#8d6e63' },
      { title: 'Done', description: 'Completed tasks.', order: 7, color: '#66bb6a' },
    ],
  },
  {
    id: 'weekly-planner',
    title: 'Weekly Planner',
    description: 'Organize your week and stay on top of your personal and professional goals.',
    exampleImages: ['/placeholders/planner-template-1.png', '/placeholders/planner-template-2.png'],
    lanes: [
      { title: 'Goals for the Week', description: 'High-level goals to achieve this week.', order: 1, color: '#90a4ae' },
      { title: 'Monday', description: 'Tasks for Monday.', order: 2, color: '#4db6ac' },
      { title: 'Tuesday', description: 'Tasks for Tuesday.', order: 3, color: '#26a69a' },
      { title: 'Wednesday', description: 'Tasks for Wednesday.', order: 4, color: '#009688' },
      { title: 'Thursday', description: 'Tasks for Thursday.', order: 5, color: '#00897b' },
      { title: 'Friday', description: 'Tasks for Friday.', order: 6, color: '#00796b' },
      { title: 'Done', description: 'Completed tasks for the week.', order: 7, color: '#66bb6a' },
    ],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'A flexible template to manage any kind of project from start to finish.',
    exampleImages: ['/placeholders/pm-template-1.png', '/placeholders/pm-template-2.png'],
    lanes: [
      { title: 'Ideas', description: 'New ideas and potential tasks.', order: 1, color: '#90a4ae' },
      { title: 'Planned', description: 'Tasks that have been planned and are ready to be worked on.', order: 2, color: '#4fc3f7' },
      { title: 'In Progress', description: 'Tasks that are currently being worked on.', order: 3, color: '#42a5f5' },
      { title: 'In Review', description: 'Tasks that are completed and are waiting for review.', order: 4, color: '#7e57c2' },
      { title: 'Completed', description: 'Tasks that have been completed.', order: 5, color: '#66bb6a' },
    ],
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Manage your content pipeline from idea to publication.',
    exampleImages: ['/placeholders/content-template-1.png', '/placeholders/content-template-2.png'],
    lanes: [
      { title: 'Ideas', description: 'Content ideas.', order: 1, color: '#90a4ae' },
      { title: 'Writing', description: 'Content that is being written.', order: 2, color: '#ffb74d' },
      { title: 'Editing', description: 'Content that is being edited.', order: 3, color: '#a1887f' },
      { title: 'Published', description: 'Content that has been published.', order: 4, color: '#66bb6a' },
    ],
  },
  {
    id: 'bug-tracking',
    title: 'Bug Tracking',
    description: 'A simple board to track and manage bugs in your software.',
    exampleImages: ['/placeholders/bug-template-1.png', '/placeholders/bug-template-2.png'],
    lanes: [
      { title: 'Reported', description: 'Bugs that have been reported.', order: 1, color: '#b0bec5' },
      { title: 'In Progress', description: 'Bugs that are being worked on.', order: 2, color: '#42a5f5' },
      { title: 'Fixed', description: 'Bugs that have been fixed.', order: 3, color: '#81c784' },
      { title: 'Closed', description: 'Bugs that have been closed.', order: 4, color: '#66bb6a' },
    ],
  },
  {
    id: 'hiring-pipeline',
    title: 'Hiring Pipeline',
    description: 'Track candidates as they move through your hiring process.',
    exampleImages: ['/placeholders/hiring-template-1.png', '/placeholders/hiring-template-2.png'],
    lanes: [
      { title: 'Applied', description: 'Candidates who have applied.', order: 1, color: '#b0bec5' },
      { title: 'Screening', description: 'Candidates who are being screened.', order: 2, color: '#ffeb3b' },
      { title: 'Interview', description: 'Candidates who are in the interview stage.', order: 3, color: '#42a5f5' },
      { title: 'Offer', description: 'Candidates who have received an offer.', order: 4, color: '#ffee58' },
      { title: 'Hired', description: 'Candidates who have been hired.', order: 5, color: '#66bb6a' },
    ],
  },
  {
    id: 'personal-goals',
    title: 'Personal Goals',
    description: 'A board to track your personal goals and aspirations.',
    exampleImages: ['/placeholders/personal-goals-template-1.png', '/placeholders/personal-goals-template-2.png'],
    lanes: [
      { title: 'This Year', description: 'Goals for this year.', order: 1, color: '#e57373' },
      { title: 'This Quarter', description: 'Goals for this quarter.', order: 2, color: '#ffb74d' },
      { title: 'This Month', description: 'Goals for this month.', order: 3, color: '#42a5f5' },
      { title: 'Done', description: 'Completed goals.', order: 4, color: '#66bb6a' },
    ],
  },
];