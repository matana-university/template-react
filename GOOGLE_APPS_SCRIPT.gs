// Salin code ini ke Google Apps Script Editor

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();

    // Ambil data dari request
    const nama = e.parameter.nama || "";
    const email = e.parameter.email || "";
    const whatsapp = e.parameter.whatsapp || "";
    const kota = e.parameter.kota || "";
    const pekerjaan = e.parameter.pekerjaan || "";
    const institusi = e.parameter.institusi || "";

    // Format tanggal
    const timestamp = new Date().toLocaleString("id-ID");

    // Tambahkan data ke spreadsheet
    sheet.appendRow([
      timestamp,
      nama,
      email,
      whatsapp,
      kota,
      pekerjaan,
      institusi,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error: " + error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Error: " + error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
