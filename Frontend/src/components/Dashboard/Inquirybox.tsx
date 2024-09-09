import React from "react";
import Zoom from "@mui/material/Zoom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

// Styled Tooltip component for consistent styling
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
    color: theme.palette.mode === "dark" ? "#f5f5f5" : "#333",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.mode === "dark" ? "#666" : "#ccc"}`,
    borderRadius: "8px", // Custom border-radius
    padding: "8px", // Custom padding
  },
}));

const InquiryBox: React.FC<{
  subject: string;
  email: string;
  name: string;
  message: string;
  createdDate: string; // Sample date in the format "YYYY-MM-DD HH:MM:SS"
}> = ({ subject, email, name, message, createdDate }) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-700 shadow-lg rounded-lg p-6 border border-neutral-300 dark:border-neutral-600">
      <div className="flex items-center justify-between gap-2">
        <HtmlTooltip
          title={
            <React.Fragment>
              <em>{subject}</em>
            </React.Fragment>
          }
          arrow
          placement="top"
          TransitionComponent={Zoom}
        >
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 truncate">
            {subject}
          </h3>
        </HtmlTooltip>
      </div>
      <div className="flex justify-between items-center border-b pb-2 mb-4 border-neutral-300 dark:border-neutral-600">
        <span className="text-xs text-neutral-600 dark:text-neutral-400">{`Inquiry on: ${createdDate}`}</span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="text-neutral-700 dark:text-neutral-300 font-medium">
            👤 {name}
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {email}
          </span>
        </div>
        <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-lg h-28 overflow-y-auto">
          <p className="text-neutral-700 dark:text-neutral-300">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InquiryBox;
