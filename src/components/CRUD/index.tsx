import { Box, Button, Divider } from "@mui/material";
import { useSnackbar } from 'notistack';
import type { GridColDef, GridRowModel, GridSelectionModel, GridRowModesModel, GridEventListener, GridRowId } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid, GridFooter, GridRowModes } from '@mui/x-data-grid';
import React from "react";

interface Props<T extends object> {
    data?: T[];
    columns: GridColDef[];
    emptyRow: T;
    getId?: (row: T) => GridRowId;
    update: (data: T) => Promise<T>;
    remove: (id: GridRowId[]) => Promise<void>;
    invalidate: () => void;
}

const DEFAULT_GET_ID = (row: any) => row.id as GridRowId;

export const CRUD = <T extends object>({
    data,
    getId = DEFAULT_GET_ID,
    emptyRow,
    columns,
    update,
    remove,
    invalidate,
}: Props<T>) => {
    const { enqueueSnackbar } = useSnackbar();

    const [selectedRows, setSelectedRows] = React.useState<GridSelectionModel>([]);
    const [rowModes, setRowModes] = React.useState<GridRowModesModel>({});
    const [rows, setRows] = React.useState<T[]>([]);

    React.useEffect(() => {
        setRows(data ?? []);
    }, [data]);

    const addNewRow = React.useCallback(() => {
        setRows((prev) => [
            emptyRow,
            ...prev,
        ]);
        setRowModes((prev) => ({
            ...prev,
            [getId(emptyRow)]: {
                mode: GridRowModes.Edit,
            },
        }));
        document.querySelector('.MuiDataGrid-virtualScroller')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [emptyRow, getId]);

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel<T>, oldRow: GridRowModel<T>) => {
            const promise = update({
                ...newRow,
            });
            const row = await promise.then((data) => {
                enqueueSnackbar('Updated', {
                    variant: 'success',
                });
                return data;
            }).catch(() => {
                const message = 'Error';
                enqueueSnackbar(message, {
                    variant: 'error',
                });
                return oldRow;
            }).finally(() => invalidate());
            return row;
        }, [update, enqueueSnackbar, invalidate]
    );

    const processDelete = React.useCallback(() => {
        remove(selectedRows).then(() => {
            enqueueSnackbar('Deleted', {
                variant: 'success',
            });
        }).finally(() => invalidate());
    }, [selectedRows, enqueueSnackbar, remove, invalidate]);

    const stopEditing = React.useCallback(() => {
        setRowModes((prev) => ({
            ...prev,
            [getId(emptyRow)]: {
                mode: GridRowModes.View,
            },
        }));
    }, [emptyRow, getId]);

    const isNew = React.useCallback((id: GridRowId) => id === getId(emptyRow), [getId, emptyRow]);

    const onCellKeyDown = React.useCallback<GridEventListener<'cellKeyDown'>>(({ id }, e) => {
        if (isNew(id) && e.key === 'Enter') {
            stopEditing();
        }
    }, [isNew, stopEditing]);

    const hasNew = React.useMemo(() => {
        return rows.some((row) => getId(row) === getId(emptyRow))
    }, [rows, getId, emptyRow]);

    return (
        <Box sx={{
            height: 'calc(100vh - 80px)',
            marginTop: 2,
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={processRowUpdate}
                onSelectionModelChange={setSelectedRows}
                rowModesModel={rowModes}
                onCellKeyDown={onCellKeyDown}
                getRowId={getId}
                isRowSelectable={(row) => row.id !== getId(emptyRow)}
                components={{
                    Footer: (props) => (
                        <>
                            <Divider />
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 1,
                            }}>
                                <Button
                                    onClick={processDelete}
                                    disabled={selectedRows.length < 1}
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                >
                                    Delete
                                </Button>
                                {
                                    hasNew ? (
                                        <Button
                                            onClick={stopEditing}
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={addNewRow}
                                            startIcon={<AddIcon />}
                                        >
                                            Add
                                        </Button>
                                    )
                                }
                            </Box>
                            <GridFooter {...props} />
                        </>
                    ),
                }}
            />
        </Box>
    )
}
