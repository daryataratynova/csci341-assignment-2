from sqlalchemy import create_engine, text
import pandas as pd

engine = create_engine('postgresql://postgres:postgrespw@localhost:55000/csci341')
connection = engine.connect()

def query_1():
    query = text(
    """
    SELECT "Disease".disease_code, "Disease".description FROM "Disease" 
    INNER JOIN "Discover" ON "Discover".disease_code = "Disease".disease_code 
    WHERE "Disease".pathogen = 'bacteria' AND "Discover".first_enc_date < '1990-01-01' ;

    """
    )
    print(pd.read_sql(query, connection))

def query_2():
    query = text(
    """
    SELECT DISTINCT"Users".name, "Users".surname, "Doctor".degree
    FROM "Users"
    INNER JOIN "Doctor" ON "Doctor".email = "Users".email
    INNER JOIN "Specialize" ON "Specialize".email = "Doctor".email
    INNER JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
    WHERE "DiseaseType".description != 'infectious';
    """
    )
    print(pd.read_sql(query, connection))

def query_3():
    query = text(
    """
    SELECT "Users".name, "Users".surname, "Doctor".degree
    FROM "Users"
    INNER JOIN "Doctor" ON "Doctor".email = "Users".email
    INNER JOIN "Specialize" ON "Specialize".email = "Doctor".email
    INNER JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
    GROUP BY "Users".name, "Users".surname, "Doctor".degree
    HAVING COUNT("DiseaseType".description) >2;

    """
    )
    print(pd.read_sql(query, connection))


def query_4():
    query = text(
    """
    SELECT 
    "Users".cname, 
    AVG("Users".salary)
    FROM "Doctor"
    INNER JOIN "Users" ON "Doctor".email = "Users".email
    INNER JOIN "Specialize" ON "Specialize".email = "Doctor".email
    INNER JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
    WHERE "DiseaseType".description = 'virology'
    GROUP BY "Users".cname;


    """
    )
    print(pd.read_sql(query, connection))

def query_5():
    query = text(
    """
    SELECT "PublicServant".department, COUNT("PublicServant".email)
    FROM "PublicServant" WHERE "PublicServant".email IN (
        SELECT "PublicServant".email
        FROM "Record" 
        INNER JOIN "PublicServant" ON "PublicServant".email = "Record".email
        WHERE "Record".disease_code = 'U07.1'
        GROUP BY "PublicServant".email HAVING COUNT("Record".cname) > 1
    ) GROUP BY "PublicServant".department;
    """
    )
    print(pd.read_sql(query, connection))

def query_6():
    query = text(
    """
    UPDATE "Users"
    SET salary = 2*salary
    WHERE "Users".email IN (
        SELECT "Record".email
            FROM "Record" 
            WHERE "Record".disease_code = 'U07.1'
            GROUP BY "Record".email HAVING COUNT("Record".cname) > 3
    );
    """
    )
    connection.execute(query)
    print('UPDATE 1')

def query_7():
    query = text(
    """
    DELETE FROM "Users"
    WHERE LOWER(name) LIKE '%bek%' OR LOWER(name) LIKE '%gul%';
    """
    )
    connection.execute(query)
    print('DELETE 1')

#   WILL FAIL IF INDEX ALREADY EXIST. DON'T RUN SECOND TIME!!!!
def query_8():
    query = text(
    """
    CREATE INDEX idx_pathogen
    ON "Disease"(pathogen);

    """
    )
    connection.execute(query)
    print('CREATE 1')

def query_9():
    query = text(
    """
    SELECT "PublicServant".email, "Users".name, "PublicServant".department
    FROM "Users"
    INNER JOIN "PublicServant" ON "PublicServant".email = "Users".email
    INNER JOIN "Record" ON "Record".email = "Users".email
    WHERE "Record".total_patients < 999999 AND "Record".total_patients > 100000;
    
    """
    )
    print(pd.read_sql(query, connection))

def query_10():
    query = text(
    """
    SELECT cname
    FROM "Record"
    GROUP BY cname
    ORDER BY MAX(total_patients) DESC
    LIMIT 5;
    """
    )
    print(pd.read_sql(query, connection))

def query_11():
    query = text(
    """
    SELECT description,
    COALESCE(patients - deaths, 0) as patients_treated
    FROM (
    SELECT "DiseaseType".description, SUM("Record".total_patients) as patients, SUM("Record".total_deaths) as deaths
    FROM "DiseaseType"
    LEFT JOIN "Disease" on "DiseaseType".id = "Disease".id 
    LEFT JOIN "Record" on "Record".disease_code = "Disease".disease_code
    GROUP BY "DiseaseType".description) as x;
    """
    )
    print(pd.read_sql(query, connection))

queries = [ query_1, query_2, query_3, query_4, query_5, query_6, query_7, query_8, query_9, query_10, query_11]

for i in range(1, 12):
    print('QUERY', i)
    queries[i-1]()
    print('--------------------------------')