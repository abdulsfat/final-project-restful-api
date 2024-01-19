// import Model Employee
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  // TODO 1: Tampilkan data employee
  async index(req, res) {
    const employees = await Employee.all();

    const data = {
      message: "Menampilkan data pegawai",
      data: employees,
    };

    res.status(200).json(data);
  }
  // TODO 1: END

  // TODO 2: Add data employee
  async store(req, res) {
    const { name, gender, phone, address, email } = req.body;
    const employees = await Employee.create(req.body);
    const data = {
      message: "Menambahkan data pegawai",
      data: employees,
    };

    res.status(201).json(data);
  }
  // TODO 2: END

  // TODO 3: Edit data employee
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      // Panggil fungsi update dari model untuk mengupdate data di database
      const updatedEmployee = await Employee.update(id, { name });

      const data = {
        message: `Mengedit data employee id ${id}, nama ${name}`,
        data: updatedEmployee,
      };

      res.json(data);
    } catch (error) {
      // Tangani kesalahan jika terjadi kesalahan dalam pembaruan
      console.error("Error updating employee:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // TODO 3: END

  // TODO 4: Delete data employee
  async destroy(req, res) {
    const { id } = req.params;

    /**
     * cari id
     * jika ada, hapus data
     * jika tidak, kirim data tidak ada
     */

    const employee = await Employee.find(id);

    if (employee) {
      // hapus data
      await Employee.delete(id);
      const data = {
        message: "Menghapus data pegawai",
      };

      res.status(200).json(data);
    } else {
      // data tidak ada
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }
  }
  // TODO 4: END

  // TODO 5: GET one data employee
  async show(req, res) {
    /**
     * cari id
     * jika ada, kirim datanya
     * jika tidak, kirim data tidak ada
     */
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
      const data = {
        message: "Menampilkan detail data pegawai",
        data: employee,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Data tidak ada",
      };

      res.status(404).json(data);
    }
  }
  // TODO 5: END

  // TODO 6: GET search data employee by name
  // TODO 7: GET active data employee
  // TODO 8: GET inactive data employee
  // TODO 9: GET terminated data employee
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
