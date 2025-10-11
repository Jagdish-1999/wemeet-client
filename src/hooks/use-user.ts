"use client";

import { useEffect, useState } from "react";
import Toast from "@/lib/toast";
import { decryptData, encryptData } from "@/lib/crypto";
import { User } from "@jagdish-1999/socket-contracts";

const useUser = (): User | null => {
    const [user, setUser] = useState<User | null>(null);

    //? Handling user login
    useEffect(() => {
        const usr = sessionStorage.getItem("user");
        const decrypted = decryptData<User>(usr);
        if (decrypted) {
            console.log(
                "%c[User] Logged in (cache)",
                "color:green; font-weight:bold;",
                decrypted.name
            );
            setUser(decrypted);
        }

        if (decrypted) return;
        try {
            const name = prompt("Please Enter your name.");

            if (name) {
                (async () => {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ name }),
                        }
                    );

                    const result = await response.json();

                    if (result.error) Toast.error(result.message);

                    const usr = encryptData<User>(result.user);
                    sessionStorage.setItem("user", usr);
                    console.log(
                        "%c[User Logged in]",
                        "color:green; font-weight:bold;",
                        result.user.name
                    );
                    setUser(result.user);
                })();
            } else {
                Toast.info("Please login first!");
            }
        } catch (error) {
            Toast.error(`Error in useLogin:  ${error}`);
        }
    }, []);

    return user;
};

export default useUser;
