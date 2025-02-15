import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './OverviewSkeleton.css'

interface OverviewSkeletonProps {
    height?: string;
    count?: number | 0;
}

export default function OverviewSkeleton({ height = '20px', count }: OverviewSkeletonProps) {
    return (
        <div className="skeleton-overview-wrapper">
            <div className="ellipse-header" style={{ width: '100%' }}>
                <Skeleton width={'32px'} height={'32px'} count={count} circle baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                <Skeleton width={'100px'} height={height} count={count} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
            </div>

            <Skeleton width={'100%'} height={height} count={count} baseColor="#e0e0e0" highlightColor="#f0f0f0" />

            <Skeleton width={'100%'} height={'100px'} count={2} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        </div>
    )
}
