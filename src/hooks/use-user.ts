"use client";

import { useEffect, useState } from "react";
import Toast from "@/lib/toast";
import { decryptData, encryptData } from "@/lib/crypto";
import { UserType } from "@/types/user-list.types";
import { SocketWrapper } from "../lib/socket-wrapper";

const useUser = () => {
    const [user, setUser] = useState<UserType | null>(null);

    //? Handling user login
    useEffect(() => {
        const usr = sessionStorage.getItem("user");
        const decrypted = decryptData(usr || "");
        if (decrypted?._id) SocketWrapper.createInstance(decrypted._id);
        setUser(decrypted);

        if (decrypted) return;
        try {
            let name;
            if (!decrypted) {
                name = prompt("Please Enter your name.");
            }

            if (name) {
                (async () => {
                    const response = await fetch(
                        //! @TODO - need to replace this url with backend url!
                        "http://localhost:8080/get-user",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name }),
                        }
                    );

                    const result = await response.json();

                    if (result.error) Toast.error(result.message);

                    SocketWrapper.createInstance(result.user._id);

                    const usr = encryptData(result.user);
                    sessionStorage.setItem("user", usr);
                    console.log("usr", usr);
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
