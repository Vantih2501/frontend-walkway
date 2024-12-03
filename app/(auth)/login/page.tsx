import LoginForm from "#/components/common/form/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="-space-y-3">
        <h1 className="mb-3 text-3xl font-medium tracking-tight text-zinc-800">
          Welcome Back!
        </h1>
        <p className="text-sm text-zinc-500">
          Walk with us! Sign in or Sign up to find your perfect shoes.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
