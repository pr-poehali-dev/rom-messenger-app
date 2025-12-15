import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<"chats" | "contacts" | "status" | "calls" | "profile">("chats");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  const chats: Chat[] = [
    { id: 1, name: "Анна Смирнова", lastMessage: "Встречаемся завтра в 15:00?", time: "14:32", unread: 2, avatar: "АС" },
    { id: 2, name: "Команда Разработки", lastMessage: "Новая версия готова к релизу", time: "13:20", unread: 5, avatar: "КР" },
    { id: 3, name: "Максим Петров", lastMessage: "Отправил файлы", time: "11:45", avatar: "МП" },
    { id: 4, name: "Мария Иванова", lastMessage: "Спасибо большое!", time: "Вчера", avatar: "МИ" },
    { id: 5, name: "Дизайн Студия", lastMessage: "Макеты готовы к проверке", time: "Вчера", avatar: "ДС" },
    { id: 6, name: "Алексей Козлов", lastMessage: "Созвонимся в обед?", time: "Пн", avatar: "АК" },
  ];

  const messages: Message[] = [
    { id: 1, text: "Привет! Как дела?", time: "14:20", isMine: false },
    { id: 2, text: "Привет! Всё отлично, спасибо 😊", time: "14:21", isMine: true },
    { id: 3, text: "Встречаемся завтра в 15:00?", time: "14:32", isMine: false },
    { id: 4, text: "Да, конечно! Где встречаемся?", time: "14:33", isMine: true },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      
      <div className="relative z-10 h-screen flex flex-col max-w-md mx-auto">
        {selectedChat ? (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="glass p-4 flex items-center gap-3 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedChat(null)}
                className="hover:bg-white/20"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="gradient-chat-bubble text-white font-medium">
                  {chats.find(c => c.id === selectedChat)?.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {chats.find(c => c.id === selectedChat)?.name}
                </h2>
                <p className="text-xs text-gray-600">в сети</p>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Icon name="Video" size={20} />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMine ? "justify-end" : "justify-start"} animate-scale-in`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        msg.isMine
                          ? "gradient-chat-bubble text-white shadow-lg"
                          : "glass-card text-gray-900 shadow-md"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isMine ? "text-white/70" : "text-gray-500"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="glass p-3 flex gap-2 shadow-lg">
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Icon name="Paperclip" size={20} />
              </Button>
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Сообщение..."
                className="flex-1 glass-card border-0 focus-visible:ring-1 focus-visible:ring-white/50"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="gradient-chat-bubble hover:opacity-90 text-white shadow-lg"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="glass p-6 shadow-lg animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Rom</h1>
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Поиск..."
                  className="pl-10 glass-card border-0 focus-visible:ring-1 focus-visible:ring-white/50"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 px-2">
              <div className="space-y-1 py-2">
                {chats.map((chat, index) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className="glass-card p-4 flex items-center gap-3 cursor-pointer hover:bg-white/50 transition-all rounded-2xl shadow-md animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="gradient-chat-bubble text-white font-medium">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-600">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        {chat.unread && (
                          <span className="gradient-accent text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center ml-2 shadow-md">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <nav className="glass p-2 flex justify-around shadow-lg animate-slide-up">
              {[
                { id: "chats", icon: "MessageCircle", label: "Чаты" },
                { id: "contacts", icon: "Users", label: "Контакты" },
                { id: "status", icon: "Circle", label: "Статусы" },
                { id: "calls", icon: "Phone", label: "Звонки" },
                { id: "profile", icon: "User", label: "Профиль" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "gradient-chat-bubble text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/30"
                  }`}
                >
                  <Icon name={tab.icon as any} size={20} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </Button>
              ))}
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
