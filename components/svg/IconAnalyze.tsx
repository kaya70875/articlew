import * as React from "react"
import InformationBubble from "../reusables/InformationBubble"
const IconAnalyze = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <InformationBubble information="Analyze sentence">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            fill="none"
            className={props?.className}
            viewBox="0 0 25 25"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeWidth={1.2}
                d="M9.5 16.5h6M11 20v.5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V20m4-10c0 1.94-.602 2.977-1.573 4.337-.6.84-.927 1.842-.927 2.875V18.5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.288a4.948 4.948 0 0 0-.927-2.875C7.603 12.977 7 11.94 7 10c0-3 2.5-5.5 5.5-5.5S18 7 18 10Z"
            />
        </svg>
    </InformationBubble>

)
export default IconAnalyze
