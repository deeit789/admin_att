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

    const _data = _res.data?.map((item, index) => {
      return {
        key: item._id,
        group: item.group,
        home_team: item.home_team,
        away_team: item.away_team,
        local_date: item.local_date,
        local_time: item.local_time,
        datetime: dayjs(`${item.local_date} ${item.local_time}`).format(),
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
    setLoadingSync(true);
    setTimeout(() => {
      setLoadingSync(false);
    }, 3000);
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
      title: "V??ng ?????u",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Ng??y",
      dataIndex: "local_date",
      key: "local_date",
    },
    {
      title: "Gi??? b???t ?????u",
      dataIndex: "local_time",
      key: "local_time",
    },
    {
      title: "T??n ?????i nh??",
      dataIndex: "home_team",
      key: "home_team",
    },
    {
      title: "T??n ?????i kh??ch",
      dataIndex: "away_team",
      key: "away_team",
    },
  ];

  return (
    <div>
      <BreadcrumbCustom
        parentTitle={"App d??? ??o??n t??? s???"}
        subTitle={"Tr???n ?????u"}
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
              label="V??ng thi ?????u"
              name="group"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p v??ng thi ?????u!",
                },
              ]}
            >
              <Input placeholder="Nh???p v??ng thi ?????u" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Th???i gian di???n ra tr???n ?????u GMT +7"
              name="start_datetime"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng th???i gian di???n ra tr???n ?????u!",
                },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="?????i nh??"
              name="home_team"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n ?????i nh??!",
                },
              ]}
            >
              <Input placeholder="Nh???p t??n ?????i nh??" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="?????i kh??ch"
              name="away_team"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n ?????i kh??ch!",
                },
              ]}
            >
              <Input placeholder="Nh???p t??n ?????i kh??ch" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Logo ?????i nh??"
              name="home_flag"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ???????ng d???n h??nh ???nh logo ?????i nh??!",
                },
              ]}
            >
              <Input placeholder="Nh???p ???????ng d???n h??nh ???nh logo ?????i nh??" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Logo ?????i kh??ch"
              name="away_flag"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ???????ng d???n h??nh ???nh logo ?????i kh??ch!",
                },
              ]}
            >
              <Input placeholder="Nh???p ???????ng d???n h??nh ???nh logo ?????i kh??ch" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                L??u
              </Button>
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={[16, 0]}>
          <Col span={6}>
            <Form.Item label="Ng??y thi ?????u" name="date">
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
                  Xem l???ch thi ?????u
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  icon={<SyncOutlined />}
                  onClick={onHandleSyncWC2022}
                  loading={loadingSync}
                >
                  ?????ng b??? l???ch thi ?????u WC 2022
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
