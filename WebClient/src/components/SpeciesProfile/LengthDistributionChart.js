import React from 'react';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const LengthDistributionChart = ({ row }) => {
  const data = row.subRows; 
  const lengthDistributionData = _(row.subRows)
      .groupBy(subRow => new Date(subRow.SURVEY_DATE).getFullYear()) 
      .map((surveys, year) => ({
        year: year, 
        '0_5_INCHES': _.sumBy(surveys, '0_5_INCHES'),
        '6_7_INCHES': _.sumBy(surveys, '6_7_INCHES'),
        '8_9_INCHES': _.sumBy(surveys, '8_9_INCHES'),
        '10_11_INCHES': _.sumBy(surveys, '10_11_INCHES'),
        '12_14_INCHES': _.sumBy(surveys, '12_14_INCHES'),
        '15_19_INCHES': _.sumBy(surveys, '15_19_INCHES'),
        '20_24_INCHES': _.sumBy(surveys, '20_24_INCHES'),
        '25_29_INCHES': _.sumBy(surveys, '25_29_INCHES'),
        '31_34_INCHES': _.sumBy(surveys, '31_34_INCHES'),
        '35_39_INCHES': _.sumBy(surveys, '35_39_INCHES'),
        '40_44_INCHES': _.sumBy(surveys, '40_44_INCHES'),
        '45_49_INCHES': _.sumBy(surveys, '45_49_INCHES'),
        '50_PLUS_INCHES': _.sumBy(surveys, '50_PLUS_INCHES')
      }))
      .sortBy('year')
      .value();
  
    return (
      <Box display="flex" marginTop={2}>
        {/* Length Distribution Chart */}
        <Box flex="0" marginRight={2}>
          <LineChart
            dataset={lengthDistributionData}
            xAxis={[
              {
                id: 'Year',
                dataKey: 'year', 
                scaleType: 'point', 
              },
            ]}
            series={[
              {
                id: '0_5_INCHES',
                label: '0-5 Inches',
                dataKey: '0_5_INCHES',
                showMark: false,
                color: '#f44336',
              },
              {
                id: '6_7_INCHES',
                label: '6-7 Inches',
                dataKey: '6_7_INCHES',
                showMark: false,
                color: '#2196F3',
              },
              {
                id: '8_9_INCHES',
                label: '8-9 Inches',
                dataKey: '8_9_INCHES',
                showMark: false,
                color: '#FFEB3B',
              },
              {
                id: '10_11_INCHES',
                label: '10-11 Inches',
                dataKey: '10_11_INCHES',
                showMark: false,
                color: '#4CAF50',
              },
              {
                id: '12_14_INCHES',
                label: '12-14 Inches',
                dataKey: '12_14_INCHES',
                showMark: false,
                color: '#9C27B0',
              },
              {
                id: '15_19_INCHES',
                label: '15-19 Inches',
                dataKey: '15_19_INCHES',
                showMark: false,
                color: '#FF9800',
              },
              {
                id: '20_24_INCHES',
                label: '20-24 Inches',
                dataKey: '20_24_INCHES',
                showMark: false,
                color: '#8BC34A',
              },
              {
                id: '25_29_INCHES',
                label: '25-29 Inches',
                dataKey: '25_29_INCHES',
                showMark: false,
                color: '#FF5722',
              },
              {
                id: '31_34_INCHES',
                label: '31-34 Inches',
                dataKey: '31_34_INCHES',
                showMark: false,
                color: '#3F51B5',
              },
              {
                id: '35_39_INCHES',
                label: '35-39 Inches',
                dataKey: '35_39_INCHES',
                showMark: false,
                color: '#607D8B',
              },
              {
                id: '40_44_INCHES',
                label: '40-44 Inches',
                dataKey: '40_44_INCHES',
                showMark: false,
                color: '#E91E63',
              },
              {
                id: '45_49_INCHES',
                label: '45-49 Inches',
                dataKey: '45_49_INCHES',
                showMark: false,
                color: '#795548',
              },
              {
                id: '50_PLUS_INCHES',
                label: '50+ Inches',
                dataKey: '50_PLUS_INCHES',
                showMark: false,
                color: '#00BCD4',
              },
            ]}
            width={1250}
            height={300}
            margin={{ left: 50 }}
          />
        </Box>
      </Box>
    );
};

export default LengthDistributionChart;
