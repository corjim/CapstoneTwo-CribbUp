-- Delete existing data to prevent duplicates
DELETE FROM favorites;
DELETE FROM users;

--  Insert sample users
INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES 
    ('Ron_doe', 'password123', 'Ron', 'Doe', 'ron.doe@example.com', FALSE),
    ('Henny_smith', 'password456', 'Henny', 'Smith', 'Henny.smith@example.com', FALSE),
    ('admin_user', 'adminpass', 'Admin', 'User', 'admin@example.com', TRUE);

-- Insert favorite properties with full details (Ensure property_id exists in the properties table)
INSERT INTO favorites (user_id, property_id, address, price, image_url, beds, baths, square_feet)
VALUES 
    ('Ron_doe', 10122, '123 Main St, New York, NY', 450000, 'https://example.com/image1.jpg', 3, 2, 1500),
    ('Ron_doe', 10222, '456 Oak Ave, Los Angeles, CA', 750000, 'https://example.com/image2.jpg', 4, 3, 2200),
    ('Henny_smith', 20111, '789 Pine Rd, Miami, FL', 320000, 'https://example.com/image3.jpg', 2, 2, 1200),
    ('Henny_smith', 202233, '1012 Maple Dr, Chicago, IL', 550000, 'https://example.com/image4.jpg', 3, 2, 1800),
    ('admin_user', 30221, '1516 Cedar Ln, Houston, TX', 600000, 'https://example.com/image5.jpg', 5, 4, 3000),
    ('admin_user', 30112, '1718 Birch Ct, San Francisco, CA', 900000, 'https://example.com/image6.jpg', 4, 3, 2500);

-- Verify Insertions
SELECT * FROM users;
SELECT * FROM favorites;
