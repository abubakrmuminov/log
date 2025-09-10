import { sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";

export default function Profile() {
  const { user } = useSelector((store) => store.user);
  const sentVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Verification email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div>
      <img src={user.photoURL} alt="" width={100} height={100} />
      <h3>{user.displayName}</h3>
      <div>
        <h3>{user.email}</h3>
        <small>
          {user.emailVerified ? (
            <p>Email Verified👌</p>
          ) : (
            <>
              <p>Email Not Verified</p>
              <button onClick={sentVerificationEmail}>sent verification code</button>
            </>
          )}
        </small>
      </div>
    </div>
  );
}
