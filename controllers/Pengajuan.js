const Pengajuan = require("../models/PengajuanModel.js");
const Status = require("../models/StatusModel.js");
const TypePengajuan = require("../models/TypePengajuanModel.js");
const Ptjb = require("../models/PtjbModel.js");
const Users = require("../models/UserModel.js");
const {Op} = require('sequelize');
const Coa = require("../models/CoaModel.js");
const AnnalitictAccout = require("../models/AnnaliticAccountModel.js");
const CostCenter = require("../models/CostCenterModel.js");
const Attachment = require("../models/AttachmentModel.js");

const getPengajuans = async(req, res) => {
    try {
        const response = await Pengajuan.findAll({
            include:[
                {
                    model:Users
                },
                {
                    model:TypePengajuan
                },
                {
                    model:Status
                }
            ]
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPengajuansPage = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const type = parseInt(req.params.type);
    const status = parseInt(req.params.status);
    const search = req.params.search;

    const offset = (page - 1) * limit;

    const findType = await TypePengajuan.findOne({
        where:{
            code:type
        }
    });

    const findStatus = await Status.findOne({
        where:{
            code:status
        }
    });
    
    try {
        if(!findType) {
            if(!findStatus){
                const response = await Pengajuan.findAndCountAll({
                    limit:limit,
                    offset:offset,
                    include:[
                        {
                            model:Users
                        },
                        {
                            model:TypePengajuan
                        },
                        {
                            model:Status
                        }
                    ],
                    order:[
                        ['id', 'DESC']
                    ]
                });

                return res.status(200).json(response);
            }
            const response = await Pengajuan.findAndCountAll({
                limit:limit,
                offset:offset,
                include:[
                    {
                        model:Users
                    },
                    {
                        model:TypePengajuan
                    },
                    {
                        model:Status
                    }
                ],
                where:{
                    statusId:findStatus.id
                },
                order:[
                    ['id', 'DESC']
                ]
            });
    
            return res.status(200).json(response);
        }

        if(!findStatus){
            const response = await Pengajuan.findAndCountAll({
                limit:limit,
                offset:offset,
                include:[
                    {
                        model:Users
                    },
                    {
                        model:TypePengajuan
                    },
                    {
                        model:Status
                    }
                ],
                where:{
                    typePengajuanId:findType.id
                },
                order:[
                    ['id', 'DESC']
                ]
            });

            return res.status(200).json(response);
        }

        const response = await Pengajuan.findAndCountAll({
            limit:limit,
            offset:offset,
            include:[
                {
                    model:Users
                },
                {
                    model:TypePengajuan
                },
                {
                    model:Status
                }
            ],
            where:{
                typePengajuanId:findType.id,
                statusId:findStatus.id
            },
            order:[
                ['id', 'DESC']
            ]
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPengajuansPageSearch = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const type = parseInt(req.params.type);
    const status = parseInt(req.params.status);
    const search = req.params.search;
    const offset = (page - 1) * limit;

    const findType = await TypePengajuan.findOne({
        where:{
            code:type
        }
    });

    const findStatus = await Status.findOne({
        where:{
            code:status
        }
    });

    try {
        if(!findType) {
            if(!findStatus){
                const response = await Pengajuan.findAndCountAll({
                    limit:limit,
                    offset:offset,
                    include:[
                        {
                            model:Users
                        },
                        {
                            model:TypePengajuan
                        },
                        {
                            model:Status
                        }
                    ],
                    where:{
                        [Op.or]:[
                            {
                                id:{
                                    [Op.like]:`%${search}%`
                                }
                            },
                            // {
                            //     userId:{
                            //         [Op.like]:`%${search}%`
                            //     }
                            // }
                        ]
                    },
                    order:[
                        ['id', 'DESC']
                    ]
                });

                return res.status(200).json(response);
            }
            const response = await Pengajuan.findAndCountAll({
                limit:limit,
                offset:offset,
                include:[
                    {
                        model:Users
                    },
                    {
                        model:TypePengajuan
                    },
                    {
                        model:Status
                    }
                ],
                where:{
                    statusId:findStatus.id,
                    id:{
                        [Op.like]:`%${search}%`
                    }
                },
                order:[
                    ['id', 'DESC']
                ]
            });
    
            return res.status(200).json(response);
        }

        if(!findStatus){
            const response = await Pengajuan.findAndCountAll({
                limit:limit,
                offset:offset,
                include:[
                    {
                        model:Users
                    },
                    {
                        model:TypePengajuan
                    },
                    {
                        model:Status
                    }
                ],
                where:{
                    typePengajuanId:findType.id,
                    id:{
                        [Op.like]:`%${search}%`
                    }
                },
                order:[
                    ['id', 'DESC']
                ]
            });

            return res.status(200).json(response);
        }

        const response = await Pengajuan.findAndCountAll({
            limit:limit,
            offset:offset,
            include:[
                {
                    model:Users
                },
                {
                    model:TypePengajuan
                },
                {
                    model:Status
                }
            ],
            where:{
                typePengajuanId:findType.id,
                statusId:findStatus.id,
                id:{
                    [Op.like]:`%${search}%`
                }
            },
            order:[
                ['id', 'DESC']
            ]
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPengajuanById = async(req, res) => {
    try {
        const response = await Pengajuan.findOne({
            include:[
                {
                    model:Status
                },{
                    model:TypePengajuan
                },{
                    model:Users
                },{
                    model:Coa
                },
                {
                    model:AnnalitictAccout
                },
                {
                    model:CostCenter
                },{
                    model:Ptjb
                },{
                    model:Attachment
                }
            ],
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPengajuanByUser = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const search = req.params.search;
    const offset = (page - 1) * limit;

    const findUser = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findUser) return res.status(404).json({msg: "not found"});
    
    try {
        const response = await Pengajuan.findAndCountAll({
            limit:limit,
            offset:offset,
            include:[
                {
                    model:Users
                },
                {
                    model:TypePengajuan
                },
                {
                    model:Status
                }
            ],
            where:{
                userId:findUser.id
            },
            order:[
                ['id', 'DESC']
            ]
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPengajuanByUserSearch = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const search = req.params.search;
    const offset = (page - 1) * limit;

    const findUser = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findUser) return res.status(404).json({msg: "not found"});
    
    try {
        const response = await Pengajuan.findAndCountAll({
            limit:limit,
            offset:offset,
            include:[
                {
                    model:Users
                },
                {
                    model:TypePengajuan
                },
                {
                    model:Status
                }
            ],
            where:{
                userId:findUser.id,
                id:{
                    [Op.like]:`%${search}%`
                }
            },
            order:[
                ['id', 'DESC']
            ]
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const createPengajuan = async(req, res) => {
    const {
        tanggal, 
        expense, 
        advance, 
        coaId, 
        costCenterId, 
        annaliticAccountId, 
        debit, 
        credit,
        reference,
        keterangan, 
        typePengajuanId, 
        userId, 
        statusId
    } = req.body;

    if(!typePengajuanId | !userId) return res.status(404).json({msg: 'type pengajuan dan nama user harus di isi'});

    try {
        await Pengajuan.create({
            tanggal:tanggal,
            expense:expense,
            advance:advance,
            coaId:coaId,
            costCenterId:costCenterId,
            annaliticAccountId:annaliticAccountId,
            debit:debit,
            credit:credit,
            reference:reference,
            keterangan:keterangan,
            typePengajuanId:typePengajuanId,
            userId:userId,
            statusId:statusId
        });

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updatePengajuan = async(req, res) => {
    const {
        tanggal, 
        expense, 
        advance, 
        coaId, 
        costCenterId, 
        annaliticAccountId, 
        debit, 
        credit,
        reference,
        keterangan, 
        typePengajuanId, 
        userId, 
        statusId
    } = req.body;

    const findPengajuan = await Pengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findPengajuan) return res.status(404).json({msg: "not found"});

    if(!statusId){
        try {
            await findPengajuan.update({
                tanggal:tanggal,
                expense:expense,
                advance:advance,
                coaId:coaId,
                costCenterId:costCenterId,
                annaliticAccountId:annaliticAccountId,
                debit:debit,
                credit:credit,
                reference,
                keterangan,
                typePengajuanId:typePengajuanId,
                userId:userId
            });
    
            return res.status(200).json({msg: "success"});
        } catch (error) {
            return res.status(500).json({msg: error});
        }
    }

    const findStatus = await Status.findOne({
        where:{
            code:statusId
        }
    });

    if(!findStatus) return res.status(404).json({msg: "status not found"});

    try {
        await findPengajuan.update({
            tanggal:tanggal,
            expense:expense,
            advance:advance,
            coaId:coaId,
            costCenterId:costCenterId,
            annaliticAccountId:annaliticAccountId,
            debit:debit,
            credit:credit,
            reference,
            keterangan,
            typePengajuanId:typePengajuanId,
            userId:userId,
            statusId:findStatus.id
        });

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deletePengajuan = async(req, res) => {
    const findPengajuan = await Pengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findPengajuan) return res.status(404).json({msg: "not found"});

    try {
        await findPengajuan.destroy();

        return res.status(200).json({msg: "delete success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}


module.exports = {
    getPengajuans,
    getPengajuanById,
    createPengajuan,
    updatePengajuan,
    deletePengajuan,
    getPengajuansPage,
    getPengajuansPageSearch,
    getPengajuanByUser,
    getPengajuanByUserSearch
}