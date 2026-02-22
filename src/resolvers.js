import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Employee from "./models/Employee.js";

const resolvers = {
    Query: {
        async login(_, { input }) {
            const { usernameOrEmail, password } = input;

            const user = await User.findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
            });

            if (!user) {
                return { success: false, message: "Invalid password", user: null };
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return { success: false, message: "Invalid password", user: null };
            }

            return { success: true, message: "Login successful", user };
        },

        async employees() {
            const employees = await Employee.find();
            return { success: true, message: "Employees fetched", employees };
        },

        async employeeById(_, { id }) {
            const employee = await Employee.findById(id);
            if (!employee) return { success: false, message: "Not found", employee: null };
            return { success: true, message: "Employee fetched", employee };
        },

        async employeesByDesignationOrDepartment(_, { designation, department }) {
            if (!designation && !department) {
                return {
                    success: false,
                    message: "Please provide designation or department",
                    employees: []
                };
            }

            const filter = {};
            if (designation) filter.designation = designation;
            if (department) filter.department = department;

            const employees = await Employee.find(filter);
            return { success: true, message: "Employees fetched", employees };
        }
    },

    Mutation: {
        async signup(_, { input }) {
            const { username, email, password } = input;

            const exists = await User.findOne({ $or: [{ username }, { email }] });
            if (exists) throw new Error("User already exists");

            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashed });

            return { success: true, message: "Signup successful", user };
        },

        async addEmployee(_, { input }) {
            if (input.salary < 1000) throw new Error("Salary must be >= 1000");

            const employee = await Employee.create({
                ...input,
                employee_photo: input.employee_photo || null
            });

            return { success: true, message: "Employee created", employee };
        },

        async updateEmployee(_, { id, input }) {
            if (input.salary && input.salary < 1000) {
                throw new Error("Salary must be >= 1000");
            }

            const employee = await Employee.findByIdAndUpdate(
                id,
                { ...input },
                { new: true }
            );

            if (!employee) {
                return { success: false, message: "Employee Not found", employee: null };
            }

            return { success: true, message: "Employee Updated", employee };
        },

        async deleteEmployee(_, { id }) {
            const employee = await Employee.findByIdAndDelete(id);
            if (!employee) return { success: false, message: "Employee Not found", employee: null };
            return { success: true, message: "Employee Deleted", employee };
        }
    }
};

export default resolvers;
