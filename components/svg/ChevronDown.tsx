import * as React from "react"
const ChevronDown = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        className={props?.className}
        viewBox="0 0 25 25"
        {...props}
    >
        <path stroke="currentColor" strokeWidth={1.2} d="M17 10.5 12.5 15 8 10.5" />
    </svg>
)
export default ChevronDown
