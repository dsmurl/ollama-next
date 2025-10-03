import React from "react";

export type MessageRoleLabelProps = {
  role: string;
  className?: string;
  iconSize?: number;
};

export const MessageRoleLabel: React.FC<MessageRoleLabelProps> = ({
  role,
  className,
  iconSize = 18,
}) => {
  const isUser = role?.toLowerCase() === "user";
  const iconSrc = isUser
    ? "/icons/happy-face.png"
    : "/icons/robo-dog-48x48.png";

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <img
        src={iconSrc}
        alt={isUser ? "User" : role || "Assistant"}
        width={iconSize}
        height={iconSize}
        className="rounded-sm"
        loading="lazy"
      />
      <span className="font-bold uppercase">{role}</span>
    </div>
  );
};
