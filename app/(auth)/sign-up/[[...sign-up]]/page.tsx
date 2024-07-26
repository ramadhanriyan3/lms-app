import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return <SignUp path="/sign-up" fallbackRedirectUrl={"/"} />;
};

export default SignUpPage;
