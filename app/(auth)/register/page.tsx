import RegisterForm from "#/components/common/form/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full -space-y-3">
        <h1 className="mb-3 text-3xl font-medium tracking-tight text-zinc-800">
          Join With Us
        </h1>
        <p className="text-sm text-zinc-500">
          Walk with us! Sign in or Sign up to find your perfect shoes.
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
