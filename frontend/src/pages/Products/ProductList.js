import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Chip, emphasize, styled } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({theme}) => {
  const backgroundColor = 
  theme.palette.mode == 'light'
  ? theme.palette.grey[100]
  : theme.palette.grey[800];
  return{
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&hover, &:focus':{
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active':{
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductList = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);

  return (
    <div className="card shadow border-0 p-3 mt-4">
      <h3 className="hd">Danh sách sản phẩm</h3>
      <p>xem và cập nhật thông tin sản phẩm</p>

      <div className="row cardFilters mt-3">
        <div className="col-md-2">
          <h4>Loại trang sức</h4>
          <FormControl size="small" className="w-100">
            <Select
              value={productTypes}
              onChange={(e) => setProductTypes(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              labelId="demo-simple-select-helper-label"
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-2">
          <h4>Nhóm kim loại</h4>
          <FormControl size="small" className="w-100">
            <Select
              value={metalTypes}
              onChange={(e) => setMetalTypes(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-2">
          <h4>Chất liệu chính</h4>
          <FormControl size="small" className="w-100">
            <Select
              value={metalTypes}
              onChange={(e) => setMetalTypes(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-2">
          <h4>Gemstone types</h4>
          <FormControl size="small" className="w-100">
            <Select
              value={metalTypes}
              onChange={(e) => setMetalTypes(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-2">
          <h4>Status</h4>
          <FormControl size="small" className="w-100">
            <Select
              value={metalTypes}
              onChange={(e) => setMetalTypes(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-bordered v-align">
          <thead className="thead-dark">
            <tr>
              <th>S/N</th>
              <th>Ảnh</th>
              <th>Trang sức</th>
              <th>MÃ ID</th>
              <th>Loại trang sức</th>
              <th>Chất liệu chính</th>
              <th>Giá bán (VND)</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>
                <div className="d-flex align-items-center productBox">
                  <div className="imgWrapper">
                    <div className="img">
                      <img src="" className="w-100" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex productBox">
                  <div className="info pl-0">
                    <h6>Vòng tay Disney</h6>
                    <p>Discription</p>
                  </div>
                </div>
              </td>
              <td>45656787</td>
              <td>Vòng</td>
              <td>Vàng 24K</td>
              <td>
                <div style={{ width: "150p" }}>
                  <del className="old">200.000.000</del>
                  <span className="new text-danger">160.000.000</span>
                </div>
              </td>
              <td>Còn hàng</td>
              <td>
                <div className="actions d-flex align-items-center">
                  <Link to="/product/details">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                  </Link>
                  <Button className="success" color="success">
                    <MdEdit />
                  </Button>
                  <Button className="error" color="error">
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>#1</td>
              <td>
                <div className="d-flex align-items-center productBox">
                  <div className="imgWrapper">
                    <div className="img">
                      <img src="" className="w-100" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex productBox">
                  <div className="info pl-0">
                    <h6>Vòng tay Disney</h6>
                    <p>Discription</p>
                  </div>
                </div>
              </td>
              <td>45656787</td>
              <td>Vòng</td>
              <td>Vàng 24K</td>
              <td>
                <div style={{ width: "150p" }}>
                  <del className="old">200.000.000</del>
                  <span className="new text-danger">160.000.000</span>
                </div>
              </td>
              <td>Còn hàng</td>
              <td>
                <div className="actions d-flex align-items-center">
                  <Link to="/product/details">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                  </Link>
                  <Button className="success" color="success">
                    <MdEdit />
                  </Button>
                  <Button className="error" color="error">
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>#1</td>
              <td>
                <div className="d-flex align-items-center productBox">
                  <div className="imgWrapper">
                    <div className="img">
                      <img src="" className="w-100" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex productBox">
                  <div className="info pl-0">
                    <h6>Vòng tay Disney</h6>
                    <p>Discription</p>
                  </div>
                </div>
              </td>
              <td>45656787</td>
              <td>Vòng</td>
              <td>Vàng 24K</td>
              <td>
                <div style={{ width: "150p" }}>
                  <del className="old">200.000.000</del>
                  <span className="new text-danger">160.000.000</span>
                </div>
              </td>
              <td>Còn hàng</td>
              <td>
                <div className="actions d-flex align-items-center">
                  <Link to="/product/details">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                  </Link>
                  <Button className="success" color="success">
                    <MdEdit />
                  </Button>
                  <Button className="error" color="error">
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>#1</td>
              <td>
                <div className="d-flex align-items-center productBox">
                  <div className="imgWrapper">
                    <div className="img">
                      <img src="" className="w-100" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex productBox">
                  <div className="info pl-0">
                    <h6>Vòng tay Disney</h6>
                    <p>Discription</p>
                  </div>
                </div>
              </td>
              <td>45656787</td>
              <td>Vòng</td>
              <td>Vàng 24K</td>
              <td>
                <div style={{ width: "150p" }}>
                  <del className="old">200.000.000</del>
                  <span className="new text-danger">160.000.000</span>
                </div>
              </td>
              <td>Còn hàng</td>
              <td>
                <div className="actions d-flex align-items-center">
                  <Link to="/product/details">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                  </Link>
                  <Button className="success" color="success">
                    <MdEdit />
                  </Button>
                  <Button className="error" color="error">
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex tableFooter">
          <p>
            showing <b>12</b> of <b>60</b> result
          </p>
          <Pagination
            count={10}
            color="primary"
            className="pagination"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
