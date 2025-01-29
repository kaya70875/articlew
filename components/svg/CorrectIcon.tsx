import * as React from "react"
const SvgComponent = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={16}
        height={16}
        viewBox="0 0 335.765 335.765"
        fill="currentColor"
        className={props?.className}
        {...props}
    >
        <path d="M311.757 41.803 107.573 245.96l-83.587-83.596L0 186.393l107.573 107.569L335.765 65.795z" />
    </svg>
)
export default SvgComponent
