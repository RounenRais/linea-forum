"use client";
import { useActionState } from "react";
import { loginAction } from "@/src/app/login/actions";
const initialState = {
  error: "",
};
export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border-2 p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border-2 p-2"
      />
      {state.error && <p className="text-red-200 text-sm">{state.error}</p>}
      <button className="bg-sky-300 p-2 text-black" type="submit">
        Login
      </button>
    </form>
  );
}
