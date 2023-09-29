const AnnalitictAccout = require('../models/AnnaliticAccountModel.js');
const Coa = require('../models/CoaModel.js');
const CostCenter = require('../models/CostCenterModel.js');
const Pengajuan = require('../models/PengajuanModel.js');
const excelJs = require('exceljs');
const Users = require('../models/UserModel.js');
const Status = require('../models/StatusModel.js');
const TypePengajuan = require('../models/TypePengajuanModel.js');

const exportPengajuan = async(req, res) => {
    const response = await Pengajuan.findAll({
        include:[
            {
                model:Coa
            },
            {
                model:CostCenter
            },
            {
                model:AnnalitictAccout
            },
            {
                model:Users
            },
            {
                model:Status
            },
            {
                model:TypePengajuan
            }
            
        ]
    });
    
    // return res.status(200).json(response);

    try {
        let workbook = new excelJs.Workbook();

        const sheet = workbook.addWorksheet("books");
        sheet.columns = [
            {header: "Date", key: "tanggal", width: 25 },
            {header: "Kode EXP", key: "expense", width: 25 },
            {header: "Kode ADV", key: "advance", width: 25 },
            {header: "PIC", key: "user", width: 25 },
            {header: "Coa", key: "coa", width: 25 },
            {header: "Cost Center", key: "costCenter", width: 25 },
            {header: "Annalitic Account", key: "annaliticAccount", width: 25 },
            {header: "Keterangan", key: "keterangan", width: 25 },
            {header: "Debit", key: "debit", width: 25 },
            {header: "Credit", key: "credit", width: 25 },
            {header: "Status", key: "status", width: 25 }
        ];

        await response.map((data, index)=>{
            sheet.addRow({
                tanggal:data.tanggal,
                expense:data.expense,
                advance:data.advance,
                user:data.user.name,
                coa:data.coa.name,
                costCenter:data.cost_center.name,
                annaliticAccount:data.annalitic_account.name,
                keterangan:data.keterangan,
                debit:data.debit,
                credit:data.credit,
                status:data.status.name
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

const exportPengajuanByStatus = async(req, res) => {
    const response = await Pengajuan.findAll({
        include:[
            {
                model:Coa
            },
            {
                model:CostCenter
            },
            {
                model:AnnalitictAccout
            },
            {
                model:Users
            },
            {
                model:Status
            },
            {
                model:TypePengajuan
            }
            
        ],
        where:{
            statusId:req.params.id
        }
    });

    // return res.status(200).json(response);
    
    try {
        let workbook = new excelJs.Workbook();

        const sheet = workbook.addWorksheet("books");
        sheet.columns = [
            {header: "Date", key: "tanggal", width: 25 },
            {header: "Kode EXP", key: "expense", width: 25 },
            {header: "Kode ADV", key: "advance", width: 25 },
            {header: "PIC", key: "user", width: 25 },
            {header: "Coa", key: "coa", width: 25 },
            {header: "Cost Center", key: "costCenter", width: 25 },
            {header: "Annalitic Account", key: "annaliticAccount", width: 25 },
            {header: "Keterangan", key: "keterangan", width: 25 },
            {header: "Debit", key: "debit", width: 25 },
            {header: "Credit", key: "credit", width: 25 },
            {header: "Status", key: "status", width: 25 }
        ];

        await response.map((data, index)=>{
            sheet.addRow({
                tanggal:data.tanggal,
                expense:data.expense,
                advance:data.advance,
                user:data.user.name,
                coa:data.coa.name,
                costCenter:data.cost_center.name,
                annaliticAccount:data.annalitic_account.name,
                keterangan:data.keterangan,
                debit:data.debit,
                credit:data.credit,
                status:data.status.name
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
    exportPengajuan,
    exportPengajuanByStatus
}