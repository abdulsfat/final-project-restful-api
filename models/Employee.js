// Import database
const db = require("../config/database");

// Membuat kelas Employee
class Employee {
  // Mendapatkan semua data pegawai dari database
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employees";
      db.query(sql, (sql, results) => {
        resolve(results);
      });
    });
  }

  // Menambahkan pegawai baru ke database
  static create(Employee) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO employees SET ?";
      db.query(sql, Employee, (err, results) => {
        const newEmployeeId = results.insertId;
        this.all()
          .then((allEmployees) => {
            const newEmployee = allEmployees.find((employee) => employee.id === newEmployeeId);
            resolve(newEmployee);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  // Memperbarui data pegawai berdasarkan ID
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE employees SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const updatedEmployee = await this.find(id);
    return updatedEmployee;
  }

  // Menghapus data pegawai berdasarkan ID
  static async delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM employees WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Mencari data pegawai berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  // Mencari pegawai berdasarkan nama
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE name = ?`;
      db.query(sql, name, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  // Mendapatkan pegawai berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employees WHERE status = ?";
      db.query(sql, [status], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

// Ekspor kelas Employee
module.exports = Employee;
