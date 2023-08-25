import { Form, Button, Input, Checkbox } from 'antd';
import { useEffect } from 'react';
import { useImmer } from 'use-immer'
import { httpRequest } from '../../utils/common';
import { getCache, setCache } from '../../hooks/useCache';
import { useAppDispatch } from '../../store/hooks'
import { setToken } from '../../store/userSlice'
import UseThree from './UseThree';
import "./index.scss";
import human from '../../assets/images/login/login_human.png';
import line from '../../assets/images/login/login_horizontal_line.png';

export default function Login() {
  const dispatch = useAppDispatch()
  // 表单数据
  const [formField] = Form.useForm();

  formField.setFieldsValue({ username: 'admin', password: 'admin123', whetherAutoLogin: getCache('whetherAutoLogin') || false })

  const { initThree } = UseThree();
  // 设置背景，获取验证码
  let num = 1
  useEffect(() => {
    if (num == 1) {
      initThree(document.getElementById('login-three-container'));
      getValidateCodeHandle();
      num++
    }
  }, [num])

  // 验证码
  const [state, setState] = useImmer({
    codeSrc: '',
    uuid: ''
  });
  // 获取验证码
  const getValidateCodeHandle = async () => {
    // 请求获取验证码 并设置验证码的图片以及验证码token
    let res = await httpRequest('GET', '/captchaImage', {});
    if (res.code == 200) {
      setState(draft => {
        draft.codeSrc = `data:image/jpeg;base64,${res.img}`;
        draft.uuid = res.uuid;
      });
    }
  };

  // 提交表单  登录
  const submitForm = (formData: any) => {
    console.log('提交表单');
    httpRequest('POST', '/login', { ...formData, uuid: state.uuid }).then(res => {
      // 储存token
      dispatch(setToken(res.token))
    })
  };

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
              <Form form={formField} onFinish={submitForm}>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名/账号' }]}>
                  <Input placeholder="用户名/账号"></Input>
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入用密码' }]}>
                  <Input.Password placeholder="密码" />
                </Form.Item>
                <div className="login-code-container">
                  <Form.Item name="code" rules={[{ required: true, message: '请输入用验证码' }]} style={{ width: '60%' }}>
                    <Input placeholder="验证码" />
                  </Form.Item>
                  <div className="login-code">
                    <img src={state.codeSrc} onClick={getValidateCodeHandle} />
                  </div>
                </div>
                <Form.Item name="whetherAutoLogin" valuePropName="checked">
                  <Checkbox style={{ color: '#aeb4bd' }} onChange={(val) => { setCache('whetherAutoLogin', val.target.checked) }}>自动登陆</Checkbox>
                </Form.Item>
                <Button htmlType="submit" className="login-btn" size="large" type="primary" >登录</Button>
              </Form >
            </div >
          </div >
        </div >
        <div className="login-ground"></div>
      </div >
    </>
  )
}