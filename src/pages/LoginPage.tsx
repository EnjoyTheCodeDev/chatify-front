import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { AuthService } from "../utils/services/authService";

import FormInput from "../components/FormInput";
import FormBtn from "../components/FormBtn";

const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await AuthService.login({ login, password });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold uppercase text-center md:text-4xl mb-10">
        Login
      </h1>

      <form
        className="mb-12 max-w-md w-full md:text-lg [&_input]:outline-none"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 md:gap-3 w-full items-center">
          <FormInput
            type="text"
            placeholder="E-mail or Nickname"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <FormBtn text="Submit" type="submit" />
      </form>

      <div className="text-center text-gray-500 text-sm md:text-base">
        <span className="mr-1">Not a member?</span>
        <Link className="underline" to="/signup">
          Sign up now
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
