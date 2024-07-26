import { ClerkProvider } from "@clerk/nextjs";

const ClerkWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className="h-full w-full ">{children}</div>
    </ClerkProvider>
  );
};

export default ClerkWrapper;
