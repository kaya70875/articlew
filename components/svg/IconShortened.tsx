import * as React from "react"
const IconShortened = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        viewBox="0 0 25 25"
        className={props?.className}
        {...props}
    >
        <path
            stroke="currentColor"
            strokeWidth={1.2}
            d="M5 12.5h15m-11.5 7 4-4 4 4m0-14-4 4-4-4"
        />
    </svg>
)
export default IconShortened
