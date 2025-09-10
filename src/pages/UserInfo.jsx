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
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-700 mb-4 bg-neutral-800">
        <img
          src={avatar}
          alt={user.displayName}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold">{user.displayName}</h3>
      <p className="text-gray-400">{user.email}</p>
      <p className={user.online ? "text-green-400" : "text-red-400"}>
        {user.online ? "online" : "offline"}
      </p>
    </div>
  );
}

export default UserInfo;
