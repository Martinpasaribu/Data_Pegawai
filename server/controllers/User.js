import  {  DataModel  }  from "../models/FormsModel.js";
import moment from 'moment'; // Import moment.js jika belum diimpor


export const createdata = async(req, res) =>{
    const { nama, nik, alamat, jabatan, no, gender } = req.body;
    const files = req.files;

    // Ambil URL gambar dari Cloudinary
    const foto = files.map(file => file.path);

    try {
        await DataModel.create({
            nama    : nama,
            nik     : nik,
            alamat  : alamat,
            jabatan : jabatan,
            no      : no,
            gender  : gender,
            foto    : foto, // Menyimpan array dari URL gambar

          
        });
        res.status(201).json({msg: "Data dibuat" });
    } catch (error) {
        res.status(400).json({msg: "Error buat data"});
    }
}


// =========================  GET =============================

export const getdata = async(req, res) =>
    {
        try {
            const data = await DataModel.find({}); // Mengambil hanya UUID pengguna
            res.status(200).json(data); // Mengembalikan array UUID pengguna
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    
    
