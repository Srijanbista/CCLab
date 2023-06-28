function sendEmail() {
  let excelApp = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = excelApp.getSheetByName("Sheet1");
  // Getting last row
  let lastRow  = activeSheet.getLastRow();
  // Getting second last Column
  let secondLastColumn = activeSheet.getLastColumn()-1
  let activeRange = activeSheet.getRange(2,2,lastRow-1,secondLastColumn)
  let values = activeRange.getValues();

  for (let i = 0; i < values.length; i++) {
    let status;
    let [Name, Email, Salary] = values[i];
    if (Email) {
      try {
        let msgToSend = buildMessage(Name, Salary);
        MailApp.sendEmail(Email, `Your Salary for Month of June has been credited`, msg);
        status = "success";
      } catch (err) {
        logger.log(err);
        status = "Fail";
      }
    } else {
      status = "No Email";
    }
    let cell = range.getCell(i + 1, 4);
    cell.setValue(status);
  }
}

const buildMessage = (employeeName, employeeSalary) => {
  return `Hi ${employeeName}, your salary for the month of June has been credited. Salary:${employeeSalary}`;
};
