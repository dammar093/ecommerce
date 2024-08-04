import { Stack, useMediaQuery } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
const sellData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 9000, 3008, 4200, 3500, 4500];
const incomeData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 9800, 3908, 4800, 3800, 5000];
const xLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


function AnalyticalLine() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:1024px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');

  const getChartDimensions = () => {
    if (isSmallScreen) {
      return { width: 350, height: 200 };
    } else if (isMediumScreen) {
      return { width: 800, height: 300 };
    } else if (isLargeScreen) {
      return { width: 1060, height: 300 };
    }
  };

  const { width, height } = getChartDimensions();
  return (
    <Stack
    >
      <LineChart
        width={width}
        height={300}
        series={[
          { data: sellData, label: 'Sell' },
          { data: incomeData, label: 'Income' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </Stack>
  );
}

export default AnalyticalLine