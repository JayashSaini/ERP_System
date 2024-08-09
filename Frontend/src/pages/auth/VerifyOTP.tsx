// Importing necessary components and hooks
import { useEffect, useState } from "react";
import { Input, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RootState } from "../../app/store";
import { verifyOTP } from "../../redux/thunk/auth.thunk";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { useAppDispatch } from "../../hooks/UseAppDispatch";

// Component for the Verify OTP page
const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!email) {
      toast.error("Please send the OTP to your email first.");
      navigate("/auth/forgot-password");
    }
  });

  // Function to handle OTP verification
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!otp) return toast.error("Please enter the OTP.");
    if (otp.length !== 6) return toast.error("Invalid OTP. Please try again.");
    if (email) {
      const result = await dispatch(verifyOTP({ email, otp }));
      if (verifyOTP.fulfilled.match(result)) {
        navigate(`/auth/reset-password/${result.payload}`);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="w-full flex justify-center items-center gap-3 flex-col"
      >
        <h1 className="md:text-4xl text-2xl text-center md:my-4 text-white custom-font">
          OTP Verification
        </h1>
        {/* Input for entering the OTP */}
        <div className="w-full">
          <Input
            placeholder="Enter 6 digit code"
            type="text" // Use text to handle length and pattern
            value={otp}
            required
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) {
                setOtp(value);
              }
            }}
            className="w-full max-w-[200px]" // Adjust width as needed
            style={{ textAlign: "center" }} // Center align text
          />
        </div>
        {/* Button to check the OTP */}
        <div className="w-full mt-3">
          <Button fullWidth>Confirm OTP</Button>
        </div>
        {/* Link to resend OTP */}
        <small className="text-zinc-300 text-sm mb-3">
          <Link
            className="text-blue-400 hover:underline"
            to="/auth/forgot-password"
          >
            Resend OTP
          </Link>
        </small>
      </form>
    </>
  );
};

export default VerifyOTP;
