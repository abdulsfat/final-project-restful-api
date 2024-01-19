// Import Model Employee
const Employee = require("../models/Employee");
const { validationResult } = require("express-validator");

// Class untuk mengelola logika bisnis terkait pegawai
class EmployeeController {
  // TODO 1: Tampilkan data employee
  async index(req, res) {
    try {
      // Mendapatkan semua pegawai
      const employees = await Employee.all();

      if (employees.length > 0) {
        // Jika ada pegawai, kirim data pegawai
        const data = {
          message: "Get All Resource",
          data: employees,
        };
        res.status(200).json(data);
      } else {
        // Jika tidak ada pegawai, kirim pesan bahwa data kosong
        const data = {
          message: "Data is empty",
        };
        res.status(200).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pengambilan data
      console.error("Error fetching employees:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // TODO 1: END

  // TODO 2: Add data employee
  async store(req, res) {
    // Validasi input menggunakan express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Jika validasi gagal, kirim pesan kesalahan validasi
      const errorMessages = errors.array().map((error) => error.msg);
      const data = {
        message: "All fields must be filled correctly",
        errors: errorMessages,
      };
      return res.status(422).json(data);
    }

    const { name, gender, phone, address, email } = req.body;

    try {
      // Menambahkan pegawai baru
      const employee = await Employee.create(req.body);
      const data = {
        message: "Resource is added successfully",
        data: employee,
      };

      res.status(201).json(data);
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam penambahan pegawai
      console.error("Error creating employee:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // TODO 2: END

  // TODO 3: Edit data employee
  async update(req, res) {
    // Validasi input menggunakan express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Jika validasi gagal, kirim pesan kesalahan validasi
      const errorMessages = errors.array().map((error) => error.msg);
      const data = {
        message: "All fields must be filled correctly",
        errors: errorMessages,
      };
      return res.status(422).json(data);
    }

    const { id } = req.params;
    const { name, address, gender, phone, email, status } = req.body;

    const updatedData = { name, address, gender, phone, email, status };

    try {
      // Mengupdate informasi pegawai
      const updatedEmployee = await Employee.update(id, updatedData);

      if (updatedEmployee) {
        // Jika berhasil diupdate, kirim data pegawai yang diupdate
        const data = {
          message: "Resource is update successfully",
          data: updatedEmployee,
        };
        res.status(200).json(data);
      } else {
        // Jika pegawai tidak ditemukan, kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pembaruan pegawai
      console.error("Error updating employee:", error);
      res.status(422).json({ error: "Unprocessable Entity" });
    }
  }
  // TODO 3: END

  // TODO 4: Delete data employee
  async destroy(req, res) {
    const { id } = req.params;

    try {
      // Cari pegawai berdasarkan ID
      const employee = await Employee.find(id);

      if (employee) {
        // Jika pegawai ditemukan, hapus pegawai
        await Employee.delete(id);
        const data = {
          message: "Resource is delete successfully",
        };
        res.status(200).json(data);
      } else {
        // Jika pegawai tidak ditemukan, kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam penghapusan pegawai
      console.error("Error deleting employee:", error);
      res.status(422).json({ error: "Unprocessable Entity" });
    }
  }
  // TODO 4: END

  // TODO 5: GET one data employee
  async show(req, res) {
    const { id } = req.params;

    try {
      // Cari pegawai berdasarkan ID
      const employee = await Employee.find(id);

      if (employee) {
        // Jika pegawai ditemukan, kirim data pegawai
        const data = {
          message: "Get Detail Resource",
          data: employee,
        };
        res.status(200).json(data);
      } else {
        // Jika pegawai tidak ditemukan, kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pengambilan data pegawai
      console.error("Error fetching employee:", error);
      res.status(422).json({ error: "Unprocessable Entity" });
    }
  }
  // TODO 5: END

  // TODO 6: GET search data employee by name
  async search(req, res) {
    const { name } = req.params;

    try {
      // Cari pegawai berdasarkan nama
      const employees = await Employee.search(name);

      if (employees) {
        // Jika pegawai ditemukan, kirim data pegawai
        const data = {
          message: "Get searched resource",
          data: employees,
        };
        res.status(200).json(data);
      } else {
        // Jika pegawai tidak ditemukan, kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pencarian pegawai
      console.error("Error searching employees:", error);
      res.status(422).json({ error: "Unprocessable Entity" });
    }
  }
  // TODO 6: END

  // TODO 7: GET active data employee
  async active(req, res) {
    try {
      // Mendapatkan pegawai dengan status "active"
      const employees = await Employee.findByStatus("active");

      // Filter pegawai yang statusnya "active"
      const activeEmployees = employees.filter((employee) => employee.status === "active");
      const totalActiveEmployees = activeEmployees.length;

      if (totalActiveEmployees > 0) {
        // Jika ada pegawai dengan status "active", kirim data pegawai tersebut
        const data = {
          message: "Get active resource",
          total: totalActiveEmployees,
          data: activeEmployees,
        };
        res.status(200).json(data);
      } else {
        // Jika tidak ada pegawai dengan status "active", kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pengambilan pegawai dengan status "active"
      console.error("Error fetching active employees:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // TODO 7: END

  // TODO 8: GET inactive data employee
  async inactive(req, res) {
    try {
      // Mendapatkan pegawai dengan status "inactive"
      const employees = await Employee.findByStatus("inactive");

      // Filter pegawai yang statusnya "inactive"
      const inactiveEmployees = employees.filter((employee) => employee.status === "inactive");
      const totalInactiveEmployees = inactiveEmployees.length;

      if (totalInactiveEmployees > 0) {
        // Jika ada pegawai dengan status "inactive", kirim data pegawai tersebut
        const data = {
          message: "Get inactive resource",
          total: totalInactiveEmployees,
          data: inactiveEmployees,
        };
        res.status(200).json(data);
      } else {
        // Jika tidak ada pegawai dengan status "inactive", kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pengambilan pegawai dengan status "inactive"
      console.error("Error fetching inactive employees:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // TODO 8: END

  // TODO 9: GET terminated data employee
  async terminated(req, res) {
    try {
      // Mendapatkan pegawai dengan status "terminated"
      const employees = await Employee.findByStatus("terminated");

      // Filter pegawai yang statusnya "terminated"
      const terminatedEmployees = employees.filter((employee) => employee.status === "terminated");
      const totalTerminatedEmployees = terminatedEmployees.length;

      if (totalTerminatedEmployees > 0) {
        // Jika ada pegawai dengan status "terminated", kirim data pegawai tersebut
        const data = {
          message: "Get terminated resource",
          total: totalTerminatedEmployees,
          data: terminatedEmployees,
        };
        res.status(200).json(data);
      } else {
        // Jika tidak ada pegawai dengan status "terminated", kirim pesan bahwa sumber daya tidak ditemukan
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pengambilan pegawai dengan status "terminated"
      console.error("Error fetching terminated employees:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // TODO 9: END
}

// Membuat objek dari kelas EmployeeController
const object = new EmployeeController();

// Ekspor objek EmployeeController
module.exports = object;
