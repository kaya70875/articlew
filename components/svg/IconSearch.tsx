import * as React from "react"
const IconSearch = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        className={props?.className}
        {...props}
    >
        <path
            stroke="currentColor"
            strokeWidth={2}
            d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
        />
    </svg>
)
export default IconSearch
