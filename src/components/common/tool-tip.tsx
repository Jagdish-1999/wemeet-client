import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolTipPropTypes {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isHoverable?: boolean;
    hideArrow?: boolean;
    className?: string;
}

const ToolTip: React.FC<ToolTipPropTypes> = ({
    trigger,
    children,
    isHoverable = true,
    hideArrow = false,
    className = "",
}) => {
    return (
        <Tooltip disableHoverableContent={isHoverable}>
            <TooltipTrigger asChild>{trigger}</TooltipTrigger>
            <TooltipContent
                className={cn("p-2 rounded-none", className)}
                hideArrow={hideArrow}
            >
                {children}
            </TooltipContent>
        </Tooltip>
    );
};

export default ToolTip;
