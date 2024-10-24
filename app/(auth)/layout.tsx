import AuthHero from "#/components/common/hero/AuthHero";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex w-screen h-screen">
      <div className="relative flex-1 hidden xl:block">
        <AuthHero />
      </div>
      <div className="flex items-center justify-center flex-1">{children}</div>
    </div>
  );
}
