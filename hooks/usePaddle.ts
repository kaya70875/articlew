"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export const usePaddle = () => {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) {
      console.error("Paddle authentication token is missing.");
      return;
    }
    initializePaddle({ environment: "sandbox", token }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      }
    );
  }, []);

  return paddle as Paddle;
};
