import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  DatePicker,
  Space,
  Table,
} from "antd";
import dayjs from "dayjs";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";

import BreadcrumbCustom from "../../../common/breadcrumb.js";
import { getAllDataMatch } from "../../../helpers/helper";
export default function MatchPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingSync, setLoadingSync] = useState(false);
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchAllDataMatch = async (dataFilter) => {
    setLoading(true);
    const queryUrl = {
      limit: tableParams.pagination.pageSize,
      offset: tableParams.pagination.current,
      date: dataFilter.date ? dataFilter.date : "",
    };

    const _res = await getAllDataMatch(queryUrl);
    console.log("🚀 ~ file: index.js:38 ~ fetchAllDataMatch ~ _res", _res);

    const _data = _res.map((item, index) => {
      return {
        key: item._id,
        group: item.group,
        home_team: item.home_team,
        away_team: item.away_team,
        local_date: item.local_date,
        local_time: item.local_time,
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
      date: form.getFieldValue("date")
        ? dayjs(form.getFieldValue("date")).format("MM/DD/YYYY")
        : "",
    };

    fetchAllDataMatch(dtReq);
  }, [JSON.stringify(tableParams)]);

  const onFinish = (values) => {
    const dtReq = {
      date: values.date ? dayjs(values.date).format("MM/DD/YYYY") : "",
    };
    fetchAllDataMatch(dtReq);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onHandleSyncWC2022 = async () => {
    await setTimeout(() => {
      console.log(1);
      setLoadingSync(true);
    }, 3000);
    console.log(2);
    await setLoadingSync(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columns = [
    {
      title: "Vòng đấu",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Ngày",
      dataIndex: "local_date",
      key: "local_date",
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "local_time",
      key: "local_time",
    },
    {
      title: "Tên đội nhà",
      dataIndex: "home_team",
      key: "home_team",
    },
    {
      title: "Tên đội khách",
      dataIndex: "away_team",
      key: "away_team",
    },
  ];

  return (
    <div>
      <BreadcrumbCustom
        parentTitle={"App dự đoán tỉ số"}
        subTitle={"Trận đấu"}
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
        {/* <Row gutter={[16, 0]}>
          <Col span={6}>
            <Form.Item
              label="Vòng thi đấu"
              name="group"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vòng thi đấu!",
                },
              ]}
            >
              <Input placeholder="Nhập vòng thi đấu" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Thời gian diễn ra trận đấu GMT +7"
              name="start_datetime"
              rules={[
                {
                  required: true,
                  message: "Vui lòng thời gian diễn ra trận đầu!",
                },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Đội nhà"
              name="home_team"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đội nhà!",
                },
              ]}
            >
              <Input placeholder="Nhập tên đội nhà" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Đội khách"
              name="away_team"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đội khách!",
                },
              ]}
            >
              <Input placeholder="Nhập tên đội khách" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Logo đội nhà"
              name="home_flag"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đường dẫn hình ảnh logo đội nhà!",
                },
              ]}
            >
              <Input placeholder="Nhập đường dẫn hình ảnh logo đội nhà" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Logo đội khách"
              name="away_flag"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đường dẫn hình ảnh logo đội khách!",
                },
              ]}
            >
              <Input placeholder="Nhập đường dẫn hình ảnh logo đội khách" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={[16, 0]}>
          <Col span={6}>
            <Form.Item label="Ngày thi đấu" name="date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=" ">
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Xem lịch thi đấu
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  icon={<SyncOutlined />}
                  onClick={onHandleSyncWC2022}
                  loading={loadingSync}
                >
                  Đồng bộ lịch thi đấu WC 2022
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
