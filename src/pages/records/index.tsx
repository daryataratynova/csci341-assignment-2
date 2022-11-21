import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";
import type { Record } from "@prisma/client";

const RecordsPage: NextPage = () => {
    const { record: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: diseases } = trpc.disease.get.useQuery();
    const { data: publicServants } = trpc.publicServant.get.useQuery();
    const { data: countries } = trpc.country.get.useQuery();
    const { data } = trpc.record.get.useQuery();
    const { mutateAsync: update } = trpc.record.update.useMutation();
    const { mutateAsync: removePre } = trpc.record.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: GridColDef[] = React.useMemo(() => [
        {
            field: 'email',
            headerName: 'Public Servant',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (publicServants) {
                    return publicServants.map(({ email }) => ({
                        label: email,
                        value: email,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Record['email']>) => {
                const ps = publicServants?.find(({ email }) => email === params.value);
                return ps?.email || params.value;
            },
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
            valueFormatter: (params: GridValueFormatterParams<Record['cname']>) => {
                const c = countries?.find(({ cname }) => cname === params.value);
                return c?.cname || params.value;
            },
        },
        {
            field: 'disease_code',
            headerName: 'Disease',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (diseases) {
                    return diseases.map(({ disease_code }) => ({
                        label: disease_code,
                        value: disease_code,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Record['disease_code']>) => {
                const d = diseases?.find(({ disease_code }) => disease_code === params.value);
                return d?.disease_code || params.value;
            },
        },
        {
            field: 'total_deaths',
            headerName: 'Total Deaths',
            type: 'number',
            editable: true,
            width: 150,
        },
        {
            field: 'total_patients',
            headerName: 'Total Patients',
            type: 'number',
            editable: true,
            width: 150,
        }
    ], [countries, publicServants, diseases]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Specialize</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ cname: '', disease_code: '', email: '', total_deaths: 0, total_patients: 0 }}
                update={update}
                remove={remove}
                getId={(row) => `${row.email}!${row.cname}!${row.disease_code}`}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default RecordsPage;