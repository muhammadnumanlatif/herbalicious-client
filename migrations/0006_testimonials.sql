CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    content TEXT NOT NULL,
    product_id TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
