SELECT "PublicServant".email, "Users".name, "PublicServant".department
FROM "Users"
INNER JOIN "PublicServant" ON "PublicServant".email = "Users".email
INNER JOIN "Record" ON "Record".email = "Users".email
WHERE "Record".total_patients < 999999 AND "Record".total_patients > 100000;