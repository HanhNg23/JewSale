import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Grid,
  InputAdornment,
  emphasize,
  OutlinedInput,
} from "@mui/material";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import Slider from "react-slick";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
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

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    productType: "",
    unitMeasure: "",
    saleStatus: "",
    imageUrls: ["/images/sample1.jpg", "/images/sample2.jpg"], // Thêm hình ảnh mẫu
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

    fetchFilterOptions();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/api/products", product);
      setProduct({
        name: "",
        description: "",
        productType: "",
        unitMeasure: "",
        saleStatus: "",
        imageUrls: ["/images/sample1.jpg", "/images/sample2.jpg"], // Reset lại hình ảnh mẫu
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
      setErrors({});
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Tạo mới sản phẩm</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<FaHome fontSize="small" />}
            />

            <StyledBreadcrumb label="Product" href="#" component="a" />
            <StyledBreadcrumb label="Create Product" />
          </Breadcrumbs>
        </div>
      </div>
      <div className="card productDetailsSection">
        <div className="row">
          <div className="col-md-5">
            <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-4">Upload Hình Ảnh</h6>
              <Slider {...productSliderOptions} className="sliderBig mb-3">
                {product.imageUrls.map((url, index) => (
                  <div key={index} className="item">
                    <img src={url} alt="Product" className="w-100" />
                  </div>
                ))}
              </Slider>
              <Slider {...productSliderSmlOptions} className="sliderSml">
                {product.imageUrls.map((url, index) => (
                  <div key={index} className="item">
                    <img src={url} alt="Thumbnail" className="w-100" />
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
                    <span>Tên sản phẩm</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập tên sản phẩm"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Mô tả sản phẩm</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập mô tả sản phẩm"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      error={!!errors.description}
                      helperText={errors.description}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Loại sản phẩm</span>
                  </div>
                  <div className="col-sm-9">
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.productType}
                    >
                      <InputLabel>Loại sản phẩm</InputLabel>
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
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Đơn vị tính</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập đơn vị tính"
                      name="unitMeasure"
                      value={product.unitMeasure}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.unitMeasure}
                      helperText={errors.unitMeasure}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Trạng thái bán</span>
                  </div>
                  <div className="col-sm-9">
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

                <h6 className="mb-4">Thông tin đá quý</h6>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Loại đá quý</span>
                  </div>
                  <div className="col-sm-9">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<FaPlus />}
                      fullWidth
                      margin="normal"
                      onClick={() => {
                        setProduct({
                          ...product,
                          gemstones: [...product.gemstones, {}],
                        });
                      }}
                    >
                      Thêm đá quý
                    </Button>
                  </div>
                </div>

                {product.gemstones.map((gemstone, index) => (
                  <div className="row mb-2" key={index}>
                    <div className="col-sm-3 d-flex align-items-center">
                      <span>Đá quý {index + 1}</span>
                    </div>
                    <div className="col-sm-9">
                      <TextField
                        label="Nhập loại đá quý"
                        name={`gemstoneType${index}`}
                        value={gemstone.type}
                        onChange={(e) => {
                          const newGemstones = [...product.gemstones];
                          newGemstones[index].type = e.target.value;
                          setProduct({ ...product, gemstones: newGemstones });
                        }}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Số lượng đá quý"
                        name={`gemstoneQuantity${index}`}
                        type="number"
                        value={gemstone.quantity}
                        onChange={(e) => {
                          const newGemstones = [...product.gemstones];
                          newGemstones[index].quantity = e.target.value;
                          setProduct({ ...product, gemstones: newGemstones });
                        }}
                        fullWidth
                        margin="normal"
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ImCross />}
                        fullWidth
                        margin="normal"
                        onClick={() => {
                          const newGemstones = product.gemstones.filter(
                            (gem, i) => i !== index
                          );
                          setProduct({ ...product, gemstones: newGemstones });
                        }}
                      >
                        Xóa đá quý
                      </Button>
                    </div>
                  </div>
                ))}

                <h6 className="mb-4">Thông tin kim loại</h6>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Loại kim loại</span>
                  </div>
                  <div className="col-sm-9">
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Loại kim loại</InputLabel>
                      <Select
                        name="metalType"
                        value={product.metalType.metalTypeId}
                        onChange={(e) => {
                          const metalType = metalTypes.find(
                            (type) => type.id === e.target.value
                          );
                          setProduct({
                            ...product,
                            metalType: {
                              ...product.metalType,
                              metalTypeId: metalType.id,
                              metalTypeName: metalType.name,
                              metalPurity: metalType.purity,
                              metalGroupName: metalType.groupName,
                            },
                          });
                        }}
                      >
                        {metalTypes.map((type) => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Trọng lượng kim loại</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập trọng lượng kim loại"
                      name="materialWeight"
                      type="number"
                      value={product.metalType.materialWeight}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          metalType: {
                            ...product.metalType,
                            materialWeight: e.target.value,
                          },
                        })
                      }
                      fullWidth
                      margin="normal"
                      error={!!errors.metalWeight}
                      helperText={errors.metalWeight}
                    />
                  </div>
                </div>

                <h6 className="mb-4">Thông tin giá cả</h6>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Giá kim loại</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập giá kim loại"
                      name="totalMetalCost"
                      type="number"
                      value={product.productPrice.totalMetalCost}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Giá đá quý</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập giá đá quý"
                      name="totalGemstoneCost"
                      type="number"
                      value={product.productPrice.totalGemstoneCost}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.gemstoneCost}
                      helperText={errors.gemstoneCost}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Chi phí nhân công</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập chi phí nhân công"
                      name="laborCost"
                      type="number"
                      value={product.productPrice.laborCost}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.laborCost}
                      helperText={errors.laborCost}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Tỷ lệ tăng giá</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập tỷ lệ tăng giá"
                      name="markupPercentage"
                      type="number"
                      value={product.productPrice.markupPercentage}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.markupPercentage}
                      helperText={errors.markupPercentage}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span>Giá bán</span>
                  </div>
                  <div className="col-sm-9">
                    <TextField
                      label="Nhập giá bán"
                      name="salePrice"
                      type="number"
                      value={product.productPrice.salePrice}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.salePrice}
                      helperText={errors.salePrice}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-sm-12">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Tạo sản phẩm
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

const productSliderOptions = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const productSliderSmlOptions = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
};

export default CreateProduct;
