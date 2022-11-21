UPDATE "Users"
SET salary = 2*salary
WHERE "Users".email IN (
    SELECT "Record".email
        FROM "Record" 
        WHERE "Record".disease_code = 'U07.1'
        GROUP BY "Record".email HAVING COUNT("Record".cname) > 3
);