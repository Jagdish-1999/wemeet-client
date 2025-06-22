import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolTipPropTypes {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isHoverable?: boolean;
}

const ToolTip: React.FC<ToolTipPropTypes> = ({
    trigger,
    children,
    isHoverable = true,
}) => {
    return (
        <Tooltip disableHoverableContent={isHoverable}>
            <TooltipTrigger asChild>{trigger}</TooltipTrigger>
            <TooltipContent>{children}</TooltipContent>
        </Tooltip>
    );
};

export default ToolTip;
