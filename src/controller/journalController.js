const Journal = require('../model/journalModel');
const predictFeeling = require('./predictFeeling');

// Mengambil semua jurnal
const getAllJournal = async (req, res) => {
    try {
        const journals = await Journal.find({});
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mengambil jurnal berdasarkan ID
const getJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findById(id);
        if (!journal) {
            return res.status(404).json({ message: 'Cannot find any journal with that ID' });
        }
        res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambahkan jurnal
const addJournal = async (req, res) => {
    try {
        const {text} = req.body;
        // Lakukan prediksi perasaan menggunakan predictFeeling
        const { label, suggestion } = await predictFeeling(text);
        
        // Simpan jurnal ke dalam database
        const newJournal = new Journal({
            text,
            feeling: label, // Simpan label perasaan sebagai bagian dari jurnal
            suggestion // Simpan saran sebagai bagian dari jurnal (opsional)
        });
        await newJournal.save(); // Simpan jurnal ke dalam database
        // Kirim respons ke klien
        res.json({ journal: newJournal });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menghapus jurnal berdasarkan ID
const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findByIdAndDelete(id);
        if (!journal) {
            return res.status(404).json({ message: 'Cannot find any journal with that ID' });
        }
        res.status(200).json({ message: 'Journal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllJournal, getJournal, addJournal, deleteJournal };
