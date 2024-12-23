import { FormData } from "@/types/formData";

export const useAuthActions = () => {
  const createUser = async (formData: Partial<FormData>) => {
    try {
      const { name, lastname, email, password } = formData;

      const res = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
        }),
      });

      if(!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }

    } catch (error) {
      console.error(error);
    }
  };

  return { createUser };
};
