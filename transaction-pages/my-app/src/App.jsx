import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import LapDon from "./components/LapDon";
import HoaDon from "./components/HoaDon";
import LapDonMua from "./components/LapDonMua";
import HoaDonMua from "./components/HoaDonMua";
import CapNhat from "./components/CapNhat";
import CapNhatMua from "./components/CapNhatMua";
import DanhSach from "./components/DanhSach";
import DanhSachHeader from "./components/DanhSachHeader";
function App() {
  return (
    <div id="all">
      {/* <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <LapDon />
      </div> */}

      {/* <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <HoaDon />
      </div> */}

      {/* <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <LapDonMua />
      </div> */}

      {/* <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <HoaDonMua />
      </div> */}
      {/* 
      <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <CapNhat />
      </div> */}

      <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <Header />
        <CapNhatMua />
      </div>

      {/* <SideBar />
      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <DanhSachHeader />
        <DanhSach />
      </div> */}
    </div>
  );
}
export default App;
