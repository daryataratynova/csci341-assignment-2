SELECT "Disease".disease_code, "Disease".description FROM "Disease" 
INNER JOIN "Discover" ON "Discover".disease_code = "Disease".disease_code 
WHERE "Disease".pathogen = 'bacteria' AND "Discover".first_enc_date < '1990-01-01' ;