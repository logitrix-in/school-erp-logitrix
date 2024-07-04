const XLSX = require("xlsx");
const fs = require("fs");

const generateRandomData = (rows) => {
  const data = [["Application ID", "Name", "Marks"]];
  for (let i = 1; i <= rows; i++) {
    const name = `Student${i}`;
    const marks = Math.floor(Math.random() * 101); // Random marks between 0 and 100
    data.push([i, name, marks]);
  }
  return data;
};

const createExcelFile = (data, fileName) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, fileName);
};

const numberOfRows = 200000; // Specify the number of rows you want in your Excel file
const excelData = generateRandomData(numberOfRows);
const fileName = "large_excel_file.xlsx"; // Specify the desired file name

createExcelFile(excelData, fileName);

console.log(`Excel file "${fileName}" created with ${numberOfRows} rows.`);
