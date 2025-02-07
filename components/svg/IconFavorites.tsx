import * as React from "react"
const IconFavorites = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={16}
        viewBox="0 0 21 21"
        fill="none"
        className={props?.className}
        {...props}
    >
        <path
            stroke="currentColor"
            strokeWidth={2}
            d="M20.291 3.508a5.5 5.5 0 0 0-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
        />
    </svg>
)
export default IconFavorites
