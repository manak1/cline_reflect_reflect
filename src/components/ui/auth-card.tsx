import * as React from "react";
import { cn } from "../../lib/utils";

const AuthCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"rounded-lg border bg-card text-card-foreground shadow-sm",
			className,
		)}
		{...props}
	/>
));
AuthCard.displayName = "AuthCard";

const AuthCardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
AuthCardHeader.displayName = "AuthCardHeader";

const AuthCardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"text-2xl font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
));
AuthCardTitle.displayName = "AuthCardTitle";

const AuthCardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
AuthCardDescription.displayName = "AuthCardDescription";

const AuthCardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
AuthCardContent.displayName = "AuthCardContent";

const AuthCardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
AuthCardFooter.displayName = "AuthCardFooter";

export {
	AuthCard,
	AuthCardHeader,
	AuthCardFooter,
	AuthCardTitle,
	AuthCardDescription,
	AuthCardContent,
};
