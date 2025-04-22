import { useEffect, useState } from "react";

export default function useEmailVerificationTimer(duration: number = 20) {
  const [countdown, setCountdown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setEmailSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const triggerEmailSent = () => {
    setCountdown(duration);
    setEmailSent(true);
  };

  return {
    countdown,
    emailSent,
    canResend: countdown === 0,
    triggerEmailSent,
  };
}
