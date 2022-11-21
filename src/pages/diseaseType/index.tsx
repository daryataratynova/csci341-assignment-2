import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridValueFormatterParams, GridRowId } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, valueFormatter: ({ value }: GridValueFormatterParams<number>) => value === -1 ? '' : value },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
        editable: true,
    },
];

const DiseaseTypesPage: NextPage = () => {
    const { diseaseType: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data } = trpc.diseaseType.get.useQuery();
    const { mutateAsync: update } = trpc.diseaseType.update.useMutation();
    const { mutateAsync: removePre } = trpc.diseaseType.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as number[]);
    }, [removePre]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Disease Types</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ id: -1, description: '' }}
                update={update}
                remove={remove}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default DiseaseTypesPage;