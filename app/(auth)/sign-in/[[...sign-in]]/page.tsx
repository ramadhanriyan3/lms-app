import { SignIn } from "@clerk/nextjs";
const SignInPage = () => {
  return <SignIn path="/sign-in" fallbackRedirectUrl={"/"} />;
};

export default SignInPage;
