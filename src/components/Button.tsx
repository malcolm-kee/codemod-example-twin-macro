import * as React from 'react'
import tw from 'twin.macro'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  isSmall?: boolean
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ComponentPropsWithoutRef<'button'>
>(function Button({ variant, isSmall, ...props }, forwardedRef) {
  return (
    <button
      type="button"
      {...props}
      css={[
        // The common button styles
        tw`px-8 py-2 rounded transform duration-75`,

        // Use the variant grouping feature to add variants to multiple classes
        tw`hocus:(scale-105 text-yellow-400)`,

        // Use props to conditionally style your components
        variant === 'primary' && tw`bg-black text-white border-black`,

        // Combine regular css with tailwind classes within backticks
        variant === 'secondary' && tw`border-2 border-yellow-600`,

        // Conditional props can be added
        isSmall ? tw`text-sm` : tw`text-lg`,

        tw`text-white`,
      ]}
      ref={forwardedRef}
    />
  )
})

export default Button
