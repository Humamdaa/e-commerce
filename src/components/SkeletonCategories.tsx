import { Skeleton } from 'antd';
import React from 'react';

interface CheckboxSkeletonProps {
  count?: number;
}

const CheckboxSkeleton: React.FC<CheckboxSkeletonProps> = ({ count = 1 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Skeleton.Avatar
            active
            size="small"
            shape="square"
            style={{ width: '16px', height: '16px' }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: '80px', height: '16px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxSkeleton;
