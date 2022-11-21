SELECT 
"Users".cname, 
AVG("Users".salary)
FROM "Doctor"
INNER JOIN "Users" ON "Doctor".email = "Users".email
INNER JOIN "Specialize" ON "Specialize".email = "Doctor".email
INNER JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
WHERE "DiseaseType".description = 'virology'
GROUP BY "Users".cname;
