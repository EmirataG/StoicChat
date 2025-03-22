interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
}

export const chatList: ChatItem[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
  },
  { id: "2", name: "Jane Smith", lastMessage: "See you tomorrow!" },
  { id: "3", name: "Bob Johnson", lastMessage: "Thanks for your help!" },
];

interface Message {
  id: string;
  text: string;
  sender: string;
}

// Mock data for messages
export const messages: { [key: string]: Message[] } = {
  "1": [
    { id: "1", text: "Hey, how are you?", sender: "John Doe" },
    {
      id: "2",
      text: "I'm good, thanks! How about you? Did you start the pset for linear?",
      sender: "Me",
    },
  ],
  "2": [
    { id: "1", text: "See you tomorrow!", sender: "Jane Smith" },
    { id: "2", text: "Sure, looking forward to it!", sender: "Me" },
  ],
  "3": [
    { id: "1", text: "Thanks for your help!", sender: "Bob Johnson" },
    {
      id: "2",
      text: "You're welcome! Let me know if you need anything else.",
      sender: "Me",
    },
  ],
};
