import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";
import type { Disease } from "@prisma/client";

const DiseasePage: NextPage = () => {
    const { disease: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: types } = trpc.diseaseType.get.useQuery();
    const { data } = trpc.disease.get.useQuery();
    const { mutateAsync: update } = trpc.disease.update.useMutation();
    const { mutateAsync: removePre } = trpc.disease.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: GridColDef[] = React.useMemo(() => [
        { field: 'disease_code', headerName: 'Disease Code', width: 150, editable: true },
        { field: 'pathogen', headerName: 'Pathogen', width: 150, editable: true },
        { field: 'description', headerName: 'Description', width: 300, editable: true },
        {
            field: 'id',
            headerName: 'Disease Type',
            type: 'singleSelect',
            width: 120,
            editable: true,
            valueOptions: () => {
                if (types) {
                    return types.map(({ description, id }) => ({
                        label: description,
                        value: id,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Disease['id']>) => {
                const type = types?.find(({ id }) => id === params.value);
                return type?.description || params.value;
            },
        },
    ], [types]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Diseases</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ disease_code: '', pathogen: '', description: '', id: -1, }}
                update={update}
                remove={remove}
                getId={(row) => row.disease_code}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default DiseasePage;