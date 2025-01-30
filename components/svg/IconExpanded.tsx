import * as React from "react"
const IconExpanded = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
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
            fill="currentColor"
            d="m7.5 12.5-.424-.424-.425.424.425.424.424-.424Zm10 0 .424.424.425-.424-.425-.424-.424.424Zm-6.076 3.076-3.5-3.5-.848.848 3.5 3.5.848-.848Zm-3.5-2.652 3.5-3.5-.848-.848-3.5 3.5.848.848Zm5.652-3.5 3.5 3.5.848-.848-3.5-3.5-.848.848Zm3.5 2.652-3.5 3.5.848.848 3.5-3.5-.848-.848Z"
        />
    </svg>
)
export default IconExpanded
