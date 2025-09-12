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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-xl shadow-md flex flex-col h-[80vh]">
        {/* Заголовок таска */}
        {task && (
          <div className="mb-4 border-b border-neutral-700 pb-3">
            <h1 className="text-2xl font-bold mb-1">{task.name}</h1>
            <p className="text-gray-400">
              {task.description || "No description"}
            </p>
          </div>
        )}

      {/* Комментарии */}
<div className="flex-1 overflow-y-auto max-h-[400px] space-y-3 pr-2 border border-neutral-800 rounded-lg p-4 bg-neutral-950">
  {comments && comments.length > 0 ? (
    comments.map((c) => {
      const isMine = c.uid === user.uid;
      return (
        <div
          key={c.id}
          className={`flex items-end gap-2 ${
            isMine ? "justify-end" : "justify-start"
          }`}
        >
          {!isMine && (
            <img
              src={c.photoURL}
              alt={c.displayName}
              className="w-8 h-8 rounded-full border border-neutral-700"
            />
          )}
          <div
            className={`max-w-[70%] p-3 rounded-xl ${
              isMine
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-neutral-800 text-gray-200 rounded-bl-none"
            }`}
          >
            {!isMine && (
              <p className="text-xs text-gray-400 mb-1">{c.displayName}</p>
            )}
            <p>{c.text}</p>
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              {formatDate(c.createdAt)}
            </p>
          </div>
          {isMine && (
            <img
              src={c.photoURL}
              alt={c.displayName}
              className="w-8 h-8 rounded-full border border-neutral-700"
            />
          )}
        </div>
      );
    })
  ) : (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 mb-4 opacity-60"
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
      <p className="text-lg font-medium">Пока нет комментариев</p>
      <p className="text-sm text-gray-500">
        ✍️ Напиши первым, чтобы начать обсуждение
      </p>
    </div>
  )}
  <div ref={messagesEndRef} />
</div>


        {/* Форма */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
