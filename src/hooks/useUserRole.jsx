import { useEffect, useState } from "react";
import axios from "axios";

const useUserRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return; // ⛔ stop if email is missing

    setLoading(true);
    axios.get(`https://fit-path-server.vercel.app/users/role/${email}`)
      .then(res => {
        setRole(res.data.role);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [email]);

  return { role, loading };
};

export default useUserRole;
