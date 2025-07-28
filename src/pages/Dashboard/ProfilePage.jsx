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
      <h2 className="text-4xl font-semibold mb-6 text-center text-[#f34e3a]">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-6 bg-white p-8 shadow-xl rounded-lg">
        {/* Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        {/* Email (Uneditable) */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Email (Uneditable)</label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Last Login */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Last Login</label>
          <input
            type="text"
            value={lastLogin}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-[#f34e3a] text-white font-semibold rounded-lg hover:bg-[#e03a2d] transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
