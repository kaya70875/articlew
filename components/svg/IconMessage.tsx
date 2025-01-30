import * as React from "react"
const IconMessage = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        viewBox="0 0 24 24"
        className={props?.className}
        {...props}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21.004 12a9 9 0 0 1-9 9h-9s1.56-3.744.936-5a9 9 0 1 1 17.064-4Z"
        />
    </svg>
)
export default IconMessage
