import * as React from "react"
const IconParaphrase = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={20}
        viewBox="0 0 21 21"
        className={props?.className}
        {...props}
    >
        <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5-4 1 1-3.944 9.504-9.552a2.116 2.116 0 0 1 2.864-.125zM9.5 17.5h8M15.5 6.5l1 1" />
        </g>
    </svg>
)
export default IconParaphrase
