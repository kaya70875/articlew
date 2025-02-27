import * as React from "react"
const IconMail = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        fill="none"
        className={props?.className}
        {...props}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"
        />
    </svg>
)
export default IconMail
