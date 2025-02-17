import * as React from "react"
const IconSignout = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        className={props?.className}
        fill="none"
        viewBox="0 -0.5 24 24"
        {...props}
    >
        <path
            fill="currentColor"
            d="M7.044 9.532a.75.75 0 0 0-1.058-1.064l1.058 1.064Zm-4.073 1.936a.75.75 0 0 0 1.058 1.064l-1.058-1.064Zm1.058 0a.75.75 0 0 0-1.058 1.064l1.058-1.064Zm1.957 4.064a.75.75 0 0 0 1.058-1.064l-1.058 1.064ZM3.5 11.25a.75.75 0 0 0 0 1.5v-1.5Zm14 1.5a.75.75 0 0 0 0-1.5v1.5ZM5.986 8.468l-3.015 3 1.058 1.064 3.015-3-1.058-1.064Zm-3.015 4.064 3.015 3 1.058-1.064-3.015-3-1.058 1.064Zm.529.218h14v-1.5h-14v1.5Z"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.5 15a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4"
        />
    </svg>
)
export default IconSignout
