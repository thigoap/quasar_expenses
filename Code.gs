function doGet() {
  const doc = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = doc.getSheetByName('Sheet1')
  const values = sheet.getDataRange().getValues()

  return ContentService.createTextOutput(JSON.stringify(values)).setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  const doc = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = doc.getSheetByName('Sheet1')
  // sheet.appendRow([
  //   e.parameter.date,
  //   e.parameter.item,
  //   e.parameter.amount,
  //   e.parameter.method
  // ])

  const date = e.parameter.date
  const month_number = getMonthNumber(date)
  const month_name = getMonthName(month_number)
  const item = e.parameter.item
  const category = e.parameter.category
  const method = e.parameter.method
  const total = e.parameter.amount
  const times = e.parameter.times

  const data = [[date, month_name, item, category, method, total, times]]
  const last_row = sheet.getLastRow()
  const range = sheet.getRange(last_row + 1, 1, 1, data[0].length)
  range.setValues(data)

  const month_array = monthsArray(month_number, total)
  const months_range = sheet.getRange(last_row + 1, 8, 1, month_array.length)
  months_range.setValues([month_array])

  return ContentService.createTextOutput(JSON.stringify(e.parameters))
}

function getMonthNumber(date) {
  let month_number = date.substring(5,7) 
  return month_number
}

function getMonthName(month_number) {
  let month_name = ""
  switch(month_number){
    case '01': month_name = "Janeiro";
      break;
    case '02': month_name = "Fevereiro";
      break;
    case '03': month_name = "Março";
      break;
    case '04': month_name = "Abril";
      break;
    case '05': month_name = "Maio";
      break;
    case '06': month_name = "Junho"; 
      break;
    case '07': month_name = "Julho";
      break;
    case '08': month_name = "Agosto";
      break;
    case '09': month_name = "Setembro";
      break;
    case '10': month_name = "Outubro";
      break;
    case '11': month_name = "Novembro";
      break;o
    case '12': month_name = "Dezembro";
      break;
    }
  return month_name
}

function monthsArray(month_number, total) {
  let months_array = []
  for (let i = 1; i < 13; i++) {
    if (i == month_number) {
      months_array.push(total)
    } else {
      months_array.push('-')
    }
  }
  return months_array
}