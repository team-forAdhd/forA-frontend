const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("./localization.json"); // 키 생성 후 다운된 json파일을 지정합니다.
const doc = new GoogleSpreadsheet(
  "1I-Fsu0BOrlNBRsWyo9VPXCDtrdWVsF-5pYcuuokK1TY",
);
async function googleSheet() {
  const sheetNumbers = 4; // 가지고 올 sheet 갯수
  await doc.useServiceAccountAuth(gs_creds);
  await doc.loadInfo();
  for (let step = 0; step < sheetNumbers; step++) {
    const sheet = doc.sheetsByIndex[step];
    const title = sheet.title;
    const rows = await sheet.getRows(); // 세 번째 row 부터 100개 row를 가져옵니다.
    try {
      let ko = "{\n";
      let end = false;
      rows.forEach((ele) => {
        if (ele._rawData[1] === undefined) {
          return;
        }
        const key = String(ele._rawData[0]);
        const k = String(ele._rawData[1]);
        if (key.length > 0) {
          if (key === "[End]" || end === true) {
            end = true;
            return false;
          }

          if (key[0] === "[") {
            if (key[1] !== "@") {
              ko += "\n\t// " + key.slice(1, -1) + "\n";
            }
          } 
          else {
            ko +=
              "\t" +
              '"' +
              key +
              '"' +
              ': "' +
              k.replace(/"/g, '\\"').trim() +
              '",\n';
          }
        }
      });

      ko = ko.slice(0, -2) + "\n}";

      const fs = require("fs");

      try {
        fs.writeFileSync(`src/public/locales/ko/${title}.json`, ko);
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.log("AUTH ERROR ", err);
    }
  }
}

googleSheet();