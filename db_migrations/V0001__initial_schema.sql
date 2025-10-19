-- Create tables for kennel management system

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'guest',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dogs (producers) table
CREATE TABLE IF NOT EXISTS dogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    titles TEXT[],
    achievements TEXT,
    parents TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Puppies/Litters table
CREATE TABLE IF NOT EXISTS litters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    born_date DATE NOT NULL,
    available INTEGER DEFAULT 0,
    parents TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery photos table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    title VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Support messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2b$10$rZ3qJZjKxfU5h.2YNYx3KeGNb9B3qC3PqM8K5x5x5x5x5x5x5x5x5', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample data
INSERT INTO dogs (name, gender, breed, titles, achievements, parents, image_url) VALUES
('Аллегра Империал Голд', 'Сука', 'Немецкая овчарка', 
 ARRAY['Чемпион России', 'Юный Чемпион РКФ'],
 'Отличные рабочие качества, идеальный экстерьер',
 'Отец: INT CH Quantum v. Arlett / Мать: CH Bella Imperio',
 'https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/87fc32c6-a399-432c-b6c7-a6f86626700b.jpg'),
('Барон фон Штольценберг', 'Кобель', 'Немецкая овчарка',
 ARRAY['Интерчемпион', 'Чемпион РКФ', 'Чемпион НКП'],
 'Производитель года 2023, отличная передача качеств потомству',
 'Отец: V Vegas Du Haut Mansard / Мать: V Yana Nivas',
 'https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/b137df31-139e-4e22-a433-e29d969e96f8.jpg');

INSERT INTO litters (name, born_date, available, parents, description, image_url) VALUES
('Помет А', '2024-08-15', 3,
 'Барон фон Штольценберг × Аллегра Империал Голд',
 'Высокопородные щенки с отличными данными. Документы РКФ, клеймо, ветпаспорт.',
 'https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/81ffe7bd-b42c-4aab-9038-41e0f9d7ca92.jpg');

INSERT INTO gallery (image_url, title) VALUES
('https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/87fc32c6-a399-432c-b6c7-a6f86626700b.jpg', 'Выставка 2024'),
('https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/b137df31-139e-4e22-a433-e29d969e96f8.jpg', 'Тренировка'),
('https://cdn.poehali.dev/projects/03365462-7cb6-4dfd-901d-b4654a3194cd/files/81ffe7bd-b42c-4aab-9038-41e0f9d7ca92.jpg', 'Щенки');