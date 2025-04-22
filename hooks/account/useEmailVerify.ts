export const useEmailVerify = () => {
  const sendVerificationEmail = async (email: string) => {
    try {
      const res = await fetch("/api/account/sendVerificationEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const verifyAccount = async (token: string) => {
    try {
      const res = await fetch("/api/account/verifyAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.error);
        return false;
      }

      return true;
    } catch (e) {
      console.error(e);
    }
  };

  return { sendVerificationEmail, verifyAccount };
};
