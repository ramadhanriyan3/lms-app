const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen flex justify-center items-center bg-sky-400">
      {children}
    </div>
  );
};

export default AuthLayout;
