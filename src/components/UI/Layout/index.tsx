import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from './Footer';
import Header from './Header';

const sections = [
  { title: 'Thêm mã', url: '#' },
  { title: 'Danh sách mã', url: '#' },
];

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Container maxWidth='lg'>
        <Header title='BẢNG GIÁ VỐN' sections={sections} />
        <main>
          <Grid container sx={{ my: 2 }}>
            {children}
          </Grid>
        </main>
      </Container>
      <Footer
        title='VỀ BỜ (version 1.0)'
        description='Chúc các bạn đầu tư thành công đánh bại thị trường'
      />
    </>
  );
}
