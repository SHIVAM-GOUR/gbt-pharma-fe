import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "sm" | "md" | "lg" | "xl"
  background?: "default" | "muted" | "primary" | "secondary" | "medical"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    containerSize = "lg", 
    padding = "lg",
    background = "default",
    children,
    ...props 
  }, ref) => {
    const paddingClasses = {
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16", 
      lg: "py-16 sm:py-20",
      xl: "py-20 sm:py-24"
    }

    const backgroundClasses = {
      default: "bg-background",
      muted: "bg-muted",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      medical: "bg-gradient-to-br from-primary/5 to-secondary/5"
    }

    return (
      <section
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
