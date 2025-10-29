INSERT INTO experiences (
    title,
    description,
    about,
    starting_price,
    max_count,
    location,
    image_url
) VALUES 
(
    'Mountain Hiking Adventure',
    'Experience the thrill of mountain hiking with expert guides.',
    'Join us for an exciting mountain hiking adventure. Our experienced guides will lead you through scenic trails, teaching you about local flora and fauna while ensuring your safety.',
    49.99,
    12,
    'Rocky Mountains',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa'
),
(
    'Beach Yoga Retreat',
    'Relax and rejuvenate with beachside yoga sessions.',
    'Start your day with calming yoga sessions by the beach. Perfect for all skill levels, our instructors focus on mindfulness and proper technique.',
    39.99,
    20,
    'Sunny Beach',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
);

INSERT INTO slots (
    experience_id,
    date,
    time,
    price,
    capacity,
    booked
) VALUES 
(1, CURRENT_DATE + 1, '09:00', 49.99, 12, 0),
(1, CURRENT_DATE + 1, '14:00', 49.99, 12, 0),
(1, CURRENT_DATE + 2, '09:00', 54.99, 12, 0),
(2, CURRENT_DATE + 1, '07:00', 39.99, 20, 0),
(2, CURRENT_DATE + 1, '17:00', 39.99, 20, 0),
(2, CURRENT_DATE + 2, '07:00', 44.99, 20, 0);

INSERT INTO promo_codes (
    code,
    discount_amount,
    valid_from,
    valid_until,
    max_uses,
    times_used
) VALUES 
('SAVE10', 10.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days', 100, 0),
('FLAT100', 100.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days', 50, 0);