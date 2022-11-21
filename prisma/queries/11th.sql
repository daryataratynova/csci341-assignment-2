SELECT description,
COALESCE(patients - deaths, 0) as patients_treated
FROM (
SELECT "DiseaseType".description, SUM("Record".total_patients) as patients, SUM("Record".total_deaths) as deaths
FROM "DiseaseType"
LEFT JOIN "Disease" on "DiseaseType".id = "Disease".id 
LEFT JOIN "Record" on "Record".disease_code = "Disease".disease_code
GROUP BY "DiseaseType".description) as x;