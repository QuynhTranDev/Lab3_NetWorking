// Code Test 1
// const express = require('express');
// const router = express.Router();
// const SinhVien = require('../models/sinhVienModels');

// // router lấy danh sách SV
// router.get('/', async (req, res) => {
//     try {
//         const sinhViens = await SinhVien.find();
//         res.render('sinhViens', { sinhViens: sinhViens });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Cannot connect to Server' });
//     }
// });

// // Routers edit SV
// router.get('/edit/:id', async (req, res) => {
//     try {
//         const sinhVien = await SinhVien.findById(req.params.id);
//         if (!sinhVien) {
//             return res.status(404).json({ error: 'Student not found' });
//         }
//         res.render('sinhViensEdit', { sinhVien: sinhVien });
//     } catch (error) {
//         res.status(500).json({ error: 'Cannot connect to Server' });
//     }
// });

// // Logic POST Edit SV
// router.post('/edit/:id', async (req, res) => {
//     const { name, id } = req.body;
//     try {
//         const updatedSinhVien = await SinhVien.findByIdAndUpdate(req.params.id, { name, id }, { new: true });
//         if (!updatedSinhVien) {
//             return res.status(404).json({ error: 'Student not found' });
//         }
//         res.redirect('/sinhvien');
//     } catch (error) {
//         res.status(500).json({ error: 'Error updating student' });
//     }
// });

// // Hiển thị form thêm sinh viên
// router.get('/add', (req, res) => {
//     res.render('sinhViensAdd');
// });

// // Thêm dữ liệu sinh viên
// router.post('/', async (req, res) => {
//     const { id, name } = req.body;
//     try {
//         const newSinhVien = new SinhVien({ id, name });
//         await newSinhVien.save();
//         res.redirect('/sinhvien');
//     } catch (error) {
//         res.status(500).json({ error: 'Error adding student' });
//     }
// });

// module.exports = router;

// Code Thầy
// const express = require('express');
// const router = express.Router();
// const SinhVien = require('../models/sinhVienModels');

//GET
// router.get('/', async (req,res)=>{ //khi nguoi dung goi localhost:3000/
//     try {
//         const sinhViens =  await SinhVien.find();//lay tat ca sinh vien co trong bang du lieu
//         //res.json(sinhviens);//tra ve json
//         res.render('sinhViens',{ sinhViens: sinhViens });//tra ve file ejs
//         console.log(sinhViens);//ghi ra log neu can
//     } catch (err){
//         console.error(err);//in ra loi
//         res.status(500).json({error: 'Khong ket noi duoc voi server'});
//     }
// });
// //POST: tao moi 1 sinh vien
// //http://localhost:3000/sinhvien
// router.post('/', async (req,res)=>{
//     try{
//         const {id,name}=req.body; //nhap id, name
//         const sinhVien1=new SinhVien({id,name});//tao doi tuong sv1 voi 2 gia tri nhap vao
//         await sinhVien1.save();//luu vao csdl
//         res.status(201).json(sinhVien1);//tra ve ket qua cho nguoi dung biet
//         console.log(sinhVien1);
//     } catch(err){
//         console.error(err);
//         res.status(500).json({error : "khong ket noi duoc voi server"});
//     }
// });
// //PUT: cap nhat thong tin sinh vien
// //http://localhost:3000/sinhvien/:_id
// router.put('/:_id',async (req,res)=>{
//     try {
//         const { _id }=req.params;//nhan tham so truyen
//         const {name,id}=req.body;//lay noi dung nguoi dung nhap
//         //thuc hien update
//         const updatedSinhVien=await sinhvien.findByIdAndUpdate(_id,{id,name},{new: true});
//         res.json(updatedSinhVien);//tra ket qua cho nguoi dung
//         console.log(updatedSinhVien);//in ra ket qua
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: "Khong ket noi duoc voi server"});
//     }
// });
// module.exports=router;

// Rút ngắn code
const express = require('express');
const router = express.Router();
const SinhVien = require('../models/sinhVienModels');

// router lấy danh sách SV và hiển thị form
router.get('/', async (req, res) => {
    try {
        const sinhViens = await SinhVien.find();
        res.render('sinhViens', { sinhViens: sinhViens, sinhVienToEdit: null });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Cannot connect to Server' });
    }
});

// Thêm dữ liệu sinh viên
router.post('/', async (req, res) => {
    const { id, name } = req.body;
    try {
        const newSinhVien = new SinhVien({ id, name });
        await newSinhVien.save();
        res.redirect('/sinhvien');
    } catch (error) {
        res.status(500).json({ error: 'Error adding student' });
    }
});

// Routers edit SV
router.get('/edit/:id', async (req, res) => {
    try {
        const sinhVien = await SinhVien.findById(req.params.id);
        const sinhViens = await SinhVien.find();
        res.render('sinhViens', { sinhViens: sinhViens, sinhVienToEdit: sinhVien });
    } catch (error) {
        res.status(500).json({ error: 'Cannot connect to Server' });
    }
});

// Logic POST Edit SV
router.post('/edit/:id', async (req, res) => {
    const { name, id } = req.body;
    try {
        const updatedSinhVien = await SinhVien.findByIdAndUpdate(req.params.id, { name, id }, { new: true });
        if (!updatedSinhVien) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.redirect('/sinhvien');
    } catch (error) {
        res.status(500).json({ error: 'Error updating student' });
    }
});

module.exports = router;

