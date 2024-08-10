import DarkModeToggle from "@/components/DarkModeToggle";

const AuthLayout = ( { children }: { children: React.ReactNode } ) => {
  return (
    <div className="h-[100vh] flex items-center justify-center relative">
      <div className="absolute bottom-5 right-5 text-white">
        <DarkModeToggle />
      </div>

      { children }
    </div>
  );
}

export default AuthLayout;
