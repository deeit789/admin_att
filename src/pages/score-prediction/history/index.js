import React, { useEffect, useState } from "react";
import BreadcrumbCustom from "../../../common/breadcrumb.js";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import {
  getDataPredictionByDate,
  getAllDataPrediction,
} from "../../../helpers/helper";
import {
  Button,
  Input,
  Form,
  Table,
  Divider,
  Row,
  Col,
  DatePicker,
  Space,
} from "antd";

export default function HistoryMatchPage() {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchDataHistory = async (dataFilter) => {
    setLoading(true);
    const queryUrl = {
      limit: tableParams.pagination.pageSize,
      offset: tableParams.pagination.current,
      playerId: dataFilter.playerId ? dataFilter.playerId : "",
      date: dataFilter.date ? dataFilter.date : "",
      ip: dataFilter.ip ? dataFilter.ip : "",
      fp: dataFilter.fp ? dataFilter.fp : "",
    };

    const _res = await getAllDataPrediction(queryUrl);

    const _data = _res.map((item, index) => {
      return {
        key: item._id,
        playerId: item.playerId,
        date: item.createDate,
        result1: item.result1,
        result2: item.result2,
        result3: item.result3,
        result4: item.result4,
        ip: item.ip,
        fp: item.fp,
      };
    });
    setData(_data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: _res.count,
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    const dtReq = {
      playerId: form.getFieldValue("playerId"),
      date: form.getFieldValue("date")
        ? dayjs(form.getFieldValue("date")).format("MM/DD/YYYY")
        : "",
      ip: form.getFieldValue("ip"),
      fp: form.getFieldValue("fp"),
    };

    fetchDataHistory(dtReq);
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const onFinish = (data) => {
    const dtReq = {
      playerId: data.playerId,
      date: data.date ? dayjs(data.date).format("MM/DD/YYYY") : "",
      ip: data.ip,
      fp: data.fp,
    };
    fetchDataHistory(dtReq);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "playerId",
      key: "playerId",
      width: "10%",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: "5%",
    },
    {
      title: "Trận 1",
      dataIndex: "result1",
      key: "result1",
      width: "15%",
    },
    {
      title: "Trận 2",
      dataIndex: "result2",
      key: "result2",
      width: "15%",
    },
    {
      title: "Trận 3",
      dataIndex: "result3",
      key: "result3",
      width: "15%",
    },
    {
      title: "Trận 4",
      dataIndex: "result4",
      key: "result4",
      width: "15%",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      width: "10%",
    },
    {
      title: "FP",
      dataIndex: "fp",
      key: "fp",
      width: "10%",
    },
  ];

  return (
    <div>
      <BreadcrumbCustom
        parentTitle={"App dự đoán tỉ số"}
        subTitle={"Lịch sử dự đoán"}
      />
      <Divider />
      <Form
        form={form}
        name="formMatch"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[16, 0]}>
          <Col span={6}>
            <Form.Item label="Tên đăng nhập" name="playerId">
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Ngày thi đấu" name="date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="IP" name="ip">
              <Input placeholder="Nhập IP" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="FP" name="fp">
              <Input placeholder="Nhập FP" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button type="primary" htmlType="button" onClick={onReset}>
                  Làm mới
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
    </div>
  );
}
