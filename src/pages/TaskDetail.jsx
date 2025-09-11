import { useParams } from "react-router-dom";
import { useDocument } from "../hook/useDocument";
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
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Enhanced Header */}
        <div className="glass rounded-3xl p-8 mb-8 backdrop-blur-xl border border-amber-400/30 glow-gold">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center space-x-3 text-emerald-300 hover:text-emerald-200 transition-colors font-bold text-lg"
            >
              <span className="text-2xl">←</span>
              <span>Back to Mission Control</span>
            </Link>
            <div className="flex items-center space-x-3 glass-secondary px-4 py-2 rounded-2xl border border-emerald-400/30">
              <div className="w-3 h-3 status-online rounded-full"></div>
              <span className="text-emerald-300 font-bold">Active Mission</span>
            </div>
          </div>
          
          {task && (
            <div>
              <h1 className="text-5xl font-bold gradient-text mb-6">{task.name}</h1>
              <p className="text-slate-300 text-xl leading-relaxed mb-6">
                {task.description || "No mission briefing provided"}
              </p>
              {task.dueto && (
                <div className="inline-flex items-center space-x-3 glass-secondary px-6 py-3 rounded-2xl border border-violet-400/30">
                  <span className="text-violet-300 text-xl">📅</span>
                  <span className="text-lg font-bold text-violet-300">
                    Mission Deadline: {new Date(task.dueto).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Chat Container */}
        <div className="glass rounded-3xl backdrop-blur-xl border border-emerald-400/30 flex flex-col h-[700px] glow-mint">
          {/* Enhanced Chat Header */}
          <div className="p-8 border-b border-emerald-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <h2 className="text-3xl font-bold gradient-text-secondary">Mission Communications</h2>
              </div>
              <div className="glass-secondary px-4 py-2 rounded-2xl border border-amber-400/30">
                <span className="text-amber-300 font-bold text-lg">{comments?.length || 0} transmissions</span>
              </div>
            </div>
          </div>

          {/* Enhanced Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {comments && comments.length > 0 ? (
              comments.map((c) => {
                const isMine = c.uid === user.uid;
                return (
                  <div
                    key={c.id}
                    className={`flex items-end gap-4 ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMine && (
                      <img
                        src={c.photoURL}
                        alt={c.displayName}
                        className="w-12 h-12 rounded-2xl border-2 border-emerald-400/30 shadow-lg object-cover"
                      />
                    )}
                    <div
                      className={`max-w-[75%] p-6 rounded-3xl shadow-2xl ${
                        isMine
                          ? "btn-primary text-slate-900 rounded-br-lg glow-gold"
                          : "glass-secondary border border-emerald-400/30 text-slate-200 rounded-bl-lg glow-mint"
                      }`}
                    >
                      {!isMine && (
                        <p className="text-sm text-emerald-300 mb-3 font-bold">{c.displayName}</p>
                      )}
                      <p className="leading-relaxed text-lg font-medium">{c.text}</p>
                      <p className={`text-sm opacity-80 mt-3 text-right font-semibold ${
                        isMine ? "text-slate-700" : "text-slate-400"
                      }`}>
                        {formatDate(c.createdAt)}
                      </p>
                    </div>
                    {isMine && (
                      <img
                        src={c.photoURL}
                        alt={c.displayName}
                        className="w-12 h-12 rounded-2xl border-2 border-amber-400/30 shadow-lg object-cover"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400/20 via-teal-500/20 to-emerald-600/20 rounded-3xl flex items-center justify-center shadow-2xl">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-3xl font-bold gradient-text-secondary mb-4">Begin Mission Communication</h3>
                <p className="text-center text-slate-500 max-w-lg text-xl leading-relaxed">
                  No transmissions yet. Be the first to share mission updates and collaborate with your stellar crew!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Message Input */}
          <div className="p-8 border-t border-emerald-400/20">
            <form onSubmit={handleSubmit} className="flex gap-6">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Send a transmission to your crew..."
                className="flex-1 px-8 py-5 glass rounded-2xl text-white placeholder-slate-400 border border-emerald-400/30 input-focus transition-all duration-300 text-lg font-medium"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`px-10 py-5 rounded-2xl font-bold transition-all duration-300 text-lg ${
                  newComment.trim()
                    ? "btn-secondary hover:scale-105 shadow-2xl glow-mint"
                    : "glass border border-slate-400/30 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>📡</span>
                  <span>Transmit</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}