import mongoose, { Schema, mongo } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const data = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    nama: { type: String, default: null },
    nik:  { type: Number, default: null },
    alamat: { type: String, default: null },
    jabatan: { type: String, default: null },
    no: { type: Number, default: null },
    gender: { type: String, default: null },
    waktu: { type: Date, default: Date.now },
    foto: {
        type: [String], // Mengubah menjadi array dari string
        required: true
    },

});
export const DataModel = mongoose.model('DataDataPegawai', data, 'DataDataPegawai');





