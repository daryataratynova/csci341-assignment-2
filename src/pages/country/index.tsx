import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";

const columns: GridColDef[] = [
    { field: 'cname', headerName: 'Name', width: 200, editable: true },
    {
        field: 'population',
        headerName: 'Population',
        width: 200,
        type: 'number',
        editable: true,
    },
];

const CountriesPage: NextPage = () => {
    const { country: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data } = trpc.country.get.useQuery();
    const { mutateAsync: update } = trpc.country.update.useMutation();
    const { mutateAsync: removePre } = trpc.country.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Countries</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ cname: '', population: 0 }}
                update={update}
                remove={remove}
                getId={(row) => row.cname}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default CountriesPage;