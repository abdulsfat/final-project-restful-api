// import Model Employee
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  // TODO 1: Tampilkan data employee
async index(req, res) {
    try {
        const employees = await Employee.all();
        const data = {
            message: "The request succeeded",
            data: employees,
        };
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// TODO 1: END

// TODO 2: Add data employee
async store(req, res) {
    const { name, gender, phone, address, email } = req.body;

    try {
        const employee = await Employee.create(req.body);
        const data = {
            message: "Resource created",
            data: employee,
        };

        res.status(201).json(data);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(422).json({ error: "Unprocessable Entity" });
    }
}
// TODO 2: END

// TODO 3: Edit data employee
async update(req, res) {
  const { id } = req.params;
  const { name, address, gender, phone, email } = req.body;

  const updatedData = { name, address, gender, phone, email };

  try {
      const updatedEmployee = await Employee.update(id, updatedData);

      if (updatedEmployee) {
          const data = {
              message: `Mengedit data employee id ${id}`,
              data: updatedEmployee,
          };
          res.status(200).json(data);
      } else {
          const data = {
              message: "Resource not found",
          };
          res.status(404).json(data);
      }
  } catch (error) {
      console.error("Error updating employee:", error);
      res.status(422).json({ error: "Unprocessable Entity" });
  }
}

// TODO 3: END

// TODO 4: Delete data employee
async destroy(req, res) {
    const { id } = req.params;

    try {
        const employee = await Employee.find(id);

        if (employee) {
            await Employee.delete(id);
            const data = {
                message: "The request succeeded",
            };
            res.status(204).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(422).json({ error: "Unprocessable Entity" });
    }
}
// TODO 4: END

// TODO 5: GET one data employee
async show(req, res) {
    const { id } = req.params;

    try {
        const employee = await Employee.find(id);

        if (employee) {
            const data = {
                message: "The request succeeded",
                data: employee,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(422).json({ error: "Unprocessable Entity" });
    }
}
// TODO 5: END

// TODO 6: GET search data employee by name
async search(req, res) {
    const { name } = req.params;

    try {
        const employees = await Employee.search(name);

        if (employees.length > 0) {
            const data = {
                message: "The request succeeded",
                data: employees,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    } catch (error) {
        console.error("Error searching employees:", error);
        res.status(422).json({ error: "Unprocessable Entity" });
    }
}
// TODO 6: END

// TODO 7: GET active data employee
async active(req, res) {
    try {
        const employees = await Employee.findByStatus('active');

        if (employees.length > 0) {
            const data = {
                message: "The request succeeded",
                data: employees,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    } catch (error) {
        console.error("Error fetching active employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// TODO 7: END

// TODO 8: GET inactive data employee
async inactive(req, res) {
    try {
        const employees = await Employee.findByStatus('inactive');

        if (employees.length > 0) {
            const data = {
                message: "The request succeeded",
                data: employees,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    } catch (error) {
        console.error("Error fetching inactive employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// TODO 8: END

// TODO 9: GET terminated data employee
async terminated(req, res) {
    try {
        const employees = await Employee.findByStatus('terminated');

        if (employees.length > 0) {
            const data = {
                message: "The request succeeded",
                data: employees,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    } catch (error) {
        console.error("Error fetching terminated employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// TODO 9: END

}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
