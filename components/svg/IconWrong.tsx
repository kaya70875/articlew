import * as React from "react"
const IconWrong = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
        viewBox="0 0 200 200"
        className={props?.className}
        {...props}
    >
        <path d="m114 100 49-49a9.9 9.9 0 0 0-14-14l-49 49-49-49a9.9 9.9 0 0 0-14 14l49 49-49 49a9.9 9.9 0 0 0 14 14l49-49 49 49a9.9 9.9 0 0 0 14-14Z" />
    </svg>
)
export default IconWrong
