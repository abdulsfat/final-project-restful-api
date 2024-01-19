const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const { validateCreateEmployee, validateUpdateEmployee } = require('../validators');

const router = express.Router();

// Route sambutan
router.get("/", (req, res) => {
  res.send("Hello HRD API Express");
});

// Routing untuk employee
router.get("/employees", EmployeeController.index); // Mendapatkan daftar semua pegawai
router.post("/employees", validateCreateEmployee, EmployeeController.store); // Menambahkan pegawai baru
router.put("/employees/:id", validateUpdateEmployee, EmployeeController.update); // Mengupdate informasi pegawai
router.delete("/employees/:id", EmployeeController.destroy); // Menghapus pegawai berdasarkan ID
router.get("/employees/:id", EmployeeController.show); // Mendapatkan detail pegawai berdasarkan ID
router.get("/employees/search/:name", EmployeeController.search); // Mencari pegawai berdasarkan nama
router.get("/employees/status/active", EmployeeController.active); // Mendapatkan daftar pegawai dengan status aktif
router.get("/employees/status/inactive", EmployeeController.inactive); // Mendapatkan daftar pegawai dengan status tidak aktif
router.get("/employees/status/terminated", EmployeeController.terminated); // Mendapatkan daftar pegawai dengan status terminated

module.exports = router;
