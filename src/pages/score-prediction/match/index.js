import React from "react";
import { Button, Form, Input, Row, Col, Divider, DatePicker } from "antd";
import dayjs from "dayjs";

import BreadcrumbCustom from "../../../common/breadcrumb.js";

export default function MatchPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
    const day = dayjs(values.start_datetime.$d).format("MM/DD/YYYY");
    const time = dayjs(values.start_datetime.$d).format("HH:mm");
    console.log(dayjs(values.start_datetime.$d).format("HH:mm"));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <BreadcrumbCustom
        parentTitle={"App dự đoán tỉ số"}
        subTitle={"Trận đấu"}
      />
      <Divider />
      <Form
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
        </Row>
      </Form>
    </div>
  );
}
