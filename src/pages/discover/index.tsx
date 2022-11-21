import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";
import type { Discover } from "@prisma/client";

const DiscoverPage: NextPage = () => {
    const { discover: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: countries } = trpc.country.get.useQuery();
    const { data: codes } = trpc.disease.get.useQuery();
    const { data } = trpc.discover.get.useQuery();
    const { mutateAsync: update } = trpc.discover.update.useMutation();
    const { mutateAsync: removePre } = trpc.discover.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: GridColDef[] = React.useMemo(() => [
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
        {
            field: 'disease_code',
            headerName: 'Disease',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (codes) {
                    return codes.map(({ disease_code }) => ({
                        label: disease_code,
                        value: disease_code,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Discover['cname']>) => {
                const code = codes?.find(({ disease_code }) => disease_code === params.value);
                return code?.disease_code || params.value;
            },
        },
        {
            field: 'first_enc_date',
            headerName: 'First Encountered',
            type: 'date',
            width: 300,
            editable: true,
        }
    ], [countries, codes]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Discovers</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ disease_code: '', cname: '', first_enc_date: (new Date()) }}
                update={update}
                remove={remove}
                getId={(row) => `${row.cname}!${row.disease_code}`}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default DiscoverPage;