SELECT "Users".name, "Users".surname, "Doctor".degree
FROM "Users"
INNER JOIN "Doctor" ON "Doctor".email = "Users".email
INNER JOIN "Specialize" ON "Specialize".email = "Doctor".email
INNER JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
GROUP BY "Users".name, "Users".surname, "Doctor".degree
HAVING COUNT("DiseaseType".description) >2;
