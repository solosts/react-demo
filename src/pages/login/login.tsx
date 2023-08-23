import { Form, Button, Input, Checkbox } from 'antd';
import { useEffect } from 'react';
import UseThree from './UseThree';
import UseForm from './UseForm';
import "./index.scss";
import human from '../../assets/images/login/login_human.png';
import line from '../../assets/images/login/login_horizontal_line.png';

type FieldType = {
  user?: string;
  pass?: string;
  code?: string;
  whetherAutoLogin?: boolean
};


export default function Login() {

  const { initThree } = UseThree();
  const { getValidateCodeHandle, submitForm, state, formField } = UseForm();
  let num = 1
  useEffect(() => {
    console.log(num);
    num == 1 && initThree(document.getElementById('login-three-container'));
    num++
    getValidateCodeHandle();
  }, [num])

  return (
    <>
      <div className="login-container">
        <div id='login-three-container'></div>
        <div className="login-plane">
          <div className="login-plane-container">
            <img className="login-plane-human" src={human} alt="" />
            <div className="login-plane-title">
              登陆
              <img className="login-plane-title-line" src={line} alt="" />
            </div>
            <div className="login-plane-form">
              <Form name="basic" autoComplete="off">
                <Form.Item<FieldType> label="" name="user">
                  <Input
                    placeholder="用户名 / 账号"
                    type="text"
                    v-model="formField.user"
                  ></Input>
                </Form.Item>
                <Form.Item<FieldType> name="pass">
                  <Input placeholder="密码" type="password" v-model="formField.pass" />
                </Form.Item>
                <div className="login-code-container">
                  <Form.Item<FieldType> name="code" style={{ width: '60%' }}>
                    <Input placeholder="验证码" type="text" v-model="formField.code" />
                  </Form.Item>
                  <div className="login-code">
                    <img src={state.codeSrc} />
                  </div>
                </div>
                <Form.Item<FieldType> name="whetherAutoLogin">
                  <Checkbox checked={formField.whetherAutoLogin} style={{ color: '#9ca1a9' }}>自动登陆</Checkbox>
                </Form.Item>
              </Form >
              <Button onClick={submitForm} className="login-btn" size="large" type="primary" >登录</Button>
            </div >
          </div >
        </div >
        <div className="login-ground"></div>
      </div >
    </>
  )
}