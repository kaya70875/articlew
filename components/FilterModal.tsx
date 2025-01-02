import Image from 'next/image';
import React, { useState } from 'react';
import xIcon from '@/public/images/xicon.svg';

interface FilterModalProps {
    categories: string[];
    setCategories: (categories: string[]) => void;
    onClose: () => void;
}

const categoriesList = [
    {
        'name': 'Media / News',
        'id': 'news'
    },
    {
        'name': 'Science',
        'id': 'science'
    },
    {
        'name' : 'Psychology',
        'id': 'psychology'
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
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-main flex flex-col gap-4 p-12 rounded-lg w-1/3'>
                <header className="modal-header flex flex-col gap-4">
                    <div className='flex items-center justify-between w-full'>
                        <h3>Filter Categories</h3>
                        <Image onClick={onClose} src={xIcon} alt='x-icon' className='cursor-pointer' />
                    </div>
                    <p>Categories ({checkedCategories.length})</p>
                </header>

                {categoriesList.map((category, index) => (
                    <div className="category-wrapper cursor-pointer bg-lightBlue p-4 flex items-center gap-4" key={index} onClick={() => handleCategoryClick(category.id)}>
                        <input type="checkbox" checked={checkedCategories.includes(category.id)} readOnly />
                        <p>{category.name}</p>
                    </div>
                ))}

                <button className="primary-button active:opacity-90" onClick={handleApplyFilters}>Apply Filters</button>
            </div>
        </div>
    );
}