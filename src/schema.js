import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    success: Boolean!
    message: String!
    user: User
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
  }

  type EmployeeResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  type EmployeeListResponse {
    success: Boolean!
    message: String!
    employees: [Employee!]
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
  }

  input EmployeeUpdateInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: Date
    department: String
    employee_photo: String
  }

  type Query {
    login(input: LoginInput!): AuthPayload!
    employees: EmployeeListResponse!
    employeeById(id: ID!): EmployeeResponse!
    employeesByDesignationOrDepartment(
      designation: String
      department: String
    ): EmployeeListResponse!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    addEmployee(input: EmployeeInput!): EmployeeResponse!
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): EmployeeResponse!
    deleteEmployee(id: ID!): EmployeeResponse!
  }
`;

export default typeDefs;
