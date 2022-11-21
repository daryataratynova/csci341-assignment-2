SELECT "PublicServant".department, COUNT("PublicServant".email)
    FROM "PublicServant" WHERE "PublicServant".email IN (
        SELECT "PublicServant".email
        FROM "Record" 
        INNER JOIN "PublicServant" ON "PublicServant".email = "Record".email
        WHERE "Record".disease_code = 'U07.1'
        GROUP BY "PublicServant".email HAVING COUNT("Record".cname) > 1
    ) GROUP BY "PublicServant".department;