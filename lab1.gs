function sendEmail() {
  let excel = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = excel.getSheetByName("Sheet1");
  // Getting last row
  let lastRow  = sheet.getLastRow();
  // Getting second last Column
  let secondLastColumn = sheet.getLastColumn()-1
  let range = sheet.getRange(2,2,lastRow-1,secondLastColumn)
  let values = range.getValues();

  for (let i = 0; i < values.length; i++) {
    let status;
    let [Name, Email, Salary] = values[i];
    if (Email) {
      try {
        let msg = buildMessage(Name, Salary);
        MailApp.sendEmail(Email, "Salary for Month of June", msg);
        status = "success";
      } catch (err) {
        console.log(err);
        status = "Fail";
      }
    } else {
      status = "No Email";
    }
    let cell = range.getCell(i + 1, 4);
    cell.setValue(status);
  }
}

const buildMessage = (name, salary) => {
  return `Hi ${name}, your salary for the month of June has been credited. Salary:${salary}`;
};
