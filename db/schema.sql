-- Connect to database
\c barbapp;

-- Drop tables if they exist
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS barber_schedules CASCADE;
-- Drop the indexes if they exist
DROP INDEX IF EXISTS idx_user_role;
DROP INDEX IF EXISTS idx_appointment_date;
DROP INDEX IF EXISTS idx_appointment_time;
DROP INDEX IF EXISTS idx_review_rating;

-- Users table to store customer and barber profiles
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('customer', 'barber')) NOT NULL,
    profile_info TEXT,
    phone_number VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on role column
CREATE INDEX idx_user_role ON users(role);

-- Services table to store services offered by barbers
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    barber_id INT REFERENCES users(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Appointments table to store booking details
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    barber_id INT REFERENCES users(id) ON DELETE CASCADE,
    service_id INT REFERENCES services(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(50) CHECK(status IN ('scheduled', 'completed', 'canceled')) DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on appointment_date column
CREATE INDEX idx_appointment_date ON appointments(appointment_date);

-- Index on appointment_time column
CREATE INDEX idx_appointment_time ON appointments(appointment_time);




-- Table to store barber schedules
CREATE TABLE barber_schedules (
    id SERIAL PRIMARY KEY,
    barber_id INT REFERENCES users(id) ON DELETE CASCADE,
    day_of_week VARCHAR(50) CHECK(day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on barber_id and day_of_week columns
CREATE INDEX idx_barber_schedule ON barber_schedules(barber_id, day_of_week);


-- Reviews table to store customer reviews and ratings
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    barber_id INT REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK(rating BETWEEN 1 AND 5) NOT NULL,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on rating column
CREATE INDEX idx_review_rating ON reviews(rating);
