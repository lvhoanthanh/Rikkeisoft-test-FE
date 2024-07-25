import React from 'react';
import _ from 'lodash';
import { Typography } from 'antd';

interface IStatusChipProps {
  color?: string;
  text?: string;
}

const ChipStatus: React.FC<IStatusChipProps> = ({
  color,
  text,
}: IStatusChipProps) => {
  return (
    <Typography.Text
      style={{
        color: color,
        border: `1px solid ${color}`,
        borderRadius: 5,
        padding: 4,
        fontSize: 10,
        fontWeight: 700,
      }}
    >
      {text}
    </Typography.Text>
  );
};

export default ChipStatus;
