import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DISEASES = ['degenerative', 'infectious', 'physiological', 'virology',
                'mental', 'cancer', 'hereditary','dermatological', 'allergy', 'deficiency']

const main = async() => {
    await prisma.discover.deleteMany();
    await prisma.disease.deleteMany();
    await prisma.specialize.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.record.deleteMany();
    await prisma.publicServant.deleteMany();
    await prisma.users.deleteMany();
    await prisma.country.deleteMany();
    await prisma.diseaseType.deleteMany();

    //To find ID of all Disease types
    //creating DiseaseType
    const diseases_types = await Promise.all(
    DISEASES.map((str) => {
        return prisma.diseaseType.create({
            data:{
                description: str,
            }
        })
    }));

   const dict_diseases = diseases_types.reduce((acc, disease_type) =>{
        acc[disease_type.description]=disease_type.id;
        return acc;
    }, {});

    //start of doing tasks

    const disease_A37 = await prisma.disease.create({
        data: {
            disease_code: 'A37.0',
            description:'A small, Gram-negative coccobacillus belonging to the genus Bordetella',
            pathogen: 'bacteria',
            id: dict_diseases.infectious
        }
    })

    await prisma.country.create({
        data: {
            cname: 'France',
            population: 67500000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'France',
            disease_code: disease_A37.disease_code,
            first_enc_date: new Date('1789-01-01')

        }
    })


    const disease_D53 = await prisma.disease.create({
        data:{
            disease_code: 'D53.2',
            description:'Disease resulting from a lack of vitamin C (ascorbic acid).[',
            pathogen: 'ascorbic acids',
            id: dict_diseases.deficiency
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'France',
            disease_code: disease_D53.disease_code,
            first_enc_date: new Date('1906-01-01')

        }
    })



    const user = await prisma.users.create({
        data:{
            email:'alexander@gmail.com',
            name: 'Alexander',
            surname: 'Loginov',
            salary: 5000000,
            phone: '+7 777 777 77 77',
            cname: 'France'
        }})
    const doctor = await prisma.doctor.create({
        data:{
            email: user.email,
            degree: 'PhD',
        }
    })

    await prisma.specialize.create({
        data:{
            id: dict_diseases.deficiency,
            email: doctor.email
        }
    })



    await prisma.country.create({
        data: {
            cname: 'Belgium',
            population: 11590000
        }
    })

    const disease_J45 = await prisma.disease.create({
        data:{
            disease_code: 'J45',
            description:'A condition in which your airways narrow',
            pathogen: 'Haemophilus',
            id: dict_diseases.physiological
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'Belgium',
            disease_code: disease_J45.disease_code,
            first_enc_date: new Date('1900-01-01')

        }
    })




    const user_1 = await prisma.users.create({
        data:{
            email:'michael@gmail.com',
            name: 'Michael',
            surname: 'St',
            salary: 3000000,
            phone: '+7 999 777 77 77',
            cname: 'France'
        }})

    const doctor_1 = await prisma.doctor.create({
        data:{
            email: user_1.email,
            degree: 'MD',
        }
    })

    

    await prisma.specialize.create({
        data:{
            id: dict_diseases.physiological,
            email: doctor_1.email
        }
    })

  

    const disease_B20 = await prisma.disease.create({
        data:{
            disease_code: 'B20',
            description:'A chronic, potentially life-threatening condition caused by the human immunodeficiency virus (HIV).',
            pathogen: 'HIV',
            id: dict_diseases.virology
        }
    })


    await prisma.discover.create({
        data:{
            cname: 'Belgium',
            disease_code: disease_B20.disease_code,
            first_enc_date: new Date('1981-01-01')

        }
    })

    
    const user_2 = await prisma.users.create({
        data:{
            email:'sofia@gmail.com',
            name: 'Sofia',
            surname: 'Maria',
            salary: 4400000,
            phone: '+7 000 777 77 77',
            cname: 'Belgium'
        }})

    const doctor_2 = await prisma.doctor.create({
        data:{
            email: user_2.email,
            degree: 'MD',
        }
    })
    
    await prisma.specialize.create({
        data:{
            id: dict_diseases.virology,
            email: doctor_2.email
        }
    })

    

    const user_3 = await prisma.users.create({
        data:{
            email:'nazgula@gmail.com',
            name: 'Nazgula',
            surname: 'Medina',
            salary: 4700000,
            phone: '+7 909 777 77 77',
            cname: 'Belgium'
        }})

    const doctor_3 = await prisma.doctor.create({
        data:{
            email: user_3.email,
            degree: 'MD',
        }
    })
    
    await prisma.specialize.create({
        data:{
            id: dict_diseases.virology,
            email: doctor_3.email
        }
    })






    //5TH

    const disease_U07 = await prisma.disease.create({
        data:{
            disease_code: 'U07.1',
            description:'A contagious disease caused by a virus, the severe acute respiratory syndrome coronavirus 2',
            pathogen: 'SARS-CoV-2',
            id: dict_diseases.infectious
        }
    })

    await prisma.country.create({
        data: {
            cname: 'Kazakhstan',
            population: 19000000
        }
    })

    await prisma.country.create({
        data: {
            cname: 'Spain',
            population: 47330000
        }
    })

    const user_4 = await prisma.users.create({
        data:{
            email:'alibek@gmail.com',
            name: 'Alibek',
            surname: 'Park',
            salary: 799990,
            phone: '+7 909 779 77 77',
            cname: 'Kazakhstan'
        }})

    const publicServant_1 = await prisma.publicServant.create({
        data:{
            email: user_4.email,
            department: 'Dept 1'
        }
    })

    const user_5 = await prisma.users.create({
        data:{
            email:'gulsim@gmail.com',
            name: 'Gulsim',
            surname: 'Ling',
            salary: 500000,
            phone: '+7 909 888 77 77',
            cname: 'France'
        }})

    const publicServant_2 = await prisma.publicServant.create({
        data:{
            email: user_5.email,
            department: 'Dept 1'
        }
    })

    const user_6 = await prisma.users.create({
        data:{
            email:'mike@gmail.com',
            name: 'Mike',
            surname: 'MC',
            salary: 9000000,
            phone: '+7 909 767 77 77',
            cname: 'France'
        }})

    const publicServant_3 = await prisma.publicServant.create({
        data:{
            email: user_6.email,
            department: 'Dept 1'
        }
    })
    

    const user_7 = await prisma.users.create({
        data:{
            email:'jake@gmail.com',
            name: 'Jake',
            surname: 'KM',
            salary: 7878780,
            phone: '+7 899 767 77 77',
            cname: 'France'
        }})

    const publicServant_7 = await prisma.publicServant.create({
        data:{
            email: user_7.email,
            department: 'Dept 2'
        }
    })


    await prisma.record.create({
        data:{
            email: user_7.email,
            cname: 'Kazakhstan',
            disease_code: disease_U07.disease_code,
            total_deaths: 19053,
            total_patients: 1490000
        }
    })

    await prisma.record.create({
        data:{
            email: user_7.email,
            cname: 'France',
            disease_code: disease_U07.disease_code,
            total_deaths: 19053,
            total_patients: 1490000
        }
    })

    await prisma.record.create({
        data:{
            email: user_6.email,
            cname: 'Kazakhstan',
            disease_code: disease_U07.disease_code,
            total_deaths: 19053,
            total_patients: 1490000
        }
    })

    await prisma.record.create({
        data:{
            email: user_5.email,
            cname: 'Kazakhstan',
            disease_code: disease_U07.disease_code,
            total_deaths: 19053,
            total_patients: 1490000
        }
    })

    await prisma.record.create({
        data:{
            email: user_5.email,
            cname: 'Belgium',
            disease_code: disease_U07.disease_code,
            total_deaths: 33000,
            total_patients: 4620000
        }
    })

    await prisma.record.create({
        data:{
            email: user_4.email,
            cname: 'Kazakhstan',
            disease_code: disease_U07.disease_code,
            total_deaths: 19053,
            total_patients: 1490000
        }
    })

    await prisma.record.create({
        data:{
            email: user_4.email,
            cname: 'Belgium',
            disease_code: disease_U07.disease_code,
            total_deaths: 33000,
            total_patients: 4620000
        }
    })

    await prisma.record.create({
        data:{
            email: user_4.email,
            cname: 'France',
            disease_code: disease_U07.disease_code,
            total_deaths: 154000,
            total_patients: 36200000
        }
    })

    await prisma.record.create({
        data:{
            email: user_4.email,
            cname: 'Spain',
            disease_code: disease_U07.disease_code,
            total_deaths: 154000,
            total_patients: 36200000
        }
    })

    await prisma.record.create({
        data:{
            email: user_4.email,
            cname: 'France',
            disease_code: disease_D53.disease_code,
            total_deaths: 154,
            total_patients: 100001
        }
    })

    await prisma.record.create({
        data:{
            email: user_5.email,
            cname: 'France',
            disease_code: disease_D53.disease_code,
            total_deaths: 154,
            total_patients: 100001
        }
    })


    //ALL queries are done up to this moment, add more entries to have at least 10 in each table

    //with joints
    const disease_M13 = await prisma.disease.create({
        data: {
            disease_code: 'M13.80',
            description:'An inflammation or swelling of one or more joints',
            pathogen: 'bacteria',
            id: dict_diseases.degenerative
        }
    })
    
    await prisma.country.create({
        data: {
            cname: 'Russia',
            population: 143300000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'Russia',
            disease_code: disease_M13.disease_code,
            first_enc_date: new Date('1715-01-01')

        }
    })

    //Glaucoma
    const disease_H40 = await prisma.disease.create({
        data: {
            disease_code: 'H40. 113 ',
            description:'The optic nerve becomes damaged',
            pathogen: 'bacteria',
            id: dict_diseases.physiological
        }
    })

    await prisma.country.create({
        data: {
            cname: 'Austria',
            population: 8956000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'Austria',
            disease_code: disease_H40.disease_code,
            first_enc_date: new Date(' 1622-01-01')

        }
    })

    //Depression
    const disease_F33 = await prisma.disease.create({
        data: {
            disease_code: 'F33.0',
            description:'A mood disorder that causes a persistent feeling of sadness',
            pathogen: 'BDV',
            id: dict_diseases.mental
        }
    })

    await prisma.country.create({
        data: {
            cname: 'Germany',
            population: 83130000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'Germany',
            disease_code: disease_F33.disease_code,
            first_enc_date: new Date('1854-01-01')

        }
    })


    //Lymphoma
    const disease_C85 = await prisma.disease.create({
        data: {
            disease_code: 'C85.90',
            description:'It begins in the lymphatic system',
            pathogen: 'EBV',
            id: dict_diseases.cancer
        }
    })

    await prisma.country.create({
        data: {
            cname: 'UK',
            population: 67330000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'UK',
            disease_code: disease_C85.disease_code,
            first_enc_date: new Date('1832-01-01')

        }
    })

     //Heart Disease
     const disease_I51 = await prisma.disease.create({
        data: {
            disease_code: 'I51.9',
            description:'A heart condition that affects the major blood vessels',
            pathogen: 'pylori',
            id: dict_diseases.hereditary
        }
    })

    await prisma.country.create({
        data: {
            cname: 'Egypt',
            population: 104300000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'Egypt',
            disease_code: disease_I51.disease_code,
            first_enc_date: new Date('1203-01-01')

        }
    })

    //Acne
    const disease_L70 = await prisma.disease.create({
        data: {
            disease_code: 'L70.9',
            description:'Hair follicles become plugged with oil and dead skin cells.',
            pathogen: 'inflammation',
            id: dict_diseases.dermatological
        }
    })

    await prisma.country.create({
        data: {
            cname: 'Greece',
            population: 10660000
        }
    })

    await prisma.discover.create({
        data:{
            cname: 'Greece',
            disease_code: disease_L70.disease_code,
            first_enc_date: new Date('1638-01-01')

        }
    })


    //Users

    const user_8 = await prisma.users.create({
        data:{
            email:'milana@gmail.com',
            name: 'Milana',
            surname: 'Madiyarova',
            salary: 8999990,
            phone: '+7 899 767 99 77',
            cname: 'Greece'
        }})

    const doctor_4 = await prisma.doctor.create({
        data:{
            email: user_8.email,
            degree: 'PhD',
        }
    })

    await prisma.specialize.create({
        data:{
            id: dict_diseases.virology,
            email: doctor_4.email
        }
    })

    const user_9 = await prisma.users.create({
        data:{
            email:'rakman@gmail.com',
            name: 'Rakhman',
            surname: 'Madiyarov',
            salary: 10000000,
            phone: '+7 899 767 99 79',
            cname: 'Kazakhstan'
        }})

    const doctor_5 = await prisma.doctor.create({
        data:{
            email: user_9.email,
            degree: 'PhD',
        }
    })

    await prisma.specialize.create({
        data:{
            id: dict_diseases.allergy,
            email: doctor_5.email
        }
    })

    const user_10 = await prisma.users.create({
        data: {
            email: 'zarina@gmail.com',
            name: 'Zarina',
            surname: 'Rinatova',
            salary: 50000,
            phone: '+7 899 707 99 79',
            cname: 'UK'
        }
    })
    const doctor_6 = await prisma.doctor.create({
        data:{
            email: user_10.email,
            degree: 'PhD',
        }
    })

    await prisma.specialize.create({
        data:{
            id: dict_diseases.deficiency,
            email: doctor_6.email
        }
    })

    const user_11 = await prisma.users.create({
        data: {
            email: 'dauren@gmail.com',
            name: 'Dauren',
            surname: 'Rinatov',
            salary: 100000,
            phone: '+7 899 707 99 79',
            cname: 'UK'
        }
    })
    const doctor_7 = await prisma.doctor.create({
        data:{
            email: user_11.email,
            degree: 'PhD',
        }
    })
    await prisma.specialize.create({
        data:{
            id: dict_diseases.dermatological,
            email: doctor_7.email
        }
    })

    const user_12 = await prisma.users.create({
        data: {
            email: 'amira@gmail.com',
            name: 'Amira',
            surname: 'Bayndarova',
            salary: 100000,
            phone: '+7 899 707 00 79',
            cname: 'Egypt'
        }
    })
    const doctor_8 = await prisma.doctor.create({
        data:{
            email: user_12.email,
            degree: 'PhD',
        }
    })
    await prisma.specialize.create({
        data:{
            id: dict_diseases.mental,
            email: doctor_8.email
        }
    })
    await prisma.specialize.create({
        data:{
            id: dict_diseases.physiological,
            email: doctor_8.email
        }
    })

    await prisma.specialize.create({
        data:{
            id: dict_diseases.dermatological,
            email: doctor_8.email
        }
    })
    const user_13 = await prisma.users.create({
        data: {
            email: 'lesha@gmail.com',
            name: 'Lesha',
            surname: 'Bayndarov',
            salary: 220000,
            phone: '+7 899 707 00 90',
            cname: 'Egypt'
        }
    })
    const doctor_9 = await prisma.doctor.create({
        data:{
            email: user_13.email,
            degree: 'PhD',
        }
    })


    await prisma.specialize.create({
        data:{
            id: dict_diseases.infectious,
            email: doctor_9.email
        }
    })



    const user_14 = await prisma.users.create({
        data: {
            email: 'saniya@gmail.com',
            name: 'Saniya',
            surname: 'Satova',
            salary: 90900,
            phone: '+7 900 707 00 90',
            cname: 'Belgium'
        }
    })

    const publicServant_4 = await prisma.publicServant.create({
        data:{
            email: user_14.email,
            department: 'Dept 3'
        }
    })

    await prisma.record.create({
        data:{
            email: user_14.email,
            cname: 'Greece',
            disease_code: disease_I51.disease_code,
            total_deaths: 2000,
            total_patients: 8000
        }
    })

    const user_15 = await prisma.users.create({
        data: {
            email: 'larisa@gmail.com',
            name: 'Larissa',
            surname: 'Kalina',
            salary: 67000,
            phone: '+7 890 707 00 90',
            cname: 'Austria'
        }
    })

    const publicServant_5 = await prisma.publicServant.create({
        data:{
            email: user_15.email,
            department: 'Dept 3'
        }
    })

    await prisma.record.create({
        data:{
            email: user_15.email,
            cname: 'Egypt',
            disease_code: disease_J45.disease_code,
            total_deaths: 3000,
            total_patients: 10070
        }
    })

    const user_16 = await prisma.users.create({
        data: {
            email: 'nastya@gmail.com',
            name: 'Nastya',
            surname: 'Mironova',
            salary: 90000,
            phone: '+7 900 707 00 90',
            cname: 'Austria'
        }
    })

    const publicServant_6 = await prisma.publicServant.create({
        data:{
            email: user_16.email,
            department: 'Dept 3'
        }
    })

    await prisma.record.create({
        data:{
            email: user_16.email,
            cname: 'Germany',
            disease_code: disease_B20.disease_code,
            total_deaths: 3000,
            total_patients: 200000
        }
    })


    const user_17 = await prisma.users.create({
        data: {
            email: 'alina@gmail.com',
            name: 'Alina',
            surname: 'Mironova',
            salary: 10000000,
            phone: '+7 898 707 00 90',
            cname: 'Egypt'
        }
    })

    const publicServant_8 = await prisma.publicServant.create({
        data:{
            email: user_17.email,
            department: 'Dept 4'
        }
    })

    await prisma.record.create({
        data:{
            email: user_17.email,
            cname: 'Russia',
            disease_code: disease_M13.disease_code,
            total_deaths: 4090,
            total_patients: 60000
        }
    })

    const user_18 = await prisma.users.create({
        data: {
            email: 'artur@gmail.com',
            name: 'Arthur',
            surname: 'Mironov',
            salary: 1000000,
            phone: '+7 900 878 00 90',
            cname: 'Germany'
        }
    })

    const publicServant_9 = await prisma.publicServant.create({
        data:{
            email: user_18.email,
            department: 'Dept 5'
        }
    })

    await prisma.record.create({
        data:{
            email: user_18.email,
            cname: 'Russia',
            disease_code: disease_M13.disease_code,
            total_deaths: 2000000,
            total_patients: 20000000
        }
    })

    const user_19 = await prisma.users.create({
        data: {
            email: 'inna@gmail.com',
            name: 'Inna',
            surname: 'Taratynova',
            salary: 299000,
            phone: '+7 000 707 00 90',
            cname: 'France'
        }
    })

    const publicServant_10 = await prisma.publicServant.create({
        data:{
            email: user_19.email,
            department: 'Dept 5'
        }
    })

    await prisma.record.create({
        data:{
            email: user_19.email,
            cname: 'UK',
            disease_code: disease_M13.disease_code,
            total_deaths: 2,
            total_patients: 68
        }
    })
}

main();