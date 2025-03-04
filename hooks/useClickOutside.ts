import { useEffect } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement | null>, callback: (isOpen: boolean) => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) {
                callback(false);
            }
        }

        const handleDropdownLink = (event: MouseEvent) => {
            if (ref.current?.contains(event.target as Node)) {
                const isClickable = (event.target as HTMLElement).dataset.dropdownClickable || (event.target as HTMLElement).parentElement?.dataset.dropdownClickable;
                if (isClickable) {
                    setTimeout(() => {
                        callback(false);
                    }, 100);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleDropdownLink);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleDropdownLink);
        }
    }, [ref, callback]);
}

export default useClickOutside;