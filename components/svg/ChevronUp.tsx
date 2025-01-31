import * as React from "react"
const ChevronUp = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        className={props?.className}
        fill="none"
        viewBox="0 0 25 25"
        {...props}
    >
        <path stroke="currentColor" strokeWidth={1.2} d="m8 14.5 4.5-4.5 4.5 4.5" />
    </svg>
)
export default ChevronUp
