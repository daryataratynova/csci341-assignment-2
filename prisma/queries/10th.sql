SELECT cname
FROM "Record"
GROUP BY cname
ORDER BY MAX(total_patients) DESC
LIMIT 5;
