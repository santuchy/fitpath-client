import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { auth } from './../../firebase/firebase.init';

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setLastLogin(new Date(user.metadata.lastSignInTime).toLocaleString());
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile was successfully updated.",
      });
    } catch (error) {
      console.error("Error updating Firebase:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update profile!",
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 shadow-md rounded-xl">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            className="w-full p-2 border rounded"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            className="w-full p-2 border rounded"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email (Uneditable)</label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Login</label>
          <input
            type="text"
            value={lastLogin}
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
