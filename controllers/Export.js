const Pengajuan = require('../models/PengajuanModel.js');
const excelJs = require('exceljs');

const exportPengajuan = async(req, res) => {
    const response = await Pengajuan.findAll();

    try {
        let workbook = new excelJs.Workbook();

        const sheet = workbook.addWorksheet("books");
        sheet.columns = [
            {header: "tanggal", key: "tanggal", width: 25 },
            {header: "expense", key: "expense", width: 25 },
            {header: "advance", key: "advance", width: 25 },
            {header: "user", key: "user", width: 25 },
            {header: "Annalitic Account", key: "annaliticAccount", width: 25 }
        ];

        await response.map((data, index)=>{
            sheet.addRow({
                tanggal:data.tanggal,
                expense:data.expense,
                advance:data.advance,
                user:data.userId,
                annaliticAccount:data.annaliticAccountId
            })
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment;filename=" + "books.xlsx"
        );

        workbook.xlsx.write(res).then(function(){
            res.end();
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    exportPengajuan
}