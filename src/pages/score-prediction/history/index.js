import React, { useEffect, useState, useRef } from "react";
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

  const fetchDataHistory = async (date) => {
    setLoading(true);
    if (!date) {
      const dataReq = {
        limit: 10,
        offset: 1,
      };
      const _res = await getAllDataPrediction(dataReq);

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
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: _data.length,
        },
      });
    } else {
      const day = dayjs(Date.now()).format("MM/DD/YYYY");
      const _res = await getDataPredictionByDate({ date: day });
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
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: _data.length,
        },
      });
    }
  };

  useEffect(() => {
    fetchDataHistory();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    const day = dayjs(values.start_datetime.$d).format("MM/DD/YYYY");
    const time = dayjs(values.start_datetime.$d).format("HH:mm");
    console.log(dayjs(values.start_datetime.$d).format("HH:mm"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: "playerId",
      dataIndex: "playerId",
      key: "playerId",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Trận 1",
      dataIndex: "result1",
      key: "result1",
    },
    {
      title: "Trận 2",
      dataIndex: "result2",
      key: "result2",
    },
    {
      title: "Trận 3",
      dataIndex: "result3",
      key: "result3",
    },
    {
      title: "Trận 4",
      dataIndex: "result4",
      key: "result4",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "FP",
      dataIndex: "fp",
      key: "fp",
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
            <Form.Item label="Ngày thi đấu" name="start_date">
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
              <Input placeholder="Nhập FB" />
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
