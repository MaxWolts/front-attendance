import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  email: string;
  picture?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        });
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) {
    return <p>No se pudo cargar la información del usuario.</p>;
  }

  return (
    <div className="mt-6 p-4 border rounded-lg shadow w-fit">
      <div className="flex items-center gap-4">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
