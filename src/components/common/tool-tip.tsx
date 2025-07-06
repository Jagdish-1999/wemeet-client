import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolTipPropTypes {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isHoverable?: boolean;
    hideArrow?: boolean;
}

const ToolTip: React.FC<ToolTipPropTypes> = ({
    trigger,
    children,
    isHoverable = true,
    hideArrow = false,
}) => {
    return (
        <Tooltip disableHoverableContent={isHoverable}>
            <TooltipTrigger asChild>{trigger}</TooltipTrigger>
            <TooltipContent className="p-2 rounded-none" hideArrow={hideArrow}>
                {children}
            </TooltipContent>
        </Tooltip>
    );
};

export default ToolTip;
