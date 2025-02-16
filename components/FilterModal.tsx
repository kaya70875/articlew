import React, { useState } from 'react';
import Iconx from './svg/Iconx';

interface FilterModalProps {
    categories: string[];
    setCategories: (categories: string[]) => void;
    onClose: () => void;
}

export const categoriesList = [
    {
        'name': 'Media / News',
        'id': 'news'
    },
    {
        'name': 'Science',
        'id': 'science'
    },
    {
        'name': 'Psychology',
        'id': 'psychology'
    },
    {
        'name': 'Wikipedia',
        'id': 'encyclopedia'
    }
]

export default function FilterModal({ categories, setCategories, onClose }: FilterModalProps) {
    const [checkedCategories, setCheckedCategories] = useState<string[]>([...categories]);

    const handleCategoryClick = (category: string) => {
        setCheckedCategories((prev) =>
            prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
        );
    };

    const handleApplyFilters = () => {
        setCategories(checkedCategories);
        onClose();
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
            <div className='bg-main flex flex-col gap-4 p-4 sm:p-8 lg:p-12 rounded-lg w-[95%] sm:w-[75%] md:w-[60%] lg:w-1/2 xl:w-1/3'>
                <header className="modal-header flex flex-col gap-4">
                    <div className='flex items-center justify-between w-full'>
                        <h3>Filter Categories</h3>
                        <Iconx props={{ className: 'hover:text-opacity-80 transition-all cursor-pointer ease-in duration-150 text-primaryText', onClick: onClose }} />
                    </div>
                    <p>Categories ({checkedCategories.length})</p>
                </header>

                {categoriesList.map((category, index) => (
                    <div className="category-wrapper cursor-pointer bg-lightBlue p-4 flex items-center gap-4 rounded-xl hover:bg-gray-300 transition-all ease-in duration-150" key={index} onClick={() => handleCategoryClick(category.id)}>
                        <input type="checkbox" checked={checkedCategories.includes(category.id)} readOnly />
                        <p>{category.name}</p>
                    </div>
                ))}
                <div className='w-full flex items-center justify-center'>
                    <button className="primary-button w-full xs:w-1/2 active:opacity-90" onClick={handleApplyFilters}>Apply Filters</button>
                </div>
            </div>
        </div>
    );
}