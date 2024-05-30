import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, current }) {
  return (
    <>
      <Header current={current}></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
