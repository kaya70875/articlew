import * as React from "react"
import InformationBubble from "../reusables/InformationBubble"
const IconHearth = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <InformationBubble information="Add to favorites">
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
                d="M17 16c-1.2 1.323-4.5 4.5-4.5 4.5S9.2 17.323 8 16c-2.8-3.088-3.5-4.294-3.5-6.5 0-2.206 1.6-4 4-4 2 0 3.2 1.324 4 2.647.8-1.323 2-2.647 4-2.647 2.4 0 4 1.794 4 4s-.7 3.412-3.5 6.5Z"
            />
        </svg>
    </InformationBubble>

)
export default IconHearth
