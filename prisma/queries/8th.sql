CREATE INDEX idx_pathogen
ON "Disease"(pathogen);

To check:
SELECT
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    tablename = 'Disease';