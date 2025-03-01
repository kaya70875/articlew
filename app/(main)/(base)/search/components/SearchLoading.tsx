import React from 'react';
import OverviewSkeleton from '@/components/skeletons/OverviewSkeleton';

export default function SearchLoading() {
    return (
        <div className='flex flex-col gap-4'>
            <OverviewSkeleton />
            <OverviewSkeleton />
        </div>
    );
} 