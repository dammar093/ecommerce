import { Stack, useMediaQuery } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';


function AnalyticalLine() {
  const { totalSell, totalDeliverd } = useSelector(state => state.count)
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:1024px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');
  const sellData = [0, 0, 0, 0, 0, 0, 0, 0, totalDeliverd];
  const incomeData = [0, 0, 0, 0, 0, 0, 0, 0, totalSell];
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
  ];

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
          { data: sellData, label: 'Placed Orders' },
          { data: incomeData, label: 'Income' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </Stack>
  );
}

export default AnalyticalLine