import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

// Mock chat data matching the frontend structure

// Mock chat data matching the frontend structure
const mockChats = [
  {
    id: 4,
    title: 'FastVisa Support',
    name: 'FastVisa Support',
    content: 'Hello! How can we assist you with your visa application today?',
    participants: [
      { id: 1, name: 'FastVisa Support', role: 'Support Agent' },
      { id: 2, name: 'You', role: 'Customer' }
    ],
    messages: [
      {
        id: 1,
        sender: 'FastVisa Support',
        content: 'Hello! Welcome to FastVisa Support. How can we assist you with your visa application today?',
        time: '13:45',
        isCurrentUser: false,
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Hi! I need help with my tourist visa application for Japan.',
        time: '13:47',
        isCurrentUser: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: true
      },
      {
        id: 3,
        sender: 'FastVisa Support',
        content: 'I\'d be happy to help! Could you please share your application reference number?',
        time: '13:48',
        isCurrentUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        read: false
      }
    ]
  },
  {
    id: 1,
    title: 'Team Collaboration',
    name: 'John Doe',
    content: 'Hi there! Just wanted to check in about the project timeline. Do you think we can have the first draft ready by Friday?',
    participants: [
      { id: 1, name: 'John Doe', role: 'Project Manager' },
      { id: 2, name: 'Sarah Wilson', role: 'Designer' },
      { id: 3, name: 'Alex Johnson', role: 'Developer' }
    ],
    messages: [
      {
        id: 1,
        sender: 'Sarah Wilson',
        content: 'I\'ve uploaded the latest design assets to the shared drive.',
        time: '10:30',
        isCurrentUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: true
      },
      {
        id: 2,
        sender: 'You',
        content: 'Thanks Sarah! The designs look great. Alex, how long do you think the implementation will take?',
        time: '10:35',
        isCurrentUser: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
        read: true
      },
      {
        id: 3,
        sender: 'Alex Johnson',
        content: 'I should be able to implement this in about 2 days. I\'ll keep you updated on the progress.',
        time: '10:40',
        isCurrentUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        read: true
      },
      {
        id: 4,
        sender: 'John Doe',
        content: 'Perfect! Let\'s aim to have everything ready by Friday then.',
        time: '10:42',
        isCurrentUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: false
      }
    ]
  }
];

// Define types for better type safety
type Participant = {
  id: number;
  name: string;
  role: string;
};

type Message = {
  id: number;
  sender: string;
  content: string;
  time: string;
  isCurrentUser: boolean;
  timestamp: string;
  read: boolean;
};

type Chat = {
  id: number;
  title: string;
  name: string;
  content: string;
  participants: Participant[];
  messages: Message[];
};

export async function GET() {
  try {
    // Sort chats by most recent message
    const sortedChats = [...mockChats].sort((a, b) => {
      const aTime = new Date(a.messages[a.messages.length - 1].timestamp).getTime();
      const bTime = new Date(b.messages[b.messages.length - 1].timestamp).getTime();
      return bTime - aTime;
    });

    return NextResponse.json({ chats: sortedChats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { chatId, message } = await request.json();
    
    if (!chatId || !message) {
      return NextResponse.json(
        { error: 'Chat ID and message are required' },
        { status: 400 }
      );
    }

    // In a real app, you would save the message to your database
    const chat = mockChats.find(c => c.id === chatId);
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    const newMessage: Message = {
      id: chat.messages.length + 1,
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      timestamp: new Date().toISOString(),
      read: false
    };

    // In a real app, you would update the chat in the database
    chat.messages.push(newMessage);
    chat.content = message; // Update preview text

    return NextResponse.json({
      success: true,
      message: newMessage,
      chat
    }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
