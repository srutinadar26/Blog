-- Add missing columns to poems table
ALTER TABLE poems ADD COLUMN IF NOT EXISTS excerpt TEXT;
UPDATE poems SET excerpt = preview WHERE excerpt IS NULL AND preview IS NOT NULL;

-- Add missing columns to thoughts table
ALTER TABLE thoughts ADD COLUMN IF NOT EXISTS excerpt TEXT;
UPDATE thoughts SET excerpt = preview WHERE excerpt IS NULL AND preview IS NOT NULL;

-- Add missing columns to books table
ALTER TABLE books ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 5;
ALTER TABLE books ADD COLUMN IF NOT EXISTS review TEXT;
UPDATE books SET excerpt = preview WHERE excerpt IS NULL AND preview IS NOT NULL;
UPDATE books SET review = description WHERE review IS NULL AND description IS NOT NULL;

-- Add missing column to messages table
ALTER TABLE messages ADD COLUMN IF NOT EXISTS subject TEXT;
