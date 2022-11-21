import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";
import type { Doctor } from "@prisma/client";

const DoctorPage: NextPage = () => {
    const { doctor: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: users } = trpc.user.get.useQuery();
    const { data } = trpc.doctor.get.useQuery();
    const { mutateAsync: update } = trpc.doctor.update.useMutation();
    const { mutateAsync: removePre } = trpc.doctor.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: GridColDef[] = React.useMemo(() => [        
        {
            field: 'email',
            headerName: 'User',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (users) {
                    return users.map(({ email, name, surname }) => ({
                        label: `${name} ${surname}`,
                        value: email,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Doctor['email']>) => {
                const user = users?.find(({ email }) => email === params.value);
                return `${user?.name} ${user?.surname}` || params.value;
            },
        },
        {
            field: 'degree',
            headerName: 'Degree',
            width: 150,
            editable: true,
        },
    ], [users]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Doctors</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ email: '', degree: '' }}
                update={update}
                remove={remove}
                getId={(row) => row.email}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default DoctorPage;