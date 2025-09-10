import { useParams } from "react-router-dom";
import { useDocument } from "../hook/UseDocument";
import { useSubCollection } from "../hook/useSubCollection";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  const { document: task } = useDocument("tasks", id);
  const { documents: comments } = useSubCollection(`tasks/${id}/comments`);
  const { user } = useSelector((store) => store.user);

  const [newComment, setNewComment] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await addDoc(collection(db, `tasks/${id}/comments`), {
      text: newComment,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });

    setNewComment("");
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "...";
    const date = timestamp.toDate();
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    return isToday
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString([], {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="min-h-screen text-white p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-6 backdrop-blur-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
            >
              <span>←</span>
              <span>Back to Tasks</span>
            </Link>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Active Task</span>
            </div>
          </div>
          
          {task && (
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-3">{task.name}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {task.description || "No description provided"}
              </p>
              {task.dueto && (
                <div className="mt-4 inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-white/20">
                  <span className="text-purple-300">📅</span>
                  <span className="text-sm">Due: {new Date(task.dueto).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Container */}
        <div className="glass rounded-2xl backdrop-blur-xl border border-white/20 flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold gradient-text">Discussion</h2>
              <div className="text-sm text-gray-400">
                {comments?.length || 0} messages
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {comments && comments.length > 0 ? (
              comments.map((c) => {
                const isMine = c.uid === user.uid;
                return (
                  <div
                    key={c.id}
                    className={`flex items-end gap-3 ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMine && (
                      <img
                        src={c.photoURL}
                        alt={c.displayName}
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg"
                      />
                    )}
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl shadow-lg ${
                        isMine
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md"
                          : "glass border border-white/20 text-gray-200 rounded-bl-md"
                      }`}
                    >
                      {!isMine && (
                        <p className="text-xs text-purple-300 mb-2 font-semibold">{c.displayName}</p>
                      )}
                      <p className="leading-relaxed">{c.text}</p>
                      <p className="text-xs opacity-70 mt-2 text-right">
                        {formatDate(c.createdAt)}
                      </p>
                    </div>
                    {isMine && (
                      <img
                        src={c.photoURL}
                        alt={c.displayName}
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start the conversation</h3>
                <p className="text-center text-gray-500 max-w-md">
                  No messages yet. Be the first to share your thoughts and collaborate with your team!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-6 py-4 glass rounded-2xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  newComment.trim()
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 shadow-lg glow"
                    : "glass border border-white/20 text-gray-400 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}