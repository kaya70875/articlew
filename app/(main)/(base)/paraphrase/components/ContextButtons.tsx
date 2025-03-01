import InformationBubble from "@/components/reusables/InformationBubble"
import IconAcademic from "@/components/svg/IconAcademic"
import IconExpanded from "@/components/svg/IconExpanded"
import IconFormal from "@/components/svg/IconFormal"
import IconMessage from "@/components/svg/IconMessage"
import IconShortened from "@/components/svg/IconShortened"

type Context = 'Casual' | 'Academic' | 'Formal' | 'Sortened' | 'Extended' | 'Poetic';


export const ContextButtons = ({ context, setContext }: { context: Context, setContext: (context: Context) => void }) => {

    const buttonTypes = [
        {
            name: 'Casual',
            icon: (<IconMessage />)
        },
        {
            name: 'Formal',
            icon: (<IconFormal />)
        },
        {
            name: 'Sortened',
            icon: (<IconShortened />)
        },
        {
            name: 'Extended',
            icon: (<IconExpanded />)
        },
        {
            name: 'Academic',
            icon: (<IconAcademic />)
        }
    ]

    return (
        <div className='flex flex-row-reverse items-center gap-2'>
            {buttonTypes.map((buttonType, index) => (
                <InformationBubble information={buttonType.name} key={index}>
                    <button key={index} className={`relative ${context === buttonType.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-all duration-150 ease-in p-2 md:p-3 rounded-full`} onClick={() => setContext(buttonType.name as Context)}>
                        {buttonType.icon}
                    </button>
                </InformationBubble>
            ))}
        </div>
    )
}