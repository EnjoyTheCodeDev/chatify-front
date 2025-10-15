import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { AuthService } from "../utils/services/authService";

import FormInput from "../components/FormInput";
import FormBtn from "../components/FormBtn";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await AuthService.signup({ nickname, email, password });
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold uppercase text-center md:text-4xl mb-10">
        Sign Up
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-12 max-w-md w-full md:text-lg [&_input]:outline-none"
      >
        <div className="flex flex-col gap-2 md:gap-3 w-full items-center">
          <FormInput
            type="text"
            placeholder="Nickname"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <FormInput
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <FormBtn
          text={isLoading ? "Loading..." : "Submit"}
          type="submit"
          disabled={isLoading}
        />
      </form>

      <div className="text-center text-gray-500 text-sm md:text-base">
        <span className="mr-1">Already registered?</span>
        <Link className="underline" to="/login">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
