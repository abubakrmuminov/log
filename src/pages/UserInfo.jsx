import { useCollection } from "../hook/useCollection";
import { useParams } from "react-router-dom";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  if (!data) return <p className="text-white p-6">Loading...</p>;
  if (data.length === 0) return <p className="text-white p-6">Пользователь не найден</p>;

  const user = data[0];

  // если фото нет, генерим Dicebear по uid
  const avatar = user.photoURL
    ? user.photoURL
    : `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.uid}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 text-warm-100 p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="bg-gradient-to-br from-dark-800 to-warm-950 p-6 sm:p-8 rounded-2xl shadow-2xl border border-warm-800/30 backdrop-blur-sm flex flex-col items-center space-y-4 sm:space-y-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-warm-700/50 mb-4 bg-dark-800 shadow-2xl">
        <img
          src={avatar}
          alt={user.displayName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
        <h3 className="text-xl sm:text-2xl font-bold text-warm-200">{user.displayName}</h3>
        <p className="text-warm-400 text-sm sm:text-base break-all text-center">{user.email}</p>
        <p className={`font-medium text-sm sm:text-base ${user.online ? "text-green-400 animate-pulse-warm" : "text-red-400"}`}>
        {user.online ? "🟢 Online" : "🔴 Offline"}
      </p>
      </div>
    </div>
  );
}

export default UserInfo;
