import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Chip,
  styled,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Paper,
  emphasize,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import Slider from "react-slick";
import { color } from "@mui/system";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode == "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetail = () => {
  const { productId } = useParams(); // Nhận productId từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    productType: "",
    unitMeasure: "",
    saleStatus: "",
    imageUrls: [""],
    gemstones: [],
    metalType: {
      metalTypeId: "",
      metalTypeName: "",
      metalPurity: "",
      metalGroupName: "",
      materialWeight: 0,
      materialSize: 0,
    },
    productPrice: {
      totalMetalCost: 0,
      totalGemstoneCost: 0,
      laborCost: 0,
      markupPercentage: 0,
      salePrice: 0,
    },
  });
  const [errors, setErrors] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [saleStatuses, setSaleStatuses] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchFilterOptions = async () => {
      try {
        const productTypeResponse = await axios.get(
          "/api/filteroptions/"
        );
        const saleStatusResponse = await axios.get(
          "/api/filteroptions/"
        );
        const metalTypeResponse = await axios.get(
          "/api/filteroptions/"
        );

        setProductTypes(productTypeResponse.data);
        setSaleStatuses(saleStatusResponse.data);
        setMetalTypes(metalTypeResponse.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchProduct();
    fetchFilterOptions();
  }, [productId]);

  const validate = () => {
    const tempErrors = {};
    if (!product.name) tempErrors.name = "Tên sản phẩm không được để trống.";
    if (!product.productType)
      tempErrors.productType = "Loại sản phẩm không được để trống.";
    if (!product.unitMeasure)
      tempErrors.unitMeasure = "Đơn vị đo lường không được để trống.";
    if (!product.saleStatus)
      tempErrors.saleStatus = "Trạng thái bán không được để trống.";
    if (product.metalType.materialWeight <= 0)
      tempErrors.metalWeight = "Trọng lượng kim loại phải lớn hơn 0.";
    if (product.productPrice.totalGemstoneCost < 0)
      tempErrors.gemstoneCost = "Chi phí đá quý phải không âm.";
    if (product.productPrice.laborCost < 0)
      tempErrors.laborCost = "Chi phí lao động phải không âm.";
    if (
      product.productPrice.markupPercentage < 0 ||
      product.productPrice.markupPercentage > 1
    )
      tempErrors.markupPercentage = "Tỷ lệ phần trăm đánh dấu phải từ 0 đến 1.";
    if (product.productPrice.salePrice < 0)
      tempErrors.salePrice = "Giá bán phải không âm.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`/api/products/${productId}`, product);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${productId}`);
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Chi tiết sản phẩm</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<FaHome fontSize="small" />}
            />

            <StyledBreadcrumb label="Product" href="#" component="a" />
            <StyledBreadcrumb label="Product Detail" />
          </Breadcrumbs>
        </div>
      </div>
      <div className="card productDetailsSection">
        <div className="row">
          <div className="col-md-5">
            <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-4">Upload Img</h6>
              <Slider {...productSliderOptions} className="sliderBig mb-3">
                {product.imageUrls.map((url, index) => (
                  <div key={index} className="item">
                    <img src={url} className="w-100" />
                  </div>
                ))}
              </Slider>
              <Slider {...productSliderSmlOptions} className="sliderSml">
                {product.imageUrls.map((url, index) => (
                  <div key={index} className="item">
                    <img src={url} className="w-100" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-md-7">
            <div className="pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-4">Thông tin chung</h6>
              <div className="productInfo mt-3">
                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <form onSubmit={handleUpdate}>
                      <span>Tên sản phẩm</span>
                      <TextField
                        label="Nhập tên sản phẩm"
                        sx={{ width: "54em" }}
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </form>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <form onSubmit={handleUpdate}>
                      <span>Mô tả sản phẩm</span>
                      <TextField
                        label="Nhập tên sản phẩm"
                        sx={{ width: "54em" }}
                        name="description"
                        value={product.description}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                      />
                    </form>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <span>Loại trang sức</span>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={!!errors.productType}
                      >
                        <InputLabel>Loại trang sức</InputLabel>
                        <Select
                          name="productType"
                          value={product.productType}
                          onChange={handleChange}
                        >
                          {productTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.productType && (
                          <FormHelperText>{errors.productType}</FormHelperText>
                        )}
                      </FormControl>
                    </div>

                    <div className="col-md-6">
                      <span>Đơn vị tính</span>
                      <TextField
                        name="unitMeasure"
                        value={product.unitMeasure}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={!!errors.unitMeasure}
                        helperText={errors.unitMeasure}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <span>Trạng thái bán</span>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={!!errors.saleStatus}
                      >
                        <InputLabel>Trạng thái bán</InputLabel>
                        <Select
                          name="saleStatus"
                          value={product.saleStatus}
                          onChange={handleChange}
                        >
                          {saleStatuses.map((status) => (
                            <MenuItem key={status.id} value={status.id}>
                              {status.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.saleStatus && (
                          <FormHelperText>{errors.saleStatus}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </div>

                  <h6 className="mb-4">Thông tin giá cả</h6>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <span>Giá đá</span>
                      <TextField
                        name="totalGemstoneCost"
                        type="number"
                        value={product.productPrice.totalGemstoneCost}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={!!errors.totalGemstoneCost}
                        helperText={errors.totalGemstoneCost}
                      />
                    </div>

                    <div className="col-md-6">
                      <span>Chi phí nhân công</span>
                      <TextField
                        name="laborCost"
                        type="number"
                        value={product.productPrice.laborCost}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={!!errors.laborCost}
                        helperText={errors.laborCost}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <span>Tỷ lệ tăng giá</span>
                      <TextField
                        name="markupPercentage"
                        type="number"
                        value={product.productPrice.markupPercentage}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={!!errors.markupPercentage}
                        helperText={errors.markupPercentage}
                      />
                    </div>

                    <div className="col-md-6">
                      <span>Giá bán</span>
                      <TextField
                        name="salePrice"
                        type="number"
                        value={product.productPrice.salePrice}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={!!errors.salePrice}
                        helperText={errors.salePrice}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdate}
                      sx={{ mr: 2 }}
                    >
                      Cập nhật sản phẩm
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                    >
                      Xóa sản phẩm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

const productSliderOptions = {
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "sliderBig",
  centerPadding: "0",
  fade: true,
  asNavFor: ".sliderSml",
};

const productSliderSmlOptions = {
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  className: "sliderSml",
  centerPadding: "0",
  focusOnSelect: true,
};
