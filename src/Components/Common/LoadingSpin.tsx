import React from 'react';
import { Spin, Typography } from 'antd';

const LoadingSpin: React.FC = () => {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.05)',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
      }}
    >
      <Spin
        tip={
          <Typography.Text strong style={{ color: '#1677ff' }}>
            Fetching data, hold on a moment...
          </Typography.Text>
        }
        size="large"
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: 50,
            borderRadius: 4,
            width: 300,
          }}
        />
      </Spin>
    </div>
  );
};

export default LoadingSpin;
