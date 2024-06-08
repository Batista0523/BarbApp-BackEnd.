\c barbapp;
-- Insert sample users
INSERT INTO users (
        name,
        username,
        password,
        email,
        role,
        profile_info,
        phone_number,
        address
    )
VALUES (
        'John Doe',
        'barber1',
        'hashed_password1',
        'barber1@example.com',
        'barber',
        'Experienced barber with 10 years of experience',
        '123-456-7890',
        '123 Barber St, Barberville'
    ),
    (
        'Jane Smith',
        'barber2',
        'hashed_password2',
        'barber2@example.com',
        'barber',
        'Specialist in modern haircuts',
        '098-765-4321',
        '456 Hair Ave, Hairtown'
    ),
    (
        'Alice Johnson',
        'customer1',
        'hashed_password3',
        'customer1@example.com',
        'customer',
        'Regular customer',
        '555-555-5555',
        '789 Customer Rd, Customercity'
    ),
    (
        'Bob Brown',
        'customer2',
        'hashed_password4',
        'customer2@example.com',
        'customer',
        'First time customer',
        '444-444-4444',
        '101 Customer Blvd, Customertown'
    );
-- Insert sample services
INSERT INTO services (barber_id, service_name, price)
VALUES (1, 'Haircut', 35.00),
    (1, 'Fade', 10.00),
    (1, 'Eyebrow Trim', 30.00),
    (2, 'Beard Trim', 20.00),
    (2, 'Shampoo and Style', 25.00);




-- Insert sample appointments
INSERT INTO appointments (
        customer_id,
        barber_id,
        service_id,
        appointment_date,
        appointment_time,
        status
    )
VALUES (3, 1, 1, '2024-06-01', '10:00:00', 'scheduled'),
    (3, 2, 4, '2024-06-02', '11:00:00', 'scheduled'),
    (4, 1, 2, '2024-06-03', '12:00:00', 'scheduled'),
    (4, 2, 5, '2024-06-04', '13:00:00', 'scheduled');





    
-- Insert sample reviews
INSERT INTO reviews (customer_id, barber_id, rating, review_text)
VALUES (3, 1, 5, 'Excellent haircut! Highly recommend.'),
    (3, 2, 4, 'Great service but a bit expensive.'),
    (4, 1, 3, 'Average experience.'),
    (4, 2, 5, 'Loved the beard trim!');