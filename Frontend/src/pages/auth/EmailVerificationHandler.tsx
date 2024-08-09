import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { verifyEmailRequest } from "../../api";
import { requestHandler } from "../../util";
import { Loader } from "../../components";

const EmailVerificationHandler = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid token. Please try again.");
      navigate("/auth/email-verification");
    }
    requestHandler(
      async () => verifyEmailRequest(token || "abcd"),
      null,
      () => {
        toast.success("Email verification successful. You can now login.");
        navigate("/auth/login");
      },
      (message) => {
        toast.error(message);
        navigate("/auth/register");
      }
    );
  });

  return <Loader />;
};

export default EmailVerificationHandler;
