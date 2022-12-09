import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  notification,
  Card,
  Typography,
} from "antd";

// import { LIST_SITE_NAME } from "../../common/const";
import { login } from "../../helpers/helper";

const { Title } = Typography;
// const { Option } = Select;

export default function LoginPage() {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const _req = {
      username: values.username,
      password: values.password,
    };

    setLoading(true);
    const _res = await login(_req);
    if (_res.data?.statusCode !== 200) {
      setLoading(false);
      return api["error"]({
        message: "Lỗi",
        description: `${_res.message}`,
      });
    }

    if (_res.data?.statusCode === 200) {
      setLoading(false);
      sessionStorage.setItem("authUser", _res.data?.jwt);
      return navigate("/");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row align="middle" justify="center" gutter={[16, 16]}>
      {contextHolder}
      <Col span={6}>
        <Title level={2}>Đăng nhập</Title>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="siteName"
            label="Hậu Đài"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hậu đài!",
              },
            ]}
          >
            <Select placeholder="Chọn hậu đài" allowClear>
              {LIST_SITE_NAME &&
                LIST_SITE_NAME.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading ? true : false}
              style={{ width: "100%" }}
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
