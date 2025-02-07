import * as React from "react"
const IconCompare = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        className={props?.className}
        {...props}
    >
        <path fill="currentColor" d="M1 8a1 1 0 0 1 1-1h7.586L7.293 4.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 1 1-1.414-1.414L9.586 9H2a1 1 0 0 1-1-1Zm21 7h-7.586l2.293-2.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L14.414 17H22a1 1 0 0 0 0-2Z" />
    </svg>
)
export default IconCompare
