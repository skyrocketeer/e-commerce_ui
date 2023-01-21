import type { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import SearchInput from '~components/UI/Input/Search';
import Layout from '~components/UI/Layout';
import DataTable from '~components/UI/Table';
import { getStockList, updateStock } from '~service/axios';
import { IStockData, UpdateStockDto } from '~types/stock';
import { isNotEmpty, isOnlyAlphabet, isOnlyNumber } from '~utils/helpers';

const HomePage = ({ data }: { data: IStockData[] }) => {
  const fields = [
    {
      label: 'Mã',
      name: 'symbol',
      validation: (value: any) =>
        value.toString().length !== 3 || !isOnlyAlphabet,
      error: 'Nhap sai ma ck',
      isInputable: true,
    },
    {
      label: 'Giá vốn',
      name: 'costPrice',
      validation: (value: any) =>
        isNaN(value) ||
        !isNotEmpty(value) ||
        !isOnlyNumber ||
        parseInt(value) <= 0,
      error: 'Xin nhap vao so',
      isInputable: true,
    },
    {
      label: 'Khối lượng',
      name: 'amount',
      validation: (value: any) =>
        isNaN(value) ||
        !isNotEmpty(value) ||
        !isOnlyNumber ||
        parseInt(value) <= 0,
      error: 'Xin nhap vao so',
      isInputable: true,
    },
    {
      label: 'Trạng thái',
      name: 'status',
      validation: (value: any) => isNaN(value) || value > 2 || value < 0,
      error: 'Xin chon trang thai',
      isInputable: true,
      type: 'select',
      width: '120px',
    },
    {
      label: 'Ngày mua',
      name: 'purchaseDate',
      validation: (value: any) => !isNotEmpty(value),
      error: null,
      isInputable: true,
    },
  ];
  const [allData, setData] = useState(data);
  const [filteredData, setFilteredData] = useState<IStockData[]>([]);

  const onSave = async (r: IStockData, idx: number) => {
    const dto: UpdateStockDto = { ...r };
    const updated = await updateStock(r.id, dto);

    const newData = [...allData];
    newData[idx] = updated.data;
    setData(newData);
  };

  const onDelete = (data: IStockData[]) => setData(data);

  const onSearch = (value: string) => {
    const filterSearch = allData.filter((item) =>
      item.symbol.toLowerCase().includes(value)
    );
    // only search on filter data, so that we still can always keep track of the original data
    setFilteredData(filterSearch);
  };

  const onFilter = () => {};

  return (
    // <AuthGuard isLoggedIn={authProps}>
    <Layout>
      <DataTable
        fields={fields}
        data={allData}
        filterData={filteredData}
        onEditRow={onSave}
        onDeleteRow={onDelete}
        handleFilter={onFilter}
        searchBox={<SearchInput onSearch={onSearch} />}
        addMoreBtnLabel='Thêm mã'
      />
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const result: { data: IStockData[] | [] } = await getStockList();
  return { props: { data: result.data } };
};

export default HomePage;
