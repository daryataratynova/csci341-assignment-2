import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";
import type { Discover } from "@prisma/client";

const UsersPage: NextPage = () => {
    const { user: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: countries } = trpc.country.get.useQuery();
    const { data } = trpc.user.get.useQuery();
    const { mutateAsync: update } = trpc.user.update.useMutation();
    const { mutateAsync: removePre } = trpc.user.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: GridColDef[] = React.useMemo(() => [
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'surname',
            headerName: 'Surname',
            width: 150,
            editable: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            type: 'number',
            width: 120,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
        },
        {
            field: 'cname',
            headerName: 'Country',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (countries) {
                    return countries.map(({ cname }) => ({
                        label: cname,
                        value: cname,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Discover['cname']>) => {
                const country = countries?.find(({ cname }) => cname === params.value);
                return country?.cname || params.value;
            },
        },
    ], [countries]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Users</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ cname: '', email: '', name: '', surname: '', salary: 0, phone: '' }}
                update={update}
                remove={remove}
                getId={(row) => row.email}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default UsersPage;