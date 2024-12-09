import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, iconSetQuartzBold } from '@ag-grid-community/theming';

const myTheme = themeQuartz
	.withPart(iconSetQuartzBold)
	.withParams({
        accentColor: "#FF0000",
        backgroundColor: "#0d0d0c",
        borderColor: "#ffffff00",
        borderRadius: 20,
        browserColorScheme: "dark",
        cellHorizontalPaddingScale: 1,
        chromeBackgroundColor: {
            ref: "backgroundColor"
        },
        columnBorder: false,
        fontFamily: {
            googleFont: "Roboto"
        },
        fontSize: 16,
        foregroundColor: "#FFFFFF",
        headerBackgroundColor: "#0F0F0F",
        headerFontSize: 14,
        headerFontWeight: 500,
        headerTextColor: "#FFFFFF",
        headerVerticalPaddingScale: 0.9,
        iconSize: 20,
        rowBorder: false,
        rowVerticalPaddingScale: 1.2,
        sidePanelBorder: false,
        spacing: 8,
        wrapperBorder: false,
        wrapperBorderRadius: 0
    });

const LakeGrid = ({ lakeData, columnDefs, onSelectionChanged }) => {
  const gridRef = useRef(); 

  return (
    <div
      style={{ height: 640, width: '100%' }}
    >
      <AgGridReact
        ref={gridRef} 
        theme={myTheme}
        columnDefs={columnDefs}
        rowData={lakeData} 
        pagination={true} 
        paginationPageSize={10} 
        defaultColDef={{ flex: 1, minWidth: 100, sortable: true, filter: true, resizable: true }}
        onSelectionChanged={onSelectionChanged}
        rowSelection="single" 
        animateRows={true} 
      />
    </div>
  );
};

export default LakeGrid;
