import * as React from "react"
const IconLinkedin = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={21}
        className={props?.className}
        fill="none"
        {...props}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H9v-7a6 6 0 0 1 6-6ZM5 8H1v12h4V8ZM3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
    </svg>
)
export default IconLinkedin
