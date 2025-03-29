import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    const isApiAvailable = await checkApiAvailability();
    if (!isApiAvailable) {
      // Use mock data if API is unavailable
      setAdmins([{ id: 1, name: "Mock Admin" }, { id: 2, name: "Mock Admin 2" }]);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get("/admin");
      setAdmins(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async (params) => {
    try {
      const response = await api.get("/users", { params });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return { admins, loading, error, getUsers, deleteUser };
};
