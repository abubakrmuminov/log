import { useSelector } from "react-redux"
import { useLogOut } from "../hook/LogOut"
import { useCollection } from "../hook/useCollection"
import { Link } from "react-router-dom"


export default function Home() {
  const { ispending, logout } = useLogOut()
  const { user } = useSelector((store) => store.user)
  const { data } = useCollection("users")
  const { data : tasks } = useCollection("tasks")
  console.log(tasks);
  


  return (
    <>
      <div className="container">
        <div className="flex">
          <nav className="navbar">
            <div className="navbar-logo">
              <h2>Home - {user.displayName}</h2>
            </div>
            <ul className="navbar-links">
              <li>
                {!ispending && <button className="oauthButton" onClick={logout}>LogOut</button>}
                {ispending && <button className="oauthButton" disabled >Loading...</button>}
              </li>
              <li>
                <Link className="oauthButton" to={"/create"}>CreateTask</Link>
              </li>
            </ul>
          </nav>



          <div className="wrapper">
            <div className="title">
              <h2>Users List</h2>
            </div>

            {data && data.map((user) => {


              return (
                <div key={user.uid} className="card">
                  <div className="img">
                    <img src={user.photoUrl} alt="" />
                  </div>
                  <div className="content">
                    <div>
                      <h3>{user.displayName}</h3>
                      <p>{user.email}</p>
                      <p> {user.online ? 'online' : 'offline'} </p>
                    </div>
                     <ul>
                      {tasks && tasks.map((task) => {
                   
                        <li>
                          <h5>{task.name}nknkkl</h5>
                        </li>
                      })}
                    </ul>
                  </div>
                  <div>
                   
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
