const phs = require("./PshModel.js");

const getphs = async (req, res) => {
  try {
    const pasien = await phs.find();
    res.json(pasien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getphsById = async (req, res) => {
  try {
    const pasien = await phs.findById(req.params.id);
    res.json(pasien);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const savephs = async (req, res) => {
  const newphs = new phs(req.body); // Use a different variable name
  console.log(req.body);
  try {
    const insertedphs = await newphs.save();
    res.status(201).json(insertedphs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatephs = async (req, res) => {
  try {
    const updatedphs = await phs.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedphs);
  } catch (error) {
    res.status(400).json({ message: 'Gagal mengupdate data pasien', error: error.message });
  }
};

const deletephs = async (req, res) => {
  try {
    const deletedphs = await phs.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedphs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getphs,
  getphsById,
  savephs,
  updatephs,
  deletephs,
};
