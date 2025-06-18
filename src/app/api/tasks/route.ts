import { NextResponse } from "next/server";

// In-memory storage for tasks
let tasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal document with all requirements and timeline.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Team meeting',
    description: 'Weekly sync with the development team to discuss progress and blockers.',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isCompleted: true,
  },
  {
    id: '3',
    title: 'Code review',
    description: 'Review pull requests and provide feedback to the team.',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    isCompleted: false,
  },
];

export async function GET() {
  try {
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, dueDate } = await request.json();
    
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate: new Date(dueDate),
      isCompleted: false,
    };

    tasks = [newTask, ...tasks];
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, updates } = await request.json();
    
    tasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    tasks = tasks.filter(task => task.id !== id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
