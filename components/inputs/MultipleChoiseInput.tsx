import React from 'react'

interface MultipleChoiseInputProps {
    handleCategoryClick: (categoryId: string) => void;
    category: {
        id: string;
        name: string;
    };
    checkedCategories: string[];
}

export default function MultipleChoiseInput({handleCategoryClick , category, checkedCategories} : MultipleChoiseInputProps) {
    return (
        <div className="category-wrapper cursor-pointer bg-lightBlue p-4 flex items-center gap-4" onClick={() => handleCategoryClick(category.id)}>
            <input type="checkbox" checked={checkedCategories.includes(category.id)} readOnly />
            <p>{category.name}</p>
        </div>
    )
}
