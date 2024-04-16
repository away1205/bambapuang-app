import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField='last'
      options={[
        { value: '7', label: '7 hari' },
        { value: '30', label: '30 hari' },
        { value: '90', label: '90 hari' },
      ]}
    />
  );
}

export default DashboardFilter;
