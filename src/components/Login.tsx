import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const clientId = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;
  const backURL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
  
  const handleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      
      localStorage.setItem("token", token);

      const res = await fetch(backURL+"/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      console.log("Usuario verificado:", data.user);

      await fetch(backURL+"/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.user.email }),
      });

    //   window.location.href = "/dashboard";
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Error en login")}
      />
    </GoogleOAuthProvider>
  );
};

export default Login;
