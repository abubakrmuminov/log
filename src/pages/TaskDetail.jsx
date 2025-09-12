import { useParams } from "react-router-dom";
import { useDocument } from "../hook/useDocument";
import { useSubCollection } from "../hook/useSubCollection";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";

export default function TaskDetails() {
  const { id } = useParams(); // uid таска
  const { document: task } = useDocument("tasks", id);
  const { documents: comments } = useSubCollection(`tasks/${id}/comments`);
  const { user } = useSelector((store) => store.user);

  const [newComment, setNewComment] = useState("");
  const messagesEndRef = useRef(null);

  // Автоскролл вниз при новых сообщениях
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Отправка коммента
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

  // Функция форматирования времени/даты
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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 text-warm-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-dark-800 to-warm-950 p-4 sm:p-6 rounded-xl shadow-2xl flex flex-col h-[85vh] sm:h-[80vh] border border-warm-800/30 backdrop-blur-sm">
        {/* Заголовок таска */}
        {task && (
          <div className="mb-4 border-b border-warm-700/50 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 text-warm-200">📋 {task.name}</h1>
            <p className="text-warm-400 text-sm sm:text-base">
              {task.description || "📝 No description"}
            </p>
          </div>
        )}

      {/* Комментарии */}
<div className="flex-1 overflow-y-auto max-h-[400px] space-y-3 pr-2 border border-warm-800/30 rounded-lg p-3 sm:p-4 bg-gradient-to-b from-dark-900/50 to-warm-950/50 backdrop-blur-sm">
  {comments && comments.length > 0 ? (
    comments.map((c) => {
      const isMine = c.uid === user.uid;
      return (
        <div
          key={c.id}
          className={`flex items-end gap-2 sm:gap-3 ${
            isMine ? "justify-end" : "justify-start"
          }`}
        >
          {!isMine && (
            <img
              src={c.photoURL}
              alt={c.displayName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-warm-700/50 shadow-lg"
            />
          )}
          <div
            className={`max-w-[75%] sm:max-w-[70%] p-3 rounded-xl shadow-lg ${
              isMine
                ? "bg-gradient-to-r from-warm-600 to-warm-700 text-warm-100 rounded-br-none"
                : "bg-gradient-to-r from-dark-800 to-warm-900 text-warm-200 rounded-bl-none"
            }`}
          >
            {!isMine && (
              <p className="text-xs text-warm-400 mb-1 font-medium">{c.displayName}</p>
            )}
            <p className="text-sm sm:text-base">{c.text}</p>
            <p className="text-[10px] text-warm-400/70 mt-1 text-right">
              {formatDate(c.createdAt)}
            </p>
          </div>
          {isMine && (
            <img
              src={c.photoURL}
              alt={c.displayName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-warm-700/50 shadow-lg"
            />
          )}
        </div>
      );
    })
  ) : (
    <div className="flex flex-col items-center justify-center h-64 text-warm-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 sm:w-24 sm:h-24 mb-4 opacity-60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3.75h6m-8.25 4.5h9.75L18 21V6.75A2.25 2.25 0 0015.75 4.5H6.75A2.25 2.25 0 004.5 6.75v9a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
      <p className="text-base sm:text-lg font-medium">Пока нет комментариев</p>
      <p className="text-sm text-warm-500 text-center">
        ✍️ Напиши первым, чтобы начать обсуждение
      </p>
    </div>
  )}
  <div ref={messagesEndRef} />
</div>


        {/* Форма */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2 sm:gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="💬 Write a comment..."
            className="flex-1 px-4 py-3 rounded-lg bg-dark-800/80 text-warm-100 placeholder-warm-400 outline-none focus:ring-2 focus:ring-warm-500 border border-warm-700/50 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-warm-600 to-warm-700 text-warm-100 rounded-lg hover:from-warm-500 hover:to-warm-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
          >
            📤
          </button>
        </form>
      </div>
    </div>
  );
}
