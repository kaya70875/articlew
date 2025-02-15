import * as React from "react"
const IconDots = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        className={props?.className}
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M0 0h24v24H0z" />
        <circle cx={7} cy={12} r={0.5} stroke="currentColor" />
        <circle cx={12} cy={12} r={0.5} stroke="currentColor" />
        <circle cx={17} cy={12} r={0.5} stroke="currentColor" />
    </svg>
)
export default IconDots
