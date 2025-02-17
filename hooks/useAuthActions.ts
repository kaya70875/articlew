import { FormData } from "@/types/formData";

type Method = "PUT" | "POST" | "GET" | "DELETE";

export const makeRequest = (path: string, method?: Method, body?: BodyInit) => {
  return fetch(`api${path}`, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};

export const useAuthActions = () => {
  const createUser = async (formData: Partial<FormData>) => {
    try {
      const { name, lastname, email, password } = formData;

      const res = await makeRequest(
        "/users",
        "POST",
        JSON.stringify({
          name,
          lastname,
          email,
          password,
        })
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const res = await makeRequest(
        "/users/account/updatePassword",
        "PUT",
        JSON.stringify({
          currentPassword,
          newPassword,
        })
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (name: string, lastname?: string) => {
    try {
      const res = await makeRequest(
        "/users/account/updateProfile",
        "PUT",
        JSON.stringify({
          name,
          lastname,
        })
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, changePassword, updateProfile };
};
