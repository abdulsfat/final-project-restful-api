// import database
const db = require("../config/database");

// membuat class Employee
class Employee {

  static all() {
    return new Promise((resolve, reject) => {
        // lakukan query ke db untuk ambil data
        const sql = "SELECT * FROM employees";
        db.query(sql, (sql, results) => {
            resolve(results);
        });
    });
  }

  static create(Employee) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO employees SET ?";
        db.query(sql, Employee, (err, results) => {
          const newEmployeeId = results.insertId;
          this.all()
            .then(allEmployees => {
              const newEmployee = allEmployees.find(employee => employee.id === newEmployeeId);
              resolve(newEmployee);
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }
  
  static async update(id, data) {
    // Memperbarui data
    await new Promise((resolve, reject) => {
      // Query untuk memperbarui data
      const sql = "UPDATE employees SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) {
          reject(err); // Menolak promise jika terjadi kesalahan
        } else {
          resolve(results);
        }
      });
    });

    // Mengambil data berdasarkan id setelah pembaruan
    const updatedEmployee = await this.find(id);
    return updatedEmployee;
  }

  static async delete(id) {
    // query delete
    return new Promise((resolve, reject) => {
        // query sql
        const sql = "DELETE FROM employees WHERE id = ?";
        db.query(sql, id, (err, results) => {
            resolve(results);
        });
    });
  }

  static find(id) {
    // lakukan promise, select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  static search(name) {
    // lakukan promise, select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE name = ?`;
      db.query(sql, name, (err, results) => {
        resolve(results[0]);
      });
    });
  }

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

// export class Employee
module.exports = Employee;
