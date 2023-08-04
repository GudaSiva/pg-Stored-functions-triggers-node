CREATE DATABASE employee_demo_db;

\c employee_demo_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  salary NUMERIC(10, 2) NOT NULL,
  department_id INT REFERENCES departments(id) ON DELETE CASCADE
);

-- Create a new column 'last_updated' with timestamp data type
ALTER TABLE employees ADD COLUMN last_updated TIMESTAMP;

-- Create a trigger function
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER employees_update_trigger
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION update_last_updated();
