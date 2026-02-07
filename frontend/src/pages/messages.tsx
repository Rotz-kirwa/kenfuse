// src/pages/Messages.tsx
const Messages = () => {
  const conversations = [
    { id: 1, name: 'John Smith', lastMessage: 'Thank you for your help...', time: '2:30 PM', unread: true },
    { id: 2, name: 'Funeral Home LLC', lastMessage: 'Your appointment is confirmed', time: 'Yesterday', unread: false },
    { id: 3, name: 'Sarah Johnson', lastMessage: 'Can we schedule a call?', time: '2 days ago', unread: false },
    { id: 4, name: 'Support Team', lastMessage: 'Your issue has been resolved', time: '1 week ago', unread: false },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Conversation List */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
            </div>
            <div className="divide-y">
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${convo.unread ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{convo.name}</h3>
                        {convo.unread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                    </div>
                    <span className="text-xs text-gray-500">{convo.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">Select a conversation</h2>
              <p className="text-sm text-gray-600">Click on a conversation to start messaging</p>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No conversation selected
                </h3>
                <p className="text-gray-600">
                  Select a conversation from the list to view messages
                </p>
              </div>
            </div>

            {/* Message Input (Disabled) */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Select a conversation to message..."
                  className="flex-1 p-3 border rounded-lg bg-gray-100"
                  disabled
                />
                <button
                  className="px-6 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;