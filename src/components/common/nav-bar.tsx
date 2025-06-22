"use client";

import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import ToggleTheme from "../ui/toggle-theme";
import { useCallback } from "react";
import ToolTip from "./tool-tip";

interface NavbarPropTypes {
    test?: string;
}

const Navbar: React.FC<NavbarPropTypes> = () => {
    const router = useRouter();

    const handleBack = useCallback(() => {
        if (window.history.length > 2) {
            router.back();
        } else {
            router.push("/");
        }
    }, [router]);

    return (
        <nav className="flex items-center justify-between w-full px-4 py-2 dark:bg-gray-800 bg-gray-200">
            <div className="font-afacad flex items-center gap-4">
                <ToolTip
                    trigger={
                        <Button
                            variant="ghost"
                            className="text-2xl rounded-full bg-accent"
                            onClick={handleBack}
                        >
                            <Undo2 />
                        </Button>
                    }
                >
                    Go Back
                </ToolTip>

                <h4>Chatter up</h4>
            </div>
            <div className="flex flex-1/2 justify-end">
                <ToggleTheme />
            </div>
        </nav>
    );
};

export default Navbar;
