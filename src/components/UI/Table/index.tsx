import PlusIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/CancelRounded';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { indigo, red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useEffect, useState } from 'react';
import theme from '~styles/theme';
import { CellFields } from '~types/common';
import { IStockData } from '~types/stock';

type TableData = {
  rowData: IStockData;
  isEditing: boolean;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600,
    height: '100px',
    // color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    background: theme.palette.grey[100],
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EditableRow = ({
  fieldsArr,
  dataSource,
  handleCancel,
  handleSave,
  handleError,
}: {
  fieldsArr: Array<CellFields>;
  dataSource: TableData;
  handleCancel?: () => void;
  handleSave?: (r: IStockData) => void;
  handleError?: (k: string, v: boolean) => void;
}) => {
  const STATE = [
    { value: 1, label: 'Đã mua' },
    { value: 0, label: 'Đã bán' },
  ];

  const [data, setData] = useState(dataSource);

  const handleInputChange =
    (validation: (val: any) => boolean) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedData = { ...data };
      updatedData.rowData = { ...updatedData.rowData, [name]: value };

      setData(updatedData);
      handleError!(e.target.name, validation(e.target.value));
    };

  return (
    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {fieldsArr.map((item, index) => {
        const value = data.rowData[item.name as keyof IStockData];
        return (
          <StyledTableCell align='center' key={index}>
            {item.isInputable ? (
              item.type !== 'select' ? (
                <Stack>
                  <TextField
                    type='text'
                    size='small'
                    hiddenLabel
                    name={item.name}
                    value={value}
                    onChange={handleInputChange(item.validation!)}
                    error={Boolean(item.validation!(value))}
                    sx={{
                      '.MuiOutlinedInput-input': {
                        textAlign: 'center',
                      },
                    }}
                  />
                  {Boolean(item.validation!(value)) ? (
                    <Box
                      component='span'
                      sx={{
                        fontWeight: 100,
                        fontSize: 11,
                        fontStyle: 'italic',
                        color: 'red',
                      }}
                    >
                      {item.error}
                    </Box>
                  ) : null}
                </Stack>
              ) : (
                <Stack sx={{ width: item.width! }}>
                  <TextField
                    select
                    hiddenLabel
                    size='small'
                    value={Number(data.rowData['status'])}
                    onChange={handleInputChange(item.validation!)}
                    name='status'
                    error={item.validation!(data.rowData['status'])}
                  >
                    {STATE.map((item) => (
                      <MenuItem key={item.label} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {item.validation(data.rowData['status']) ? (
                    <Box
                      component='span'
                      sx={{
                        fontWeight: 100,
                        fontSize: 11,
                        fontStyle: 'italic',
                        color: 'red',
                      }}
                    >
                      {item.error}
                    </Box>
                  ) : null}
                </Stack>
              )
            ) : (
              <Box>
                <Box component='span'>
                  {data.rowData[item.name as keyof IStockData]}
                </Box>
              </Box>
            )}
          </StyledTableCell>
        );
      })}
      <StyledTableCell align='center'>
        <Stack
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
        >
          <IconButton
            sx={{
              '&:hover': { background: theme.palette.grey[300] },
              '&:hover .MuiSvgIcon-root': {
                color: { color: 'indigo' },
              },
            }}
            onClick={() => handleSave!(data.rowData)}
          >
            <SaveIcon
              sx={{
                color: indigo[500],
                '&:hover': { color: 'indigo' },
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              '&:hover': { background: theme.palette.grey[300] },
              '&:hover .MuiSvgIcon-root': {
                color: red['A400'],
              },
            }}
            onClick={handleCancel}
          >
            <CancelIcon
              sx={{
                color: red['400'],
                '&:hover': { color: red['A400'] },
              }}
            />
          </IconButton>
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const Row = ({
  dataSource,
  handleEdit,
  handleDelete,
  handleRowClick,
  isEditing,
  isAdding,
  isItemSelected,
}: {
  dataSource: IStockData;
  handleEdit: () => void;
  handleDelete: () => void;
  handleRowClick?: () => void;
  isEditing: boolean;
  isAdding: boolean;
  isItemSelected: boolean;
}) => {
  const StatusColor = ({ type }: { type: number }) => {
    return type == 1 ? (
      <Chip label='Đã mua' color='success' />
    ) : (
      <Chip label='Đã bán' color='error' />
    );
  };

  const dataSourceNoneIdKey = { ...dataSource } as Partial<IStockData>;
  if (isEditing) delete dataSourceNoneIdKey.id;

  return (
    <StyledTableRow>
      {Object.keys(dataSourceNoneIdKey).map((key, i) => (
        <StyledTableCell key={i} align='center'>
          {key.toString() === 'status' ? (
            <StatusColor type={dataSource['status']} />
          ) : key.toString() !== 'id' ? (
            <Typography component='span'>
              {dataSource[key as keyof IStockData]}
            </Typography>
          ) : !isEditing ? (
            <Checkbox
              color='primary'
              checked={isItemSelected}
              onClick={handleRowClick}
            />
          ) : null}
        </StyledTableCell>
      ))}
      <StyledTableCell
        align='center'
        sx={{ cursor: isEditing ? 'not-allowed' : 'default' }}
      >
        <Stack
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
        >
          <IconButton
            sx={{
              '&:disabled': { pointerEvents: 'none' },
              '&:hover': {
                background: theme.palette.grey[300],
              },
            }}
            onClick={handleEdit}
            disabled={isEditing || isAdding}
          >
            <EditIcon
              sx={{
                color:
                  isEditing || isAdding
                    ? theme.palette.grey[600]
                    : theme.palette.secondary.main,
                opacity: isEditing || isAdding ? 0.5 : 1,
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              '&:disabled': { pointerEvents: 'none' },
              '&:hover': {
                background: theme.palette.grey[300],
              },
            }}
            disabled={isEditing || isAdding}
            onClick={handleDelete}
          >
            <DeleteIcon
              sx={{
                color:
                  isEditing || isAdding ? theme.palette.grey[600] : red['A400'],
                opacity: isEditing || isAdding ? 0.5 : 1,
              }}
            />
          </IconButton>
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default function DataTable({
  data,
  fields,
  onEditRow,
  onDeleteRow,
  searchBox,
  filterData,
  addMoreBtnLabel,
}: {
  data: IStockData[];
  fields: CellFields[];
  isEditing?: boolean;
  isAdding?: boolean;
  onEditRow: (data: IStockData, id: number) => void;
  onDeleteRow: (data: IStockData[]) => void;
  handleFilter: (data: IStockData[]) => void;
  searchBox?: JSX.Element;
  filterData: IStockData[];
  addMoreBtnLabel?: string;
}) {
  // static vars
  const header = [
    ...fields.map((item) => ({ ...item })),
    {
      label: 'Actions',
      name: 'actions',
    },
  ];
  const newStockData: TableData = {
    rowData: {
      id: data.length || 1,
      symbol: '',
      costPrice: 0,
      targetPrice: 0,
      amount: 0,
      status: 0,
      purchaseDate: new Date().toISOString(),
    },
    isEditing: false,
  };

  // table states
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [isEditing, setEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [errorMap, setError] = useState(new Map());

  useEffect(() => {
    if (data.length) {
      initializeData(data);
    }
  }, []);

  useEffect(() => {
    if (filterData.length !== data.length && filterData.length)
      return handleFilter();
    else if (filterData.length) initializeData(filterData);
  }, [filterData]);

  const initializeData = (list: IStockData[]) => {
    let newTableData: TableData[] = [];
    if (list.length) {
      newTableData = data.map((item) => ({
        isEditing: false,
        rowData: item,
      }));
    }
    setTableData(newTableData);
  };

  const setEditMode = (idx: number) => {
    const newData = [...tableData];
    newData[idx].isEditing = true;
    setTableData(newData);

    setEditingIndex(idx);
    setEditing(true);
  };

  const handleFilter = () => {
    const newList = filterData.map((item) => ({
      isEditing: false,
      rowData: item,
    }));
    setTableData(newList);
  };

  const onCancel = () => {
    if (!isAdding) {
      const newData = tableData.map((item, i) => {
        if (i === editingIndex) {
          return {
            isEditing: false,
            rowData: data[i],
          };
        }
        return item;
      });
      setTableData(newData);
    } else setIsAdding(false);
    setEditing(false);
  };

  const onSave = (updated: IStockData) => {
    if (hasErorr(errorMap)) return;

    if (isEditing) {
      const newData = tableData.map((item, i) => {
        if (i === editingIndex!) {
          return { rowData: updated, isEditing: false };
        }
        return item;
      });

      // set internal state
      setTableData(newData);
      setEditing(false);
      onEditRow(updated, editingIndex!);
      setEditingIndex(null);
    } else {
      setTableData([...tableData, { rowData: updated, isEditing: false }]);
      setIsAdding(false);
      onEditRow(updated, tableData.length);
    }
  };

  const onDelete = (index: number) => {
    const rawData: IStockData[] = [];
    const newData = tableData.filter((item, i) => {
      if (i !== index) {
        rawData.push(item.rowData);
        return item;
      }
    });
    setTableData(newData);

    // return the raw data to parent
    onDeleteRow(rawData);
  };

  const addError = (key: string, value: boolean) => {
    const map = new Map(errorMap);
    map.set(key, value);
    setError(map);
  };

  const hasErorr = (m: Map<string, boolean>) => {
    let k = 0;
    m.forEach((v: boolean) => {
      if (v) k++;
    });

    return k ? true : false;
  };

  /*
   ** start handler for checkbox selection
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((item, i) => i);
      return setSelected(newSelecteds);
    }
    setSelected([]);
  };

  const onRowClick = (index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, index];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = [...selected.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
    setEditingIndex(index);
  };

  const isSelected = (idx: number) => selected.indexOf(idx) !== -1;
  /*
   ** end checkbox select handler
   */

  return (
    <>
      <Stack
        direction='row'
        sx={{ mb: 1, width: '100%' }}
        justifyContent='space-between'
        alignItems='center'
        spacing={12}
      >
        {searchBox && searchBox}
        <Button
          variant='contained'
          sx={{ color: 'white' }}
          startIcon={<PlusIcon />}
          onClick={() => {
            setIsAdding(true);
          }}
          disabled={isAdding || isEditing}
        >
          {addMoreBtnLabel || 'Add more'}
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {!isEditing ? (
                <StyledTableCell align='center'>
                  <Checkbox
                    sx={{ color: 'white' }}
                    indeterminate={
                      selected.length > 0 && selected.length < tableData.length
                    }
                    checked={
                      tableData.length > 0 &&
                      selected.length === tableData.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
              ) : null}
              {header.map((h, i) => (
                <StyledTableCell key={i} align='center'>
                  {h.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.length ? (
              tableData.map((r, i) => {
                return r.isEditing ? (
                  <EditableRow
                    key={i}
                    fieldsArr={fields}
                    dataSource={tableData[i]}
                    handleCancel={onCancel}
                    handleSave={onSave}
                    handleError={addError}
                  />
                ) : (
                  <Row
                    key={i}
                    dataSource={tableData[i].rowData}
                    handleEdit={() => setEditMode(i)}
                    handleDelete={() => onDelete(i)}
                    isEditing={isEditing}
                    isAdding={isAdding}
                    isItemSelected={isSelected(i)}
                    handleRowClick={() => onRowClick(i)}
                  />
                );
              })
            ) : isAdding ? (
              <EditableRow
                fieldsArr={fields}
                dataSource={newStockData}
                handleCancel={onCancel}
                handleSave={onSave}
                handleError={addError}
              />
            ) : (
              <StyledTableRow
                sx={{
                  height: '180px',
                  '&:first-of-type td': {
                    background: theme.palette.grey[50],
                  },
                }}
              >
                <StyledTableCell colSpan={8} align='center'>
                  <Typography
                    variant='subtitle1'
                    color={theme.palette.secondary.dark}
                    component='div'
                  >
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {isAdding && !!tableData.length && (
              <EditableRow
                fieldsArr={fields}
                dataSource={newStockData}
                handleCancel={onCancel}
                handleSave={onSave}
                handleError={addError}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
