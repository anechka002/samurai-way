import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationRounded = ({count, page, onChange}: Props) => {
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={onChange} variant="outlined" shape="rounded" />
    </Stack>
  )
}
