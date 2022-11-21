import { Typography } from "@mui/material";
import type { NextPage } from "next";
import type { GridColDef, GridRowId, GridValueFormatterParams } from '@mui/x-data-grid';
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD } from "../../components/CRUD";
import type { Specialize } from "@prisma/client";

const SpecializePage: NextPage = () => {
    const { specialize: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: types } = trpc.diseaseType.get.useQuery();
    const { data: doctors } = trpc.doctor.get.useQuery();
    const { data } = trpc.specialize.get.useQuery();
    const { mutateAsync: update } = trpc.specialize.update.useMutation();
    const { mutateAsync: removePre } = trpc.specialize.delete.useMutation();

    const remove = React.useCallback(async (ids: GridRowId[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: GridColDef[] = React.useMemo(() => [
        {
            field: 'id',
            headerName: 'DiseaseType',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (types) {
                    return types.map(({ id, description }) => ({
                        label: description,
                        value: id,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Specialize['id']>) => {
                const type = types?.find(({ id }) => id === params.value);
                return type?.description || params.value;
            },
        },
        {
            field: 'email',
            headerName: 'Doctor',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: () => {
                if (doctors) {
                    return doctors.map(({ email }) => ({
                        label: email,
                        value: email,
                    }));
                }
                return [];
            },
            valueFormatter: (params: GridValueFormatterParams<Specialize['email']>) => {
                const doc = doctors?.find(({ email }) => email === params.value);
                return doc?.email || params.value;
            },
        },
    ], [types, doctors]);

    return (
        <MainLayout>
            <Typography variant="h5" fontWeight="bold">Specialize</Typography>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ id: -1, email: '' }}
                update={update}
                remove={remove}
                getId={(row) => `${row.id}!${row.email}`}
                invalidate={invalidateGet}
            />
        </MainLayout>
    )
}

export default SpecializePage;