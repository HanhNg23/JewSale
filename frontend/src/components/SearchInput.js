import React, { useState } from "react";
import { Select, Spin } from "antd";

let timeout;
let currentValue;
const convertArrayToObject = (array, value) => {
  const obj = {};
  array.forEach((key) => {
    obj[key] = value;
  });
  return obj;
};
const SearchInput = ({
  placeholder,
  style,
  fetchData,
  opts,
  labelField,
  valueField,
  onChange,
}) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [fetching, setFetching] = useState(false);
  const handleSearch = (newValue) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = newValue;

    const callback = (error, data, res) => {
      if (error) {
        console.error("Error fetching data:", error);
        setData([]);
        return;
      } else {
        console.log(res.body.accounts);
        setData(res.body.accounts);
      }
      setFetching(false);
    };
    const fake = () => {
      setFetching(true);
      if (opts) {
        const searchOpts = convertArrayToObject(opts, newValue);
        console.log(searchOpts);

        fetchData(searchOpts, callback);
      } else {
        fetchData(callback);
      }

      //   fetchData({ username: newValue }, (error, data, res) => {
      //     if (currentValue === newValue) {
      //       if (error) {
      //         console.error("Error fetching data:", error);
      //         setData([]);
      //         return;
      //       }

      //       const data = result.map((item) => ({
      //         value: item.id,
      //         text: item.username,
      //       }));
      //       setData(data);
      //     }
      //   });
    };

    if (newValue) {
      timeout = setTimeout(fake, 300);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // Gọi callback onChange để bind giá trị value ra ngoài
    }
  };

  return (
    <Select
      showSearch
      allowClear
      size="large"
      value={value}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={(data || []).map((d) => ({
        value: valueField ? d[valueField] : JSON.stringify(d),
        label: d[labelField],
      }))}
    />
  );
};

export default SearchInput;
